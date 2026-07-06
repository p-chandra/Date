import data from "./data.json";
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(null);
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [result, setResult] = useState(null);
  const [shownIdeas, setShownIdeas] = useState([]);

  const resultRef = useRef(null);

  // Scroll to result whenever a new one is generated
  useEffect(() => {
    if (result) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  // Reset when filters change
  useEffect(() => {
    setShownIdeas([]);
    setResult("");
  }, [length, mood, energy]);

  function generate() {
    const results = data.filter(
      (item) =>
        item["dating-length"] <= length &&
        item.mood.toLowerCase() === mood.toLowerCase() &&
        item.energy.toLowerCase() === energy.toLowerCase()
    );

    setResult({
      title: "No Matches",
      description: "Try another combination."
    });

    // Only use ideas that haven't been shown yet
    let available = results.filter(
      (item) => !shownIdeas.includes(item.title)
    );

    // If all ideas have been shown, start over
    if (available.length === 0) {
      available = results;
      setShownIdeas([]);
    }

    const random =
      available[Math.floor(Math.random() * available.length)];

    setResult(random);
    setShownIdeas((prev) => [...prev, random.title]);
  }

  const matchingCount = data.filter(
    (item) =>
      (!length || item["dating-length"] <= length) &&
      (!mood || item.mood === mood) &&
      (!energy || item.energy === energy)
  ).length;

  return (
    <div className="app">
      <h1>Date Generator</h1>

      <p className="subtitle">
        Find something you'll both actually enjoy.
      </p>

      <div className="progress">
        <div className={length ? "done" : ""}>Relationship</div>
        <div className={mood ? "done" : ""}>Activity</div>
        <div className={energy ? "done" : ""}>Energy</div>
      </div>

      <div className="section">
        <h2>Relationship Stage</h2>

        <div className="button-group">
          <button
            onClick={() => setLength(1)}
            className={length === 1 ? "selected" : ""}
          >
            New Relationship
          </button>

          <button
            onClick={() => setLength(2)}
            className={length === 2 ? "selected" : ""}
          >
            Getting Serious
          </button>

          <button
            onClick={() => setLength(3)}
            className={length === 3 ? "selected" : ""}
          >
            Long-Term Relationship
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
           Indoor
          </button>

          <button
            onClick={() => setMood("Outdoor")}
            className={mood === "Outdoor" ? "selected" : ""}
          >
            Outdoor
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
            Relaxed
          </button>

          <button
            onClick={() => setEnergy("Active")}
            className={energy === "Active" ? "selected" : ""}
          >
            Active
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
          {result ? "Generate Another Date Idea" : "Generate Date Idea"}
        </button>
      )}

    {result && (
      <div ref={resultRef} className="result-card">
        <h3>Recommended Date</h3>

        <h2 className="date-title">
          {result.title}
        </h2>

        <p>{result.description}</p>
      </div>
    )}
    </div>
  );
}

export default App;