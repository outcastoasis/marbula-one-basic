import { useEffect, useState } from "react";
import "../styles.css";
import { BASE_URL } from "../api";

function Eingabe() {
  const [personName, setPersonName] = useState("");
  const [personTeam, setPersonTeam] = useState("");
  const [raceName, setRaceName] = useState("");
  const [raceDate, setRaceDate] = useState("");
  const [races, setRaces] = useState([]);
  const [persons, setPersons] = useState([]);
  const [selectedRace, setSelectedRace] = useState("");
  const [pointsData, setPointsData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const raceRes = await fetch(`${BASE_URL}/races`);
    const raceData = await raceRes.json();
    setRaces(raceData);

    const personRes = await fetch(`${BASE_URL}/persons`);
    const personData = await personRes.json();
    setPersons(personData);
  };

  const handleAddPerson = async () => {
    if (!personName || !personTeam) return;

    await fetch(`${BASE_URL}/persons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: personName, team: personTeam }),
    });

    setPersonName("");
    setPersonTeam("");
    fetchData();
  };

  const handleDeletePerson = async (id) => {
    if (!window.confirm("Diese Person wirklich löschen?")) return;
    await fetch(`${BASE_URL}/persons/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handleAddRace = async () => {
    if (!raceName || !raceDate) return;

    await fetch(`${BASE_URL}/races`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: raceName, date: raceDate }),
    });

    setRaceName("");
    setRaceDate("");
    fetchData();
  };

  const handleDeleteRace = async (id) => {
    if (!window.confirm("Dieses Rennen wirklich löschen?")) return;
    await fetch(`${BASE_URL}/races/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handlePointChange = (personId, value) => {
    setPointsData((prev) => ({
      ...prev,
      [personId]: value,
    }));
  };

  const preloadRaceResults = (raceId) => {
    const selected = races.find((r) => r._id === raceId);
    if (!selected || !selected.results) return;

    const mapped = {};
    selected.results.forEach((res) => {
      if (res.personId?._id) {
        mapped[res.personId._id] = res.points.toString();
      }
    });

    setPointsData(mapped);
  };

  const handleSubmitPoints = async () => {
    if (!selectedRace) return alert("Bitte ein Rennen auswählen");

    const results = Object.entries(pointsData)
      .filter(
        ([_, points]) =>
          points !== "" && points !== null && points !== undefined
      )
      .map(([personId, points]) => ({
        personId,
        points: parseInt(points),
      }));

    if (results.length === 0) {
      alert("Keine Punkte eingegeben.");
      return;
    }

    await fetch(`${BASE_URL}/races/${selectedRace}/results`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ results }),
    });

    setPointsData({});
    alert("Punkte wurden gespeichert");
    fetchData();
  };

  return (
    <div className="container">
      <h1>Verwaltung</h1>

      <section>
        <h2>Person hinzufügen</h2>
        <div className="input-group">
          <input
            className="input-button-style"
            placeholder="Name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
          <input
            className="input-button-style"
            placeholder="Team"
            value={personTeam}
            onChange={(e) => setPersonTeam(e.target.value)}
          />
          <button onClick={handleAddPerson}>Hinzufügen</button>
        </div>

        <ul className="list">
          {persons.map((p) => (
            <li key={p._id} className="list-item">
              <span>
                {p.name} – {p.team}
              </span>
              <button
                className="delete-button"
                onClick={() => handleDeletePerson(p._id)}
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Rennen hinzufügen</h2>
        <div className="input-group">
          <input
            className="input-button-style"
            placeholder="Rennen Name"
            value={raceName}
            onChange={(e) => setRaceName(e.target.value)}
          />
          <input
            className="input-button-style"
            type="date"
            value={raceDate}
            onChange={(e) => setRaceDate(e.target.value)}
          />
          <button onClick={handleAddRace}>Hinzufügen</button>
        </div>

        <ul className="list">
          {races.map((race) => (
            <li key={race._id} className="list-item">
              <span>
                {race.name} ({new Date(race.date).toLocaleDateString()})
              </span>
              <button
                className="delete-button"
                onClick={() => handleDeleteRace(race._id)}
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Punkte erfassen</h2>
        <select
          className="input-button-style"
          value={selectedRace}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedRace(id);
            preloadRaceResults(id);
          }}
        >
          <option value="">Rennen wählen</option>
          {races.map((race) => (
            <option key={race._id} value={race._id}>
              {race.name}
            </option>
          ))}
        </select>

        {selectedRace && (
          <div className="points-form">
            {persons.map((p) => (
              <div key={p._id} className="points-row">
                <span>
                  {p.name} ({p.team})
                </span>
                <input
                  type="number"
                  min="0"
                  value={pointsData[p._id] ?? ""}
                  onChange={(e) => handlePointChange(p._id, e.target.value)}
                />
              </div>
            ))}
            <button onClick={handleSubmitPoints}>Punkte speichern</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Eingabe;
