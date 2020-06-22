import React, { useState } from "react";
import FieldGroup from "./components/FieldGroup";
import "./App.css";

// TODO: add ability to remove fields
// TODO: colocate field state to individual wrapper component
// TODO: make button component
// TODO: exportable CSV?
// TODO: add function to remove field set from state
let id = 0;
const initialState = [
  {
    id,
    ph: "",
    salinity: "",
    temperature: "",
  },
];

function App() {
  const [fields, setFields] = useState(initialState);

  function addField() {
    setFields([...fields, ...initialState]);
  }

  function removeField() {
    if (!fields.length) return;
    const fieldsCopy = fields.slice(0, fields.length - 1);

    setFields(fieldsCopy);
  }

  return (
    <div className="App">
      <h1>pH Recalculator</h1>
      <p>
        Take pH<sub>NIST/NBS</sub> levels and recalculate for oceanic unit pH
        <sub>T</sub>
      </p>

      {fields.length &&
        fields.map((field) => <FieldGroup key={field.id} {...field} />)}

        <button onClick={() => addField()}>Add field group</button>

        <button onClick={() => removeField()}>Remove field group</button>

      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="heart emoji">
            ❤️
          </span>{" "}
          <a href="//oceanusenvironmental.com">Oceanus Environmental</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
