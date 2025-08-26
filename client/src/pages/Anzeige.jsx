// Anzeige.jsx
import { useEffect, useState } from "react";
import "../styles.css";

function Anzeige() {
  const [persons, setPersons] = useState([]);
  const [races, setRaces] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchPersons();
    fetchRaces();
  }, []);

  const fetchPersons = async () => {
    const res = await fetch("http://localhost:3001/api/persons");
    const data = await res.json();
    setPersons(data);
  };

  const fetchRaces = async () => {
    const res = await fetch("http://localhost:3001/api/races");
    const data = await res.json();
    setRaces(data);
    calculateLeaderboard(data);
  };

  const calculateLeaderboard = (races) => {
    const pointsMap = {};

    races.forEach((race) => {
      race.results.forEach((result) => {
        const person = result.personId;
        if (!person || !person._id) return;

        const id = person._id;
        const name = person.name;
        const team = person.team;
        const points = result.points;

        if (!pointsMap[id]) {
          pointsMap[id] = { name, team, points: 0 };
        }

        pointsMap[id].points += points;
      });
    });

    const sorted = Object.values(pointsMap).sort((a, b) => b.points - a.points);
    setLeaderboard(sorted);
  };

  return (
    <div className="container">
      <h1>Marbula One Ergebnisse</h1>

      <section>
        <h2>Teilnehmer</h2>
        <ul className="list">
          {persons.map((p) => (
            <li key={p._id} className="list-item">
              <span className="name">{p.name}</span>
              <span className="team">{p.team}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Rennen</h2>
        {races.map((race) => (
          <div key={race._id} className="race-box">
            <div className="race-header">
              <strong>{race.name}</strong>
              <span className="race-date">
                ({new Date(race.date).toLocaleDateString()})
              </span>
            </div>
            <ul className="list">
              {race.results.map((res, i) => (
                <li key={i} className="list-item">
                  <span className="name">
                    {res.personId?.name ?? "Unbekannt"}
                  </span>
                  <span className="points">{res.points} Punkte</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Rangliste</h2>
        <ol className="ranking">
          {leaderboard.map((entry, i) => (
            <li key={i} className="ranking-item">
              <span className="name">{entry.name}</span>
              <span className="team">({entry.team})</span>
              <span className="points">{entry.points} Punkte</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>Ergebnis-Tabelle</h2>
        <div className="table-scroll">
          <table className="result-table">
            <thead>
              <tr>
                <th>Teilnehmer</th>
                {races.map((race) => (
                  <th key={race._id}>{race.name}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => {
                let total = 0;
                return (
                  <tr key={person._id}>
                    <td>{person.name}</td>
                    {races.map((race) => {
                      const result = race.results.find(
                        (r) => r.personId._id === person._id
                      );
                      const pts = result?.points || 0;
                      total += pts;
                      return <td key={race._id}>{pts}</td>;
                    })}
                    <td>
                      <strong>{total}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Anzeige;
