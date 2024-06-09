import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import myUserRoute from "./routes/MyUserRoutes.js";
import myProjectRoute from "./routes/MyProjectRoutes.js";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/project", myProjectRoute);

app.get("/health", async (req, res) => {
  res.send({ message: "health OK!" });
});

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
