import { app } from "./app";
import { logger } from "./logger";
import { EnvLoad } from "./util/env_load";

app.listen(EnvLoad.PORT, async () => {
  logger.info(`Running: http://localhost:${EnvLoad.PORT}`);
});
