import express from "express";
import { mapOrder } from "./utilities/sorts.js";

const app = express();
const port = 3000;

app.get("/api", (req, res) => res.send("<h1>Hello World!</h1><hr/>"));
app.listen(port, () => console.log(`vpuspace is listening on port ${port}!`));
