import express from "express";
import authorize from "../middleware/auth.middleware.js";
import { getUsers, login } from "../controllers/users.controller.js";

const route = express.Router();

route.post("/", login);
route.get("/", authorize, getUsers);
// route.get("/", getMatches);
// route.patch("/:matchId", authorize, updateMatchById);

export default route;
