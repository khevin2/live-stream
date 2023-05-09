import express from "express";
import path from "path";

const route = express.Router();

route.get("/", (req, res) => {
  res.render("index", { URL: process.env.APP_URL });
});

route.get("/video", (req, res) => {
  res.render("Video", { URL: process.env.APP_URL });
});



route.use((req, res, next) => {
  req.url = path.normalize(req.url);
  console.log("request url: ", path.normalize(req.url));
  next();
});
route.use(
  "/dashboard/assets",
  express.static(
    path.join(process.cwd(), "dashboard", "dist", "assets"),
    (req, res, next) => {
      req.url = path.normalize(req.url);
      console.log("request url: ", req.url);
      next();
    }
  )
);

route.get("/admin", (req, res) => {
  res.sendFile(process.cwd() + "/dashboard/dist/index.html");
});

export default route;
