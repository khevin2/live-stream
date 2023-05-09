import createMatchLink from "../utils/createMatchLink.util.js";

import { Match } from "../models/match.model.js";

export async function addMatch(req, res) {
  try {
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

    await match.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOneMatch(req, res) {
  try {
    const match = await Match.findOne({});
    if (!match) return res.status(400).json({ error: "could not get match" });

    const { homeTeam, dateTime, awayTeam, league, stream } = match

    res.status(200).json({ message: "success", data: { homeTeam, dateTime, awayTeam, league, stream } })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
