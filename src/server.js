import express from "express";
import { env } from "./config/environtment";
import { connectDB, getDB } from "./config/mongodb";
import { BoardModel } from "@/models/board.model";

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

  //? ROUTER
  app.get("/api", async (req, res) => {
    res.json({ message: "hello dinhquanganh" });
  });

  //? CONNECT TO PORT
  app.listen(port, () => {
    console.log("◽@vpuspace server ✔️");
    console.log("🔰", host);
  });
};
