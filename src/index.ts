import "reflect-metadata";
import * as express from "express";
import * as dotenv from "dotenv";
import { userRoute } from "./route/user.route";
import { AppDataSource } from "./config/data-source";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/users", userRoute);

AppDataSource.initialize().then(async () => {
  try {
    app.listen(port, () => {
      console.log("Server on " + port);
    });
    console.log("Datasource Initialized !");
  } catch (err) {
    console.log("ERROR : Error starting server");
  }
});
