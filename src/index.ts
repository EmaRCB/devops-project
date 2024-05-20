import { app } from "./app";
import { logger } from "./logger";
import { EnvLoad } from "./util/env_load";

app.listen(EnvLoad.PORT, async () => {
  logger.info(`Server API on http://localhost:${EnvLoad.PORT}`);
});
