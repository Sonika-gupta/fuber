const url = 'http://localhost:8000/'
async function fetchData (route, method = 'GET', data) {
  console.log('requesting ', route, method, data)
  const res = await fetch(url + route, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const value = await res.json()
  if (value.error) throw value.error
  return value
}

function getCabs (params) {
  const route = 'rides?' + new URLSearchParams(params).toString()
  return fetchData(route)
}

function bookRide ({ source, destination, user, requestPink }) {
  return fetchData('rides', 'POST', {
    source,
    destination,
    user,
    requestPink
  })
}

function startRide (id) {
  return fetchData(`rides/${id}/start`, 'PATCH')
}

function endRide (id) {
  return fetchData(`rides/${id}/end`, 'PATCH')
}

function cancelRide (id) {
  return fetchData(`rides/${id}/cancel`, 'PATCH')
}

function getUser (id) {
  return fetchData(`users/${id}`)
}

export { getCabs, bookRide, startRide, endRide, cancelRide, getUser }
