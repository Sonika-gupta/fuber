const { cabs } = require('../data')
const { findDistance } = require('../utils')

module.exports = {
  findCab: ({ lat, lon }) => {
    let radius = 0.01
    let closestCab
    while (radius < 0.05 && !closestCab) {
      const closeCabs = cabs.filter(
        cab => Math.abs(cab.lat - lat) < 0.01 && Math.abs(cab.lon - lon) < 0.01
      )
      closeCabs.reduce((minDistance, cab) => {
        const currentDistance = findDistance(cab, { lat, lon })
        if (currentDistance < minDistance) {
          closestCab = cab
          return currentDistance
        }
        return minDistance
      }, Infinity)
      console.log('closest cab:', closestCab)
      radius += 0.01
    }
    return closestCab ? [null, closestCab] : ['No Cabs Available', null]
  }
}
