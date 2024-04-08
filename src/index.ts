import { app } from "./app";
import { client } from "./util/database_client";
import { EnvLoad } from "./util/env_load";

const vehiculosRouter = require('./f_crud_vehiculos/vehiculo.router');
app.listen(EnvLoad.PORT, async () => {
  console.info(`Server running on http://localhost:${EnvLoad.PORT}`);
  client;
});

app.use('/vehiculos', vehiculosRouter);