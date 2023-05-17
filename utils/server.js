import express from "express";
import routes from "../routes/index.js";
import conn from "./db_conn.js";
import session from "express-session";
import { redisClient, redisStore } from "./sessions.js";
import dotenv from "dotenv";
dotenv.config();

export default function createServer() {
  const app = express();

  app.use((req, res, next) => {
    console.log(req.ips, req.baseUrl, req.originalUrl);
    next();
  });

  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 60 * 60 * 24 * 1000 },
      store: redisStore,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("views", "./views");
  app.set("view engine", "ejs");
  app.set("strict routing", true);
  app.use("/static", express.static("public"));

  app.use(routes);

  return app;
}
