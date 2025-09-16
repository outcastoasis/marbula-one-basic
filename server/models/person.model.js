// server/models/person.model.js
import mongoose from "mongoose";

// Schema für eine Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
});

// Modell für eine Person
const Person = mongoose.model("Person", personSchema);
export default Person;
