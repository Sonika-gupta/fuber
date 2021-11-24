### API

`/ride/find`
_method_: GET
_query_: lat, lon
=> Findes the closest cab within approximately 5 km radius of user's location

`/ride/book`
_method_: POST
_body_: source, destination, cab, user
if user is not idle => return
if cab is booked => find another cab
if cab found
=> create new ride
=> update user to booked
=> update cab to booked
=> return cab details to user

`/ride/start`
_method_: PUT
_params_: rideId
Update the ride status to active
Update start time with current time
update user status to riding

`/ride/end`
_method_: PUT
_params_: rideId
Update the ride status to completed
Update the end time with current time
Update the location of cab to destination location
Update cab status to available
Update user status to idle
Return the amount owed by user

`/ride/cancel`
_method_: PUT
_params_: rideId
Update the ride status to cancelled
Update cab status to available
Update user status to idle

### Upgrades:

- if cabFound timestamp is more than 5 mins ago => find closer cab
- display all cabs available
- calculate expected time assuming cabs travel at 50 units per hour
