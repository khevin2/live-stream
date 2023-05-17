import Joi from "joi";
import { Match } from "../models/match.model.js";

export function addMatchValidator(req, res, next) {
  try {
    const schema = Joi.object({
      league: Joi.string().required().label("league"),
      homeTeam: Joi.string().required().label("homeTeam"),
      awayTeam: Joi.string().required().label("awayTeam"),
      dateTime: Joi.date().required().label("dateTime"),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export function updateMathValidator(req, res, next) {
  try {
    const schema = Joi.object({
      league: Joi.string().label("league"),
      homeTeam: Joi.string().label("homeTeam"),
      awayTeam: Joi.string().label("awayTeam"),
      dateTime: Joi.date().label("dateTime"),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOneMatchValidator(req, res, next) {
  try {
    const matchId = req.params.matchId;
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ error: "Match not found" });
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteMatchValidator(req, res, next) {
  try {
    const matchId = req.params.matchId;
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ error: "Match not found" });
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
