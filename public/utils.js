function createItem (type, props, ...children) {
  const item = document.createElement(type)
  if (props) Object.assign(item, props)
  for (const child of children) {
    if (typeof child !== 'string') item.appendChild(child)
    else item.appendChild(document.createTextNode(child))
  }
  return item
}

function findDistance (pointA, pointB) {
  // 1 degree = 111 km
  const distance =
    Math.sqrt(
      Math.pow(pointA.lat - pointB.lat, 2) +
        Math.pow(pointA.lon - pointB.lon, 2)
    ) * 111
  return distance.toFixed(2)
}

export { createItem, findDistance }
