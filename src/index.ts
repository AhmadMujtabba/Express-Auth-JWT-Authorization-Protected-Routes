import "reflect-metadata";
import * as express from "express";
import * as dotenv from "dotenv";
import { userRoute } from "./route/user.route";
import { verificationRoute } from "./route/verification.route";
import { AppDataSource } from "./config/data-source";
import { authRoute } from "./route/auth.route";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/users", userRoute);
app.use("/api", verificationRoute);
app.use("/auth", authRoute);

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
