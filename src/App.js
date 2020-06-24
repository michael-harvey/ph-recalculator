import React, { useState } from "react";
import FieldGroup from "./components/FieldGroup";
import "./App.css";

const initialState = [
  {
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
    if (fields.length === 1) return;
    const fieldsCopy = fields.slice(0, fields.length - 1);

    setFields(fieldsCopy);
  }

  return (
    <>
      <main>
        <h1>pH Recalculator</h1>
        <p>
          Take pH<sub>NIST/NBS</sub> levels and recalculate for oceanic unit pH
          <sub>T</sub>
        </p>

        {!!fields.length &&
          fields.map((field) => <FieldGroup key={field.id} {...field} />)}

        <button onClick={() => addField()}>Add field group</button>

        <button onClick={() => removeField()}>Remove field group</button>
      </main>

      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="heart emoji">
            ❤️
          </span>{" "}
          by Emily Joy Frost -{" "}
          <a href="//oceanusenvironmental.com">Oceanus Environmental</a>
        </p>
      </footer>
    </>
  );
}

export default App;
