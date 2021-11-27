class UserError extends Error {
  constructor (message, httpStatus = 400) {
    super(message)
    this.name = 'UserError'
    this.status = httpStatus
  }
}

module.exports = UserError
