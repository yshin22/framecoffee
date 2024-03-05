
//es format. usually "const express = require('exprees')"
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import artshowRoutes from './routes/artshowRoutes.js';
import shippoRoutes from './routes/shippoRoutes.js';

const port = process.env.PORT;

connectDB(); // Connect to MongoDB

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/artshow', artshowRoutes);
app.use('/api/shippo', shippoRoutes);

// Paypal set up
app.get('/api/config/paypal', (req, res) => 
res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

// nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

// verify nodemailer is working 
transporter.verify((err, success) => {
  err ? console.log(err) : console.log(`=== server is ready to take messages: ${success} ===`);
})

// @desc Send mail with message content from "Wholesale" page
// @route POST URL/wholesale/send
app.post("/wholesale/send", function (req,res) {
  console.log("wholesale backend")
    let textBody = `Business: ${req.body.mailerState.businessName}\nType of Business: ${req.body.mailerState.typeOfBusiness}\nQuantity: ${req.body.mailerState.qty} lbs/month\nEmail: ${req.body.mailerState.email}\nPhone: ${req.body.mailerState.phone}\nWebsite/ Socials: ${req.body.mailerState.social}\n\nMessage:\n\n${req.body.mailerState.message}`;
    let mailOptions = {
      from: `${req.body.mailerState.email}`,
      to: process.env.EMAIL,
      subject: `Message from: ${req.body.mailerState.email}`,
      text: textBody,
    };
  
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err)
        res.json({
          status: "fail",
        })
      } else {
        console.log("== Message Sent ==");
        res.json({
          status: "success",
        });
      }
    });
})

// @desc Send message from "Contact us" page
// @route POST
app.post("/send", function (req,res) { 
    let mailOptions = {
      from: `${req.body.mailerState.email}`,
      to: process.env.EMAIL,
      subject: `Message from: ${req.body.mailerState.email}`,
      text: `Name: ${req.body.mailerState.name}\n\nMessage:\n${req.body.mailerState.message}`,
    };
  
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        res.json({
          status: "fail",
        })
      } else {
        console.log("== Message Sent ==");
        res.json({
          status: "success",
        });
      }
    });
});

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))