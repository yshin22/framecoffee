import shippo from 'shippo';
import asyncHandler from "../middleware/asyncHandler.js";
import dotenv from 'dotenv';
dotenv.config();
const shippoToken = process.env.SHIPPO_API_KEY;
console.log(shippoToken);

const shippoClient = shippo(shippoToken);

const createShippoLabel = asyncHandler(async(req, res) => {
    // var addressFrom  = shippoClient.address.create({
    //     "name":"Shawn Ippotle",
    //     "company":"Shippo",
    //     "street1":"215 Clayton St.",
    //     "city":"San Francisco",
    //     "state":"CA",
    //     "zip":"94117",
    //     "country":"US", // iso2 country code
    //     "phone":"+1 555 341 9393",
    //     "email":"shippotle@shippo.com",
    // }, function(err, address) {
    //         // asynchronously called
    //         // console.log(err)
    //         console.log(address)
    //         // res.json(address)
    // })
    // console.log(shippoClient.address.list());
    // console.log("CALLED")
    var addressFrom  = {
        "name": "Jong Won Lee",
        "street1": "8380 Greensboro Drive 222",
        "city": "Mclean",
        "state": "VA",
        "zip": "22102",
        "country": "US"
    };
    
    const {fullName, address1, address2, city, state, postalCode, country, phoneNumber, email} = req.body;
    console.log(req.body)
    var addressTo = {
        "name": fullName,
        "street1": address1,
        "street2": address2,
        "city": city,
        "state": state,
        "zip": postalCode,
        "country": country,
        "phone": phoneNumber,
        "email":email,
        "validate": true,
    }

    // Create custom parcel 
    var parcel = {
        "length": "5",
        "width": "5",
        "height": "5",
        "distance_unit": "in",
        "weight": "2",
        "mass_unit": "lb"
    };

    var shipment = shippoClient.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "parcels": [parcel],
        "async": false
    }, function(err, shipment) {
        console.log(shipment)

        var rate = shipment.rates[0];

        // Purchase the desired rate.
        shippoClient.transaction.create({
            "shipment": shipment,
            "carrier_account": "99ad626b8d95427a9795b36c838f52f7",
            "servicelevel_token": "usps_priority"
        }, function(err, transaction) {
        // asynchronous callback
        // res.json(transaction)
        console.log(transaction)
        });
    })
})

// @desc    Validate address
// @route   POST /validate
// @access  Public
const validateAddress = asyncHandler(async (req,res) => {
    // console.log('SHIPPO ADDRESSES CREATED:', await shippoClient.address.list({results: 100}));
    const {address1, address2, city, state, postalCode, country} = req.body
    // console.log(req.body)
    var address = shippoClient.address.create({
        "street1": address1,
        "street2": address2,
        "city": city,
        "state": state,
        "zip": postalCode,
        "country": country,
        "validate": true,
    }, function(err, address) {
        res.json(address)
    })
})

export {
    createShippoLabel,
    validateAddress,
};