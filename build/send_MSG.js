const axios = require('axios');
const moment = require('moment');
const twilio = require('twilio');

const client = new twilio('ACb1b850537ae30f146548914ea4b8de1e', '44ce81449ffb84f588f1c71257ee3a58');
// YOUR KEY AND TOKEN SHOULD NEVER BE PUBLISHED ANYWHER, THIS IS JUST FOR DEMENSTRATION PURPOSES 

export async function sendSMSReminder(origin, destination, departure_time, minutes_before_arrival) {
  // Replace with your own Google Maps API key
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

  // Replace with your own transit mode
  const mode = 'bus';

  try {
    // Make a request to the Google Maps Commute and Transit API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&departure_time=${departure_time}&key=${apiKey}`
    );

    // Extract the arrival time from the API response
    const arrival_time = response.data.routes[0].legs[0].arrival_time.text;

    // Calculate the time before the bus arrives
    const time_before_arrival = moment(arrival_time, "HH:mm").subtract(minutes_before_arrival, 'minutes');

    // Send a message to user after waiting 
    const wait_time = minutes_before_arrival * 60 * 1000; //convert minutes to ms
    setTimeout(() => {
        client.messages
        .create({
          body: `Your bus will arrive at ${arrival_time} in ${minutes_before_arrival} minutes`,
          from: '<Your Twilio phone number>',
          to: '<Users Phone Number>'
        })
        .then(message => {
            console.log(`Successfully sent message: ${message.sid}`);
        })
        .catch(err => {
            console.log(err);
        });
    }, wait_time);

  } catch (err) {
    console.log(err);
  }
}
module.exports = { sendSMSReminder }



// Sure, here is a scenario of how this function could be used:

// A user wants to be reminded when the bus they are taking is going to arrive at their destination, they open a web or mobile app that utilizes this function.

// The user inputs their origin address, destination address, the time of departure and how many minutes before the bus arrives they want to receive a notification.

// The app calls the sendSMSReminder function with these inputs as arguments, for example: sendSMSReminder("123 Main St, Anytown USA", "456 Park Ave, Anytown USA", "2022-05-01T08:00", 15)

// The function makes a request to the Google Maps Transit API using the origin, destination, departure time and mode parameters, the API returns the arrival time of the bus.

// The function then calculates the time before the bus arrives using the arrival time and the minutes before arrival input, and then set a timeout for that amount of time.

// After the specified amount of time has passed, the function sends an SMS message to the user's phone number using the Twilio API, the message includes the arrival time of the bus and how many minutes before it arrives.

// The user receives the SMS message on their phone, the message reminds the user that the bus will arrive in 15 minutes.

// This is just one example of how the function can be used, it can be integrated with other features or used in different ways. The important thing is that it gives the user the ability to receive notifications about




