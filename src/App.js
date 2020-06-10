import React, { useState } from "react";
import "./App.css";

function App() {
  const [ph, setPh] = useState(8.1);
  const [salinity, setSalinity] = useState(35);
  const [temperature, setTemperature] = useState(25);

  // correct pH (NIST/NBS) levels
  function calculatePh() {
    return ph + (temperature - 25) * 0.0159;
  }

  // convert celcius to kelvin units
  function calculateKelvin() {
    return temperature + 273.15;
  }

  function calculateIonicStrength() {
    return (19.924 * salinity) / (1000 - 1.005 * salinity);
  }

  // calculate sulfate (SO4)
  function calculateSO4Total() {
    return (0.14 / 96.062) * (salinity / 1.80655);
  }

  // calculate potassium bisulfate
  function calculatePotassiumBisulfate() {
    return Math.exp(
      -4276.1 / calculateKelvin() +
        141.328 -
        23.093 * Math.log(calculateKelvin()) +
        (-13856 / calculateKelvin() +
          324.57 -
          47.986 * Math.log(calculateKelvin())) *
          Math.pow(calculateSO4Total(), 0.5) +
        (35474 / calculateKelvin() -
          771.54 +
          114.723 * Math.log(calculateKelvin())) *
          calculateSO4Total() -
        (2698 / calculateKelvin()) * Math.pow(calculateSO4Total(), 1.5) +
        (1776 / calculateKelvin()) * Math.pow(calculateSO4Total(), 2) +
        Math.log(1 - 0.001005 * calculateIonicStrength())
    );
  }

  function calculateTotalPh() {
    return (
      calculatePh() -
      Math.log10(calculateSO4Total() / calculatePotassiumBisulfate())
    );
  }

  return (
    <div className="App">
      <h1>pH Recalculator</h1>
      <p>
        Take pH<sub>NIST/NBS</sub> levels and recalculate for oceanic unit pH
        <sub>T</sub>
      </p>

      <label>
        pH<sub>NIST/NBS</sub>
        <input
          name="ph"
          type="number"
          value={ph}
          onChange={(e) => setPh(parseFloat(e.target.value))}
        />
      </label>

      <label>
        Salinity
        <input
          name="salinity"
          type="number"
          value={salinity}
          onChange={(e) => setSalinity(parseFloat(e.target.value))}
        />
      </label>

      <label>
        Temperature (°C)
        <input
          name="temperature"
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
      </label>

      <p>
        pH: {ph}
        <br /> Salinity:{salinity}
        <br /> Temperature:{temperature}
        <br /> Corrected pH: {calculatePh()}
        <br /> Kelvin: {calculateKelvin()}
        <br /> Ionic strength: {calculateIonicStrength()}
        <br /> SO4 total: {calculateSO4Total()}
        <br /> Potassium bisulfate: {calculatePotassiumBisulfate()}
        <br /> Total pH: {calculateTotalPh()}
      </p>
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
