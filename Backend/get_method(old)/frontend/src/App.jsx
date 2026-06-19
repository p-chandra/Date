import { useState } from "react";

function App() {
  const [length, setLength] = useState(null);
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [result, setResult] = useState("");

async function generate() {
  const res = await fetch(
    `http://127.0.0.1:5000/api/date-ideas?length=${length}&mood=${mood}&energy=${energy}`
  );

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    setResult(data.error ? data.error : "No ideas found");
    return;
  }

  const random =
    data.results[Math.floor(Math.random() * data.results.length)];

  setResult(random["date-idea"]);

}

  return (
    <div style={{ padding: 40 }}>
      <h2>Dating Length</h2>

      <button onClick={() => setLength(1)}>&lt; 3 months</button>
      <button onClick={() => setLength(2)}>3–6 months</button>
      <button onClick={() => setLength(3)}>&gt; 6 months</button>

      <h2>Activity Type</h2>

      <button onClick={() => setMood("Indoor")}>Indoor</button>
      <button onClick={() => setMood("Outdoor")}>Outdoor</button>

      <h2>Energy Level</h2>

      <button onClick={() => setEnergy("Active")}>Active</button>
      <button onClick={() => setEnergy("Relaxed")}>Relaxed</button>
      <br /><br />

      {length && mood && energy && (
        <button onClick={generate}>Generate</button>
      )}

      <h3>{result}</h3>
    </div>
  );
}

export default App;