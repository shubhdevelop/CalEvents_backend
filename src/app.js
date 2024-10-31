import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account
const serviceAccount = JSON.parse(
  await readFile(
    new URL(
      "../config/calevent-2fc84-firebase-adminsdk-4rggx-f28eea9dae.json",
      import.meta.url
    )
  )
);

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
//Configuring Cors
app.use(
  cors({
    orgin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

//Configuring for Request in json format!!
app.use(express.json({ limit: "16kb" }));

//URl Encoder Configuration
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Cofifguring for Public assests
app.use(express.static("public"));

//Configuring cookies
app.use(cookieParser());

//routes
import userRouter from "./routes/user.routes.js";
import docsRouter from "./routes/docs.routes.js";
import eventRouter from "./routes/events.routes.js";
//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/docs", docsRouter);
app.use("/api/v1/events", eventRouter);

export { app };
