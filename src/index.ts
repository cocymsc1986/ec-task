require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import { usersRouter, bookingsRouter, parcsRouter } from "./routes";

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/parcs", parcsRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
