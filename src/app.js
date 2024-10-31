import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import admin from "firebase-admin";

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CERT_URL,
  }),
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
import eventRouter from "./routes/events.routes.js";
//routes declaration
app.use("/api/v1/events", eventRouter);

export { app };
