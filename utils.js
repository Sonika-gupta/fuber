function findDistance (pointA, pointB) {
  return Math.sqrt(
    Math.pow(pointA.lat - pointB.lat, 2) + Math.pow(pointA.lon - pointB.lon, 2)
  )
}

function findClosest ({ lat, lon }, locations = []) {
  let closestLocation
  locations.reduce((minDistance, location) => {
    const currentDistance = findDistance(location, { lat, lon })
    if (currentDistance < minDistance) {
      closestLocation = location
      return currentDistance
    }
    return minDistance
  }, Infinity)
  console.log('closest:', closestLocation)
  return closestLocation
}

module.exports = {
  findClosest,
  findDistance
}
