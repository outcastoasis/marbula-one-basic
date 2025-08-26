// server/routes/race.routes.js
import express from "express";
import Race from "../models/race.model.js";

const router = express.Router();

// Alle Rennen abrufen
router.get("/", async (req, res) => {
  const races = await Race.find().populate("results.personId", "name team");
  res.json(races);
});

// Neues Rennen erstellen
router.post("/", async (req, res) => {
  const { name, date } = req.body;
  const race = new Race({ name, date, results: [] });
  await race.save();
  res.status(201).json(race);
});

// Punkte eintragen für ein Rennen
router.put("/:id/results", async (req, res) => {
  const { id } = req.params;
  const { results } = req.body; // Array von { personId, points }

  const race = await Race.findById(id);
  if (!race) return res.status(404).json({ error: "Race not found" });

  race.results = results;
  await race.save();

  res.json(race);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Race.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Löschen fehlgeschlagen" });
  }
});

export default router;
