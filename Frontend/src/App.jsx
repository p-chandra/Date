import data from "./data.json";
import { useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(null);
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [result, setResult] = useState("");

  function generate() {
    const results = data.filter(
      (item) =>
        item["dating-length"] <= length &&
        item.mood.toLowerCase() === mood.toLowerCase() &&
        item.energy.toLowerCase() === energy.toLowerCase()
    );

    if (results.length === 0) {
      setResult("No ideas found. Try another combination.");
      return;
    }

    const random =
      results[Math.floor(Math.random() * results.length)];

    setResult(random["date-idea"]);
  }

  const matchingCount = data.filter(
    (item) =>
      (!length || item["dating-length"] <= length) &&
      (!mood || item.mood === mood) &&
      (!energy || item.energy === energy)
  ).length;

  return (
    <div className="app">
      <h1>Welcome!</h1>

      <p className="subtitle">
        Help Me To Help You
      </p>

      <div className="progress">
        <div className={length ? "done" : ""}>① Stage</div>
        <div className={mood ? "done" : ""}>② Activity</div>
        <div className={energy ? "done" : ""}>③ Energy</div>
      </div>

      <div className="section">
        <h2>Relationship Stage</h2>

        <div className="button-group">
          <button
            onClick={() => setLength(1)}
            className={length === 1 ? "selected" : ""}
          >
            💫 Just Started Dating
          </button>

          <button
            onClick={() => setLength(2)}
            className={length === 2 ? "selected" : ""}
          >
            ❤️ Getting Serious
          </button>

          <button
            onClick={() => setLength(3)}
            className={length === 3 ? "selected" : ""}
          >
            💍 Committed Relationship
          </button>
        </div>
      </div>

      <div className="section">
        <h2>Activity Type</h2>

        <div className="button-group">
          <button
            onClick={() => setMood("Indoor")}
            className={mood === "Indoor" ? "selected" : ""}
          >
            🏠 Indoor
          </button>

          <button
            onClick={() => setMood("Outdoor")}
            className={mood === "Outdoor" ? "selected" : ""}
          >
            🌳 Outdoor
          </button>
        </div>
      </div>

      <div className="section">
        <h2>Energy Level</h2>

        <div className="button-group">
          <button
            onClick={() => setEnergy("Relaxed")}
            className={energy === "Relaxed" ? "selected" : ""}
          >
            😌 Relaxed
          </button>

          <button
            onClick={() => setEnergy("Active")}
            className={energy === "Active" ? "selected" : ""}
          >
            ⚡Active
          </button>
        </div>
      </div>

      {(length || mood || energy) && (
        <p className="matches">
          {matchingCount} matching date ideas available
        </p>
      )}

      {length && mood && energy && (
        <button className="generate-btn" onClick={generate}>
          Generate Date Idea
        </button>
      )}

      {result && (
        <div className="result-card">
          <h3>🎉 Your Date Idea</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;