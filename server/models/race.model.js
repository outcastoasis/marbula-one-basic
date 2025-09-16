// server/models/race.model.js
import mongoose from "mongoose";

// Schema für ein Rennergebnis
const resultSchema = new mongoose.Schema({
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  points: { type: Number, required: true },
});

// Schema für ein Rennen
const raceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  results: [resultSchema],
});

const Race = mongoose.model("Race", raceSchema);
export default Race;
