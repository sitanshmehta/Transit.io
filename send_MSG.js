// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);


app.use(bodyParser.json());

app.post('/sendSMS', (req, res) => {
  const phoneNumber = req.body.input1;
  const timeB4BusArrival = req.body.input2;

  const message = `Your bus arrives in ${timeB4BusArrival} minutes`;

  client.messages
    .create({
      body: message,
      from: 'Twilio phone number',
      to: phoneNumber
    })
    .then(message => {
      console.log(`Successfully sent message: ${message.sid}`);
      res.send(`Successfully sent message: ${message.sid}`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


// This will be a method for scheduled sends if that is needed

// const scheduleDate = new Date(2022, 4, 30, 17, 30, 0);
// const scheduledMessage = await client.messages.create({
//   body: "Hello World",
//   from: "your_twilio_number",
//   to: "destination_number",
//   dateCreated: scheduleDate,
//   dateSent: scheduleDate
// });


//This would be a request sent by the JS file 
// fetch('http://localhost:3000/sendSMS', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ timeB4BusArrival: 'Hello World', phoneNumber: '+1234567890' })
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   });
