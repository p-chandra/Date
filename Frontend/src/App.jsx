import data from "./data.json";
import { useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(null);
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [result, setResult] = useState("");

function generateDate() {
  const pool = data.filter(
    item =>
      item["dating-length"] <= selectedLength &&
      item.mood === selectedMood &&
      item.energy === selectedEnergy
  );

  if (pool.length === 0) {
    setResult("No matching dates found.");
    return;
  }

  const random =
    pool[Math.floor(Math.random() * pool.length)];

  setResult(random["date-idea"]);
}

  return (
    <div style={{ padding: 40 }}>
      <h2>Dating Length</h2>

      <button
        onClick={() => setLength(1)}
        className={length === 1 ? "selected" : ""}
      >
        &lt; 3 months
      </button>

      <button
        onClick={() => setLength(2)}
        className={length === 2 ? "selected" : ""}
      >
        3–6 months
      </button>

      <button
        onClick={() => setLength(3)}
        className={length === 3 ? "selected" : ""}
      >
        &gt; 6 months
      </button>

      <h2>Activity Type</h2>

      <button
        onClick={() => setMood("Indoor")}
        className={mood === "Indoor" ? "selected" : ""}
      >
        Indoor
      </button>
      <button
        onClick={() => setMood("Outdoor")}
        className={mood === "Outdoor" ? "selected" : ""}
      >
        Outdoor
      </button>

      <h2>Energy Level</h2>

      <button
        onClick={() => setEnergy("Active")}
        className={energy === "Active" ? "selected" : ""}
      >
        Active
      </button>
      <button
        onClick={() => setEnergy("Relaxed")}
        className={energy === "Relaxed" ? "selected" : ""}
      >
        Relaxed
      </button>
      <br /><br />

      {length && mood && energy && (
        <button onClick={generate}>Generate</button>
      )}

      <h3>{result}</h3>
    </div>
  );
}

export default App;