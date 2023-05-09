import express from "express";
import { addMatch } from "../controllers/matches.controller.js";

const route = express.Router();

route.post("/add", addMatch);

export default route;
