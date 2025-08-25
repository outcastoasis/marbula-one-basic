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

export default router;
