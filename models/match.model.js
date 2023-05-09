import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MatchSchema = new Schema({
  league: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  awayTeam: {
    type: String,
    required: true,
  },
  publish: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
});
export const Match = model("match", MatchSchema);
