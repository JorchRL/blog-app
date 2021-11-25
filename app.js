const config = require("./utils/config");
const express = require("express");
const app = express();
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogsRouter");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) =>
    logger.error("Failed to connect to MongoDB", error.message)
  );

app.use(express.static("build"));
app.use(express.json());
// app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
