const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

// Blog list app server (exercises 4.1 and 4.2)
const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
