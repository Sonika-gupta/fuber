import {
  getCabs,
  bookRide,
  startRide,
  endRide,
  cancelRide,
  getUser
} from './fetchData.js'
import { createItem, findDistance } from './utils.js'

const sections = document.querySelectorAll('section')
const screens = {
  idle: populateCabList,
  booked: populateCabDetails,
  riding: populateRideDetails,
  completed: populateRecipt,
  cancelled: redirectToHome
}

function getDestination () {
  return {
    lat: document.getElementById('lat').value,
    lon: document.getElementById('lon').value
  }
}

function accessStorage (method, itemName, item) {
  if (method === 'set') {
    localStorage.setItem(itemName, JSON.stringify(item))
  } else if (method === 'get') {
    return JSON.parse(localStorage.getItem(itemName))
  } else {
    console.error('Unknown Storage access method')
  }
}
async function populateCabList () {
  const cabs = await getCabs({ lat: user.lat, lon: user.lon })
  const cabList = document.getElementById('cabList')
  cabList.innerHTML = ''
  if (cabs.length) {
    cabs.forEach(cab => (cab.distance = findDistance(user, cab)))
    cabs.sort((a, b) => a.distance - b.distance)
    cabs.forEach(cab => {
      cabList.appendChild(
        createItem(
          'li',
          { className: 'cab' + (cab.isPink ? ' pink ' : '') },
          createItem(
            'div',
            {},
            'Driver: ',
            createItem('span', { className: 'info' }, cab.driver)
          ),
          createItem(
            'div',
            {},
            createItem('span', { className: 'info' }, cab.distance),
            createItem('span', {}, ' km away')
          )
        )
      )
    })
  } else {
    const heading = document.querySelector('#idle h2')
    heading.innerText = 'No Cabs Available. Please try again after some time.'
  }
}

function getRideDetails (requestPink = false) {
  const destination = getDestination()
  const params = {
    source: {
      lat: user.lat,
      lon: user.lon
    },
    destination,
    user
  }
  if (requestPink) params.requestPink = true
  return bookRide(params)
}

async function populateCabDetails (requestPink) {
  const ride = await getRideDetails(requestPink)
  accessStorage('set', 'ride', ride)
  ride.cab.distance = findDistance(user, ride.cab)
  const cabDetails = document.getElementById('cabDetails')
  cabDetails.innerHTML = ''
  cabDetails.appendChild(
    createItem(
      'p',
      { className: ride.cab.isPink ? 'pink' : '' },
      `Your ${ride.cab.isPink ? 'Pink' : ''} Cab is reaching you..`
    )
  )
  cabDetails.appendChild(
    createItem(
      'p',
      {},
      'Driver: ',
      createItem('span', { className: 'info' }, ride.cab.driver)
    )
  )
  cabDetails.appendChild(
    createItem(
      'p',
      {},
      createItem('span', { className: 'info' }, ride.cab.distance),
      ' km away'
    )
  )
}

async function populateRideDetails () {
  let ride = accessStorage('get', 'ride')
  ride = await startRide(ride.id)
  accessStorage('set', 'ride', ride)
  const rideDetails = document.getElementById('rideDetails')
  rideDetails.innerHTML = ''
  rideDetails.appendChild(
    createItem(
      'p',
      {},
      'Picked Up At ',
      createItem(
        'span',
        { className: 'info' },
        new Date(ride.startTime).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      )
    )
  )
  rideDetails.appendChild(
    createItem(
      'p',
      {},
      'Destination is ',
      createItem(
        'span',
        { className: 'info' },
        findDistance(ride.destination, user)
      ),
      createItem('span', {}, ' km away')
    )
  )
}

async function populateRecipt () {
  const ride = accessStorage('get', 'ride')
  const { receipt, ...updatedRide } = await endRide(ride.id)
  accessStorage('set', 'ride', updatedRide)
  const receiptDetails = document.getElementById('receiptDetails')
  receiptDetails.innerHTML = ''
  receiptDetails.appendChild(
    createItem(
      'p',
      {},
      'Travelled ',
      createItem('span', { className: 'info' }, `${receipt.distance}`),
      ' km in ',
      createItem('span', { className: 'info' }, `${receipt.time}`),
      ' min'
    )
  )
  receiptDetails.appendChild(
    createItem(
      'p',
      {},
      'Charge for Pink Cab: ',
      createItem('span', { className: 'info' }, `${receipt.pinkCabCharge}`),
      ' dodgecoins'
    )
  )
  receiptDetails.appendChild(
    createItem(
      'p',
      {},
      'Please pay the driver ',
      createItem('span', { className: 'info' }, `${receipt.charge}`),
      ' dodgecoins'
    )
  )
}

async function redirectToHome () {
  const ride = accessStorage('get', 'ride')
  const updatedRide = await cancelRide(ride.id)
  accessStorage('set', 'ride', updatedRide)
  const timer = document.getElementById('timer')
  let timeleft = 3
  const downloadTimer = setInterval(function () {
    timer.innerHTML = timeleft
    timeleft -= 1
  }, 1000)
  setTimeout(() => {
    clearInterval(downloadTimer)
    moveToScreen('idle')
  }, 4000)
}

function loadEvents () {
  document
    .getElementById('bookButton')
    .addEventListener('click', () => moveToScreen('booked'))
  document
    .getElementById('bookPinkButton')
    .addEventListener('click', () => moveToScreen('booked', true))
  document
    .getElementById('startRideButton')
    .addEventListener('click', () => moveToScreen('riding'))
  document
    .getElementById('endRideButton')
    .addEventListener('click', () => moveToScreen('completed'))
  document
    .getElementById('cancelRideButton')
    .addEventListener('click', () => moveToScreen('cancelled'))
  document
    .getElementById('homeButton')
    .addEventListener('click', () => moveToScreen('idle'))
}

function showSection (sectionId) {
  sections.forEach(section => section.classList.add('hidden'))
  document.querySelector(`section#${sectionId}`).classList.remove('hidden')
}

function showError (error) {
  const errorMessage = document.getElementById('error')
  if (error.name === 'UserError' || error.status > 500) {
    errorMessage.innerText = error.message
  } else {
    errorMessage.innerText = 'Internal Error. Dev needs to work harder.'
  }
  errorMessage.classList.remove('hidden')
}

function hideError () {
  const errorMessage = document.getElementById('error')
  errorMessage.innerText = ''
  errorMessage.classList.add('hidden')
}

async function moveToScreen (screenName, params) {
  try {
    hideError()
    const method = screens[screenName]
    await method(params)
    showSection(screenName)
  } catch (err) {
    console.error(err)
    showError(err)
  }
}

let user
;(async function load () {
  user = await getUser(1)
  loadEvents()
  // Assuming the user is already logged in and current location has been updated in data.
  moveToScreen(user.status)
})()
