function findDistance (pointA, pointB) {
  // 1 degree = 111 km
  return (
    Math.sqrt(
      Math.pow(pointA.lat - pointB.lat, 2) +
        Math.pow(pointA.lon - pointB.lon, 2)
    ) * 111
  )
}

function findTimeDifferece (endTime, startTime) {
  return new Date(endTime).getMinutes() - new Date(startTime).getMinutes()
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
  return closestLocation
}

module.exports = {
  findClosest,
  findDistance,
  findTimeDifferece
}
