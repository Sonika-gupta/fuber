module.exports = {
  cabs: [
    {
      id: 3,
      drivername: 'Bohemian',
      lat: 12.970118174497001,
      lon: 77.63940372979536,
      isBooked: false,
      isPink: true,
      currentRideId: undefined
    },
    {
      id: 1,
      drivername: 'Resida',
      lat: 12.961482100489755,
      lon: 77.64549770865008,
      isBooked: false,
      isPink: false,
      currentRideId: undefined
    },
    {
      id: 2,
      drivername: 'Leela',
      lat: 12.96080249358276,
      lon: 77.64829793483432,
      isBooked: false,
      isPink: false,
      currentRideId: undefined
    }
  ],
  users: [
    {
      id: 1,
      name: 'Geekskool',
      lat: 12.961529724459048,
      lon: 77.64430036382869,
      status: 'idle' // enum ['idle', 'booked', 'riding']
    },
    {
      id: 2,
      username: 'Ramada',
      lat: 12.9555539710741,
      lon: 77.64109328351748,
      status: 'idle'
    },
    {
      id: 3,
      username: 'Adobe',
      lat: 12.925870035636654,
      lon: 77.69337356700868,
      status: 'idle'
    }
  ],
  rides: []
}
