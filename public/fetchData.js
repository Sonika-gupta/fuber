const url = 'http://localhost:8000/'
async function fetchData (route, method = 'GET', data) {
  try {
    const res = await fetch(url + route, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const value = await res.json()

    console.log(value)

    if (value.error) throw Error(value.error)
    return value
  } catch (err) {
    throw Error(err.message)
  }
}

function getCabs (params) {
  const route = 'rides?' + new URLSearchParams(params).toString()
  return fetchData(route)
}

function bookCab ({ source, destination, user }) {
  return fetchData('rides', 'POST', {
    source,
    destination,
    user
  })
}

export { getCabs, bookCab }
