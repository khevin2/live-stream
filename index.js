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
    mediaroot: "./media",
  },
  auth: {
    play: true,
    publish: true,
    secret,
  },
  trans: {
    ffmpeg: process.env.FFMPG_PATH,
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        hlsKeep: false,
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
        dashKeep: false,
      },
    ],
  },
};

const nms = new NodeMediaServer(config);

nms.run();

nms.on("preConnect", (id, args) => {
  console.log("Id: ", id, "\n", "Args: ", args);
});

nms.on("postConnect", (id, args) => {
  console.log(
    "[NodeEvent on postConnect]",
    `id=${id} args=${JSON.stringify(args)}`
  );
});

nms.on("prePublish", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on prePublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on("prePlay", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on prePlay]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
  let session = nms.getSession(id);
  // session.reject();

  // function fnBrowserDetect() {
  //   let userAgent = navigator.userAgent;
  //   let browserName;

  //   if (userAgent.match(/chrome|chromium|crios/i)) {
  //     browserName = "chrome";
  //   } else if (userAgent.match(/firefox|fxios/i)) {
  //     browserName = "firefox";
  //   } else if (userAgent.match(/safari/i)) {
  //     browserName = "safari";
  //   } else if (userAgent.match(/opr\//i)) {
  //     browserName = "opera";
  //   } else if (userAgent.match(/edg/i)) {
  //     browserName = "edge";
  //   } else {
  //     browserName = "No browser detection";
  //   }

  //   return browserName;
  // }
  // if (fnBrowserDetect() == "No browser detection") session.reject();
  console.log(StreamPath);
});

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
