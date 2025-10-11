import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use("/", (req, res) => {
  res.send("Hello Express");
});
app.listen(port, () => {
  console.log("Server Running");
});
