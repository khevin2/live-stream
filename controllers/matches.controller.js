import createMatchLink from "../utils/createMatchLink.util.js";

import { Match } from "../models/match.model.js";

export async function addMatch(req, res) {
  try {
    console.log("Body: ", req.body);
    const { league, homeTeam, awayTeam, dateTime } = req.body;
    const { publish, stream } = createMatchLink({
      dateTime,
      appName: "live",
      streamName: "match",
    });
    const match = new Match({
      homeTeam,
      league,
      awayTeam,
      dateTime,
      publish,
      stream,
    });

    const savedMatch = await match.save();
    res.status(201).json({ message: "Match created", data: savedMatch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOneMatch(req, res) {
  try {
    const matchId = req.params.matchId;
    const match = await Match.findById(matchId);
    if (!match) return res.status(400).json({ error: "could not get match" });

    const { homeTeam, dateTime, awayTeam, league, stream, _id } = match;

    res.status(200).json({
      message: "success",
      data: { homeTeam, dateTime, awayTeam, league, stream, _id },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMatches(req, res) {
  try {
    const limit = req.query.limit || 10;

    const matches = await Match.find({ dateTime: { $gte: Date.now() } }).limit(
      limit
    );
    if (!matches)
      return res.status(400).json({ error: "could not get matches" });
    else if (matches.length === 0)
      res.status(404).json({ error: "No match found in this category" });
    res.status(200).json({ message: "success", data: matches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateMatchById(req, res) {
  try {
    const matchId = req.params.matchId;
    const { dateTime, homeTeam, awayTeam, league } = req.body;
    console.log(req.body);

    const match = await Match.findById(matchId);

    const updatedMatch = Object.assign(match, req.body);
    console.log(updatedMatch);

    await Match.findOneAndUpdate({ _id: matchId }, updatedMatch, { new: true });
    console.log({ ...match, dateTime, homeTeam, awayTeam, league });
    res.status(200).json({ message: "Match updated", data: updatedMatch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteMatchById(req, res) {
  try {
    const matchId = req.params.matchId;
    await Match.findByIdAndDelete(matchId);
    res.status(200).json({ message: "Match deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
