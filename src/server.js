import express from "express";
import { env } from "./config/environtment";
import { connectDB } from "./config/mongodb";

const app = express();
const port = env.PORT || 4700;
const host = `http://localhost:${port}/api`;

connectDB();
app.get("/api", (req, res) => res.send("<h1>dinhquanganh </h1><hr/>"));
app.listen(port, () => {
  console.log("@vpuspace is avaliable in \n" + host + "\n");
});
