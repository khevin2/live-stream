import express from "express"

const route = express.Router()

route.get("/", (req, res) => {
  res.render("index", { URL: process.env.APP_URL });
});

route.get("/video", (req, res) => {
  res.render("Video", { URL: process.env.APP_URL });
});

export default route