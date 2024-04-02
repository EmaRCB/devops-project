import Express from "express";
import cors from "cors";

export const app = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());
