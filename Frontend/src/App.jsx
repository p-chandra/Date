import data from "./data.json";
import { useState, useRef, useEffect } from "react";
import "./App.css";

const relationshipOptions = [
  { label: "New", value: 1 },
  { label: "Serious", value: 2 },
  { label: "Long-Term", value: 3 },
];

const moodOptions = ["Indoor", "Outdoor"];
const energyOptions = ["Relaxed", "Active"];

function App() {
  const [length, setLength] = useState(null);
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [result, setResult] = useState(null);
  const [shownIdeas, setShownIdeas] = useState([]);

  const resultRef = useRef(null);

  function matchesMood(item, selectedMood) {
    return item.mood === selectedMood || item.mood === "Mixed";
  }

  useEffect(() => {
    if (result) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  useEffect(() => {
    setShownIdeas([]);
    setResult("");
  }, [length, mood, energy]);

  function generate() {
    const results = data.filter(
      (item) =>
        item["dating-length"] <= length &&
        matchesMood(item, mood) &&
        item.energy === energy
    );

    if (results.length === 0) {
      setResult({
        title: "No Matches",
        description: "Try another combination.",
      });
      return;
    }

    let available = results.filter(
      (item) => !shownIdeas.includes(item.title)
    );

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
      (!mood || matchesMood(item, mood)) &&
      (!energy || item.energy === energy)
  ).length;

  function renderOptions(options, selectedValue, onSelect) {
    return (
      <div className="button-group">
        {options.map((option) => {
          const value = option.value ?? option;
          const label = option.label ?? option;

          return (
            <button
              key={value}
              onClick={() => onSelect(value)}
              className={selectedValue === value ? "selected" : ""}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Date Generator</h1>
      <p className="subtitle">Find something you'll both actually enjoy.</p>

      <div className="section">
        <h2>Relationship Stage</h2>
        {renderOptions(relationshipOptions, length, setLength)}
      </div>

      <div className="section">
        <h2>Activity Type</h2>
        {renderOptions(moodOptions, mood, setMood)}
      </div>

      <div className="section">
        <h2>Energy Level</h2>
        {renderOptions(energyOptions, energy, setEnergy)}
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
          <p className="result-label">Recommended Date</p>
          <h2>{result.title}</h2>
          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
