import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

import NodeMediaServer from "node-media-server";
import jwt from "jsonwebtoken";

// Set up a secret key for JWT
const secret = process.env.TOKEN_SECRET;

// Generate a token with an expiry time of 1 hour
const token = jwt.sign({}, secret, { expiresIn: "1h" });

const config = {
  logType: 3,
  rtmp: {
    port: process.env.RTMP_PORT,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    port: process.env.HTTP_PORT,
    allow_origin: "*",
  },
  auth: {
    play: true,
    publish: true,
    secret: "kheven",
  },
};

const nms = new NodeMediaServer(config);

nms.run();

app.use((req, res, next) => {
  console.log(req.ips, req.baseUrl, req.originalUrl);
  next();
});

app.set("views", "./views");
app.set("view engine", "ejs");
app.get("/stream", (req, res) => {
  res.render("index", { URL: process.env.APP_URL });
});

const PORT = process.env.WEBSERVER_PORT || 8001;

app.listen(PORT, () => console.log("App is up on port: ", PORT));
