import express from "express";
import viewsRoutes from "./views.routes.js";
import matchesRoutes from "./matches.routes.js";
import authRoutes from "./auth.routes.js";

const route = express.Router();

route.use("/matches", matchesRoutes);
route.use("/auth", authRoutes);
route.use("/", viewsRoutes);

export default route;
