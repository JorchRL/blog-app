const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method);
  logger.info("Path: ", request.path);
  logger.info("Body: ", request.body);
  logger.info("---");
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  // console.log(error);

  switch (error.name) {
    case "CastError":
      return response.status(400).json({ error: error.message });
    case "ValidationError":
      return response.status(400).json({ error: error.message });
    default:
      return response.status(500).json({ error: "unhandled error" });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
