# FUBER Cab hiring Service

Basic implementation of API for a cab hiring service.

### Requirements:

- There is a fleet of cabs available, each cab has a location, determined by it’s latitude and longitude.
- A customer can call one of the taxis by providing their location, and the nearest taxi must be assigned to the customer.
- Some customers are particular that they only ride around in pink cars, for hipster reasons. This ability should be supported.
- When the cab is assigned to the customer, it can no longer pick up any other customers
- If there are no taxis available, the customer's request should be rejected.
- The customer ends the ride at some location. The cab waits around outside the customer’s house, and is available to be assigned to another customer.

## Getting Started

To get the Node server running locally:

1. Clone this repo
2. `npm install` to install all required dependencies
3. `npm start` to start the local server
4. Access [localhost:8000](http://localhost:8000) to see the frontend

## Directory Structure

- `public`
- `src`
  - `server.js` - Entry point to the application. Defines express server.
  - `classes/` - Contains Class definitions to create default object for table entries
  - `routes/` - Route definitions for the API.
  - `controllers/` - Handler functions.
  - `models/` - Currently contains functions that access the manually saved data in `data.js`. When connected to database, it would have the queries to access that.
  - `globals.js` - Saves values which need to be consistent in the whole app.
  - `utils.js` - Certains helper functions required by models to complete the task
- `tests`
- `data.js`: Manually created test data

## Sample Objects

```
user: {
    id: 1,
    name: 'Geekskool',
    lat: 12.961529724459048,
    lon: 77.64430036382869,
    status: 'idle' // enum ['idle', 'booked', 'riding']
}

cab: {
    id: 1,
    driver: 'Resida',
    lat: 12.961482100489755,
    lon: 77.64549770865008,
    isBooked: false,
    isPink: false,
    currentRideId: null
}

ride: {
  id: 1,
  userId: 2,
  cabId: 1,
  status: 'accepted' // enum ['accepted', 'started', 'cancelled', 'completed'],
  source: {
      lat: 12.961756055726415,
      lon: 77.64412371081289
    },
  destination: {
      lat: 12.961856055726415,
      lon: 77.6446237108129
    },
  startTime: timestamp,
  endTime: timestamp
}
```

## API Endpoints

GET `/ride/find`

> _query_: lat, lon
> _response_: error or `cab` object

Findes the closest cab within approximately 5 km radius of user's location

POST `/ride/book`

> _body_: `{source, destination, cab, user}` > _response_: error or `cab` object with properties `{isBooked: true}` and `currentRideId` having the `id` of new ride created

Checks if user is idle and cab is available
Create a new ride, updates user's and cab's status to booked
Returns cab details to user

PUT `/ride/start/{rideId}`

Updates the ride status to started and start time with current time
Update user's status to riding

PUT `/ride/end/{rideId}`

Updates the ride status to completed and the end time with current time
Updates the location of cab to destination location and status to available
Updates user status to idle
Returns the amount owed by user

PUT `/ride/cancel/{rideId}`

Updates the ride status to cancelled, cab status to available and user status to idle

## Testing

Jest has been used to create unit tests for the API. Check if all tests pass with `npm run test`
