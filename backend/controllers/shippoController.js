import shippo from 'shippo';
import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js';
import dotenv from 'dotenv';
dotenv.config();
const shippoToken = process.env.SHIPPO_API_KEY;
console.log(shippoToken);

const shippoClient = shippo(shippoToken);

const createShippoLabel = asyncHandler(async(req, res) => {
    const shipment = req.body

    if (shipment) {
        shippoClient.transaction.create({
            "shipment": shipment,
            "carrier_account": "99ad626b8d95427a9795b36c838f52f7",
            "servicelevel_token": "usps_priority"
        }, function(err, transaction) {
        // asynchronous callback
        console.log('----- SHIPPING LABEL -----',transaction)
        res.json(transaction)
        });
    } else {
        res.status(400);
        throw new Error('***** No shipment object received *****');
    }
})

// @desc    Validate address
// @route   POST /validate
// @access  Public
const validateAddress = asyncHandler(async (req,res) => {
    // console.log('SHIPPO ADDRESSES CREATED:', await shippoClient.address.list({results: 100}));
    const {address1, address2, city, state, postalCode, country} = req.body
    // console.log(req.body)
    if (address1) {
        var address = shippoClient.address.create({
            "street1": address1,
            "street2": address2,
            "city": city,
            "state": state,
            "zip": postalCode,
            "country": country,
            "validate": true,
        }, function(err, address) {
            console.log('----- VALIDATED ADDRESS -----', address)
            res.json(address)
        })
    } else {
        res.status(400);
        throw new Error('***** No address received *****');
    }
})

// @desc    Calculate Shipping based on Parcel size
// @route   POST /calculate
// @access  Public
const calcShipping = asyncHandler(async(req, res) => {
    console.log('----- CALCULATING SHIPPING COST -----');
    // console.log(req.body.newShippingAddress)
    // console.log('CART: ', req.body)

    // console.log(name, email);
    // console.log(address, city, postalCode, state, country);
    const {name, email} = req.body.userInfo;
    const {street1: address, street2: address2, city, zip: postalCode, state, country} = req.body.newShippingAddress

    // console.log('SHIPPING ADDRESS INSIDE HANDLER:', req.body.newShippingAddress)

    if (req.body.cart.cartItems.length === 0) {
        res.status(400);
        throw new Error('***** No items in cart *****');
    } 
    else {
        let totalWeight = 0;
        let totalQty = 0;

        // console.log(req.body.cart.cartItems)

        req.body.cart.cartItems.forEach(item => {
            console.log(`--- ${item.name} ---`)
            console.log(' - size: ', item.size)
            console.log(' - qty: ', item.qty)

            totalQty += item.qty
            totalWeight += (item.qty * item.size);
        })

        console.log(' - Total Weight of Beans: ', totalWeight)
        console.log(' - Total Qty: ', totalQty)

        var addressFrom  = {
            "name": "Jong Won Lee",
            "street1": "8380 Greensboro Drive 222",
            "city": "Mclean",
            "state": "VA",
            "zip": "22102",
            "country": "US"
        };

        var addressTo = {
            "name": name,
            "street1": address,
            "street2": address2,
            "city": city,
            "state": state,
            "zip": postalCode,
            "country": country,
            "phone": '703-111-1111',
            "email":email,
            "validate": true,
        }

        let L;
        let W;
        let H;

        // Parcel size:
        // 7x7x7:  beans 4 and under
        // - Parcel weight: 0.31 lbs (~ 150g)
        // 10x6x6: beans over 4
        // - Parcel weight: 0.28 lbs (~ 140g)
        if (totalQty <= 4) {
            L = 7;
            W = 7;
            H = 7;
            totalWeight += 150;
        } else if (totalQty > 4) {
            L = 10;
            W = 6;
            H = 6;
            totalWeight += 140;
        } 

        console.log(' - Total Weight (Beans / Parcel): ', totalWeight)

        var parcel = {
            "length": L,
            "width": W,
            "height": H,
            "distance_unit": "in",
            "weight": totalWeight,
            "mass_unit": "g"
        };
        console.log('----- PARCEL -----', parcel)

        var shipment = shippoClient.shipment.create({
            "address_from": addressFrom,
            "address_to": addressTo,
            "parcels": [parcel],
            "async": false
        }, function(err, shipment) {

            let shippingRate;

            shipment.rates.forEach((r) => {
                if (r.provider === 'USPS' && r.servicelevel.token === 'usps_priority') {

                    shippingRate = r.amount;

                    console.log('----- USPS PRIORITY -----', r)
                }
            })
            console.log('------ SHIPPING RATE -----', shippingRate)
            // console.log(shipment)
            res.json({ shipment, shippingRate});
        })


        //find order by id. get product qty. X weight.

        // Call this function in 'shipment' page
        // GET ADDRESS FROM, TO, PARCEL, SHIPPING LABEL HERE

        // PARCEL WILL CHECK IF THE QTY OF BEANS:
        //  IS <= 4: USE PARCEL SIZE 7x7x7
        //  IS > 4: USE PARCEL SIZE 10x10x6
        //  calculate weight by getting  
        /*
            const totalWeight = 0; 
            order.orderitems.foreach(e => {
                totalWeight += (e.size * e.qty)
            })
        */
    // Create Parcel based on these new variables
    // Create Shipment based on these new variables
    // Export 'shipment' json and used it to 'transaction' on 'orderscreen' page.


    }
})

export {
    createShippoLabel,
    validateAddress,
    calcShipping,
};