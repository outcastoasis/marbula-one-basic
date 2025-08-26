// client/src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Eingabe from "./pages/Eingabe";
import Anzeige from "./pages/Anzeige";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="navbar">
        <div className="nav-container">
          <h2 className="brand">Marbula One</h2>
          <nav className="nav-links">
            <NavLink
              to="/eingabe"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Eingabe
            </NavLink>
            <NavLink
              to="/anzeige"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Anzeige
            </NavLink>
          </nav>
        </div>
      </div>

      <Routes>
        <Route path="/eingabe" element={<Eingabe />} />
        <Route path="/anzeige" element={<Anzeige />} />
        <Route path="*" element={<Anzeige />} />
      </Routes>
    </Router>
  );
}

export default App;
