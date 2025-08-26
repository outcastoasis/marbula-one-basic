// server/models/race.model.js
import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  points: { type: Number, required: true },
});

const raceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // z. B. "Race 1"
  date: { type: Date, required: true }, // z. B. 2025-08-25
  results: [resultSchema], // Array von Ergebnissen
});

const Race = mongoose.model("Race", raceSchema);
export default Race;
