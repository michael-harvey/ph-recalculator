import React, { useState } from "react";
import FieldGroup from "./components/FieldGroup";
import "./App.css";

// TODO: add ability to remove fields
// TODO: colocate field state to individual wrapper component
let id = 0;
const initialState = [
  {
    id,
    ph: 0,
    salinity: 0,
    temperature: 0,
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

      {fields.length &&
        fields.map((field) => <FieldGroup key={field.id} {...field} />)}

      <button onClick={() => setFields([...fields, initialState])}>
        Add field group
      </button>

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
