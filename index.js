import express from "express";
import dotenv from "dotenv";
dotenv.config();


import routes from "./routes/index.js"
import nms from "./utils/nms.util.js"

const app = express();

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
app.use("/static", express.static("public"))

app.use(routes)

const PORT = process.env.WEBSERVER_PORT || 8001;

app.listen(PORT, () => console.log("App is up on port: ", PORT));
