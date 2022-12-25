import { connectDB } from "./seeds/user.seed";
import connection from "./utils/connection";
import { config } from "./config/config";
import app from "./app";
import logger from "./utils/logging";
const NAMESPACE = "auth";

const start = async () => {
  try {
    connectDB();
    app.listen(config.server.port, () => {
      logger.info(
        ` ${NAMESPACE} : Server running on ${config.server.hostname}:${config.server.port}`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
