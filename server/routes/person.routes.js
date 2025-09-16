// server/routes/person.routes.js
import express from "express";
import Person from "../models/person.model.js";

const router = express.Router();

// Alle Personen abrufen
router.get("/", async (req, res) => {
  const persons = await Person.find();
  res.json(persons);
});

// Neue Person erstellen
router.post("/", async (req, res) => {
  const { name, team } = req.body;
  const newPerson = new Person({ name, team });
  await newPerson.save();
  res.status(201).json(newPerson);
});

// Person löschen
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Person.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Löschen fehlgeschlagen" });
  }
});

export default router;
