// server/models/person.model.js
import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
});

const Person = mongoose.model("Person", personSchema);
export default Person;
