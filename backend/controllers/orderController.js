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
    } else {
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
        // console.log('created order')

        // Save the order
        const createdOrder = await order.save();
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
        for (const i in order.orderItems) {
            const item = order.orderItems[i];
            const product = await Product.findById(item.product);
            product.countInStock -= item.qty;
            // product.sold += item.qty #not yet added to model
            await product.save()
        }

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

// const updateProductQty = asyncHandler(async (req, res) => {
    
//   })


export { 
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
}