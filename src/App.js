import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientChat from "./components/ClientChat";
import AgentChat from "./components/AgentChat";

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        <Routes>
          <Route
            path="/"
            element={
              <div style={styles.homeContainer}>
                <h1 style={styles.title}>Bienvenue dans l'application de chat !</h1>
                <p style={styles.subtitle}>Veuillez sélectionner une interface ci-dessous.</p>
                <nav style={styles.navLinks}>
                  <Link to="/client" style={styles.link}>Client Interface</Link>
                  <Link to="/agent" style={styles.link}>Agent Interface</Link>
                </nav>
              </div>
            }
          />
          <Route path="/client" element={<ClientChat />} />
          <Route path="/agent" element={<AgentChat />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Arial', sans-serif",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)", // dégradé de fond
  },
  homeContainer: {
    textAlign: "center",
    color: "#fff",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  navLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  link: {
    fontSize: "1.1rem",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transition: "background-color 0.3s ease",
  },
};

export default App;
