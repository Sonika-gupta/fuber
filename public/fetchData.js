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

async function getCabs (params) {
  const route = 'rides?' + new URLSearchParams(params).toString()
  return await fetchData(route)
}

async function bookRide ({ source, destination, user, requestPink }) {
  return await fetchData('rides', 'POST', {
    source,
    destination,
    user,
    requestPink
  })
}

async function startRide (id) {
  return await fetchData(`rides/${id}/start`, 'PATCH')
}

async function endRide (id) {
  return await fetchData(`rides/${id}/end`, 'PATCH')
}

async function cancelRide (id) {
  return await fetchData(`rides/${id}/cancel`, 'PATCH')
}

async function getUser (id) {
  return await fetchData(`users/${id}`)
}

export { getCabs, bookRide, startRide, endRide, cancelRide, getUser }
