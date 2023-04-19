import express from "express";
import dotenv from "dotenv";
dotenv.config();



import nms from "./utils/nms.util.js"

import createServer from "./utils/server.js"

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



const PORT = process.env.WEBSERVER_PORT || 8001;

const app = createServer()

app.listen(PORT, () => console.log("App is up on port: ", PORT));
