// client/src/pages/Anzeige.jsx
import { useEffect, useState } from "react";
import "../styles.css";
import { BASE_URL } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Anzeige() {
  const [persons, setPersons] = useState([]);
  const [races, setRaces] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [cumulativeData, setCumulativeData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const personRes = await fetch(`${BASE_URL}/persons`);
    const personData = await personRes.json();
    setPersons(personData);

    const raceRes = await fetch(`${BASE_URL}/races`);
    const raceData = await raceRes.json();
    setRaces(raceData);

    calculateLeaderboard(raceData);
    buildCumulativeGraph(raceData, personData);
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

  const buildCumulativeGraph = (races, persons) => {
    const sortedRaces = [...races];

    const cumulativePoints = {};
    persons.forEach((p) => {
      cumulativePoints[p._id] = 0;
    });

    const chartData = sortedRaces.map((race) => {
      race.results?.forEach((result) => {
        if (result.personId?._id) {
          cumulativePoints[result.personId._id] += result.points;
        }
      });

      const entry = { name: race.name };
      persons.forEach((p) => {
        entry[p.name] = cumulativePoints[p._id];
      });

      return entry;
    });

    setCumulativeData(chartData);
  };

  const generateColor = (index, total) => {
    const hue = (index * (360 / total)) % 360;
    return `hsl(${hue}, 70%, 50%)`;
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
                        (r) => r.personId?._id === person._id
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

      <section>
        <h2>Punkteverlauf</h2>
        <div className="chart-scroll">
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                {persons.map((p, i) => (
                  <Line
                    key={p._id}
                    type="monotone"
                    dataKey={p.name}
                    stroke={generateColor(i, persons.length)}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Anzeige;
