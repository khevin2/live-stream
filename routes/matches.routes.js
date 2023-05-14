import express from "express";
import {
  addMatch,
  getMatches,
  getOneMatch,
  updateMatchById,
} from "../controllers/matches.controller.js";
import authorize from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/add", authorize, addMatch);
route.get("/:matchId", getOneMatch);
route.get("/", getMatches);
route.patch("/:matchId", authorize, updateMatchById);

export default route;
