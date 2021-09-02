import express from "express";
import { env } from "@/config/environtment";
import { connectDB } from "@/config/mongodb";
import { apiV1 } from "@/routes/v1/index";

const port = env.APP_PORT;
const host = `http://localhost:${port}`;

//? DATABASE
connectDB()
  .then(() => {
    console.clear();
    console.log("◽Database ✔️");
  })
  .then(() => bootServer())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  //? Enable req.body data
  app.use(express.json());

  //? ROUTER
  app.use("/v1", apiV1);

  //? CONNECT TO PORT
  app.listen(port, () => {
    console.log("◽@vpuspace server ✔️");
    console.log("🔰", host);
  });
};
