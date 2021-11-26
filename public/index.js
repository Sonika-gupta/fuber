import { getCabs, bookCab } from './fetchData.js'
import { createItem, findDistance } from './utils.js'

const sections = document.querySelectorAll('section')
console.log(sections)
async function showCabs (user) {
  const cabList = document.getElementById('cabList')
  const cabs = await getCabs({ lat: user.lat, lon: user.lon })
  cabs.forEach(cab => {
    cabList.appendChild(
      createItem(
        'li',
        { className: 'cab' + (cab.isPink ? ' pink ' : '') },
        createItem('div', { className: 'driverName' }, `Driver: ${cab.driver}`),
        createItem(
          'div',
          {},
          `Distance: ${findDistance(
            { lat: user.lat, lon: user.lon },
            { lat: cab.lat, lon: cab.lon }
          )} km`
        )
      )
    )
  })
}

function showSection (sectionId) {
  sections.forEach(section => section.classList.add('hidden'))
  document.querySelector(`section#${sectionId}`).classList.remove('hidden')
  console.log('showing', sectionId)
}

function getDestination () {
  return {
    lat: document.getElementById('lat').value,
    lon: document.getElementById('lon').value
  }
}

function loadBookEvent (user) {
  document.getElementById('bookButton').addEventListener('click', () => {
    const destination = getDestination()
    bookCab({
      source: {
        lat: user.lat,
        lon: user.lon
      },
      destination,
      user
    })
    showSection('waiting')
  })
}
function loadEvents (user) {
  loadBookEvent(user)
}

;(async function load () {
  // Assuming the user is already logged in and current location has been updated in data.
  const user = {
    id: 1,
    name: 'Geekskool',
    lat: 12.961529724459048,
    lon: 77.64430036382869,
    status: 'idle' // enum ['idle', 'booked', 'riding']
  }
  await showCabs(user)
  loadEvents(user)
})()
