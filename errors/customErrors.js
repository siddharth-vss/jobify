let { StatusCodes } =  require('http-status-codes');

 class NotFoundError extends Error {
  constructor(message) {
    super(message);
    t
 class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}


module.exports = {UnauthenticatedError ,UnauthorizedError ,NotFoundError ,BadRequestError}