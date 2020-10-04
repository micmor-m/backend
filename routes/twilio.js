const express = require('express');
const twilio = require('twilio');
const router = express.Router();


//twilio requirements -- Texting API 
const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const client = new twilio(accountSid, authToken);




module.exports = () => {
    //Welcome Page for the Server 
    router.get('/', (req, res) => {
        res.send('Welcome to the Express Server')
    })

    //Twilio 
    router.get('/send-text', (req, res) => {
        //Welcome Message
        res.send('Hello to the Twilio Server')

        //_GET Variables
        const { recipient, textmessage } = req.query;


        //Send Text
        client.messages.create({
            body: textmessage,
            to: '+1' + recipient,  // Text this number
            from: '+14387007607' // From a valid Twilio number
        }).then((message) => console.log(message.body));
    })

    return router;
};
