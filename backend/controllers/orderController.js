import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// @desc Create new order
// @route POST /api/orders
// @access private
const addOrderItems = asyncHandler(async (req,res) => {
    // Getting these parameters from http body 
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    console.log('CONTROLLER')
    // Check if "orderItems" is empty
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } 
    else {

        for (const i in orderItems) {
            console.log('here')
            const item = orderItems[i];
            console.log(item)
            const product = await Product?.findById(item?._id);
            if ((product?.countInStock - item?.qty) < 0) {
                console.log(`DIFFERENCE: ${product.countInStock - item.qty}`)
                console.log('one or more item are no longer in stock')
                res.status(400)
                throw new Error('This item is not in stock');
            }
        }

        // Create order.
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        // Save the order
        const createdOrder = await order.save();

        // Subtract order QTY from PRODUCT STOCK
        if (createdOrder) {
            for (const i in createdOrder.orderItems) {
                console.log('here')
                const item = orderItems[i];
                console.log(item)
                const product = await Product.findById(item._id);
                product.countInStock -= item.qty;
                // product.sold += item.qty #not yet added to model
                await product.save()
            }
        }
        // console.log(`${createdOrder}`)
        // Pass in new created order
        res.status(200).json(createdOrder);
    }
});
// @desc Get logged in users orders 
// @route GET /api/orders/myorders
// @access private
const getMyOrders = asyncHandler(async (req,res) => {
    // Find order based on user id matching user id from http body
    const orders = await Order.find({user: req.user._id});  
    // Pass in found orders
    res.status(200).json(orders);
});
// @desc Get order by id 
// @route POST /api/orders/:id
// @access private
const getOrderById = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});
// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access private
const updateOrderToPaid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);
    console.log(req.body.order.orderItems);

    if (order) {
        // for (const i in order.orderItems) {
        //     const item = order.orderItems[i];
        //     const product = await Product.findById(item.product);
        //     product.countInStock -= item.qty;
        //     // product.sold += item.qty #not yet added to model
        //     await product.save()
        // }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});
// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access private/ admin
const updateOrderToDelivered = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});
// @desc Get all orders
// @route GET /api/orders
// @access private/ admin
const getOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});



const deleteOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    
    if (order) {
        // Add ORDER QTY back to PRODUCT STOCK before deleting order
        for (const i in order.orderItems) {
            const item = order.orderItems[i];
            const product = await Product.findById(item.product);
            product.countInStock += item.qty;
            // product.sold += item.qty #not yet added to model
            await product.save()
        }
        await Order.deleteOne({ _id: order._id });
        console.log('ORDER REMOVED')
        res.json({ message: 'Order removed' });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
  })


export { 
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
    deleteOrderById,
}