module.exports = {
  findDistance: function (pointA, pointB) {
    return Math.sqrt(
      Math.pow(pointA.lat - pointB.lat, 2) +
        Math.pow(pointA.lon - pointB.lon, 2)
    )
  }
}
