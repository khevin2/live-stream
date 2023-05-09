import express from "express";
import routes from "../routes/index.js";

export default function createServer() {
  const app = express();

  app.use((req, res, next) => {
    console.log(req.ips, req.baseUrl, req.originalUrl);
    next();
  });

  app.set("views", "./views");
  app.set("view engine", "ejs");
  app.set("strict routing", true);
  app.use("/static", express.static("public"));
  app.use(routes);

  return app;
}
