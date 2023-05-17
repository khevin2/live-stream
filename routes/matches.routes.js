import express from "express";
import {
  addMatch,
  getMatches,
  getOneMatch,
  updateMatchById,
} from "../controllers/matches.controller.js";
import authorize from "../middleware/auth.middleware.js";
import {
  addMatchValidator,
  getOneMatchValidator,
  updateMathValidator,
} from "../validators/match.validator.js";

const route = express.Router();

route.post("/add", authorize, addMatchValidator, addMatch);
route.get("/:matchId", getOneMatchValidator, getOneMatch);
route.get("/", getMatches);
route.patch("/:matchId", authorize, updateMathValidator, updateMatchById);

export default route;
