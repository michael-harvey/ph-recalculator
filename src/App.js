import React, { useState } from "react";
import FieldGroup from "./components/FieldGroup";
import "./App.css";

// TODO: add ability to add more fields
// TODO: colocate field state to individual wrapper component
// TODO: keep state array for each set of fields

let id = 0;
const initialState = [
  {
    id,
  },
  {
    id,
  },
];

function App() {
  const [fields, setFields] = useState(initialState);
  return (
    <div className="App">
      <h1>pH Recalculator</h1>
      <p>
        Take pH<sub>NIST/NBS</sub> levels and recalculate for oceanic unit pH
        <sub>T</sub>
      </p>

      {fields.map(() => (
        <FieldGroup />
      ))}

      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="heart emoji">
            ❤️
          </span>{" "}
          by Emily Joy Frost - Oceanus Environmental
        </p>
      </footer>
    </div>
  );
}

export default App;
