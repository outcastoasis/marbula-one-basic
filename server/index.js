// server/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import personRoutes from "./routes/person.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/persons", personRoutes);

app.get("/", (req, res) => {
  res.send("Marbula One Backend läuft");
});

// TODO: Routes einbinden

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB verbunden");
    app.listen(PORT, () => {
      console.log(`Server läuft auf Port ${PORT}`);
    });
  })
  .catch((err) => console.error("DB-Fehler:", err));
