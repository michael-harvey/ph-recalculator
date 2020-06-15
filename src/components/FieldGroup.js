import React, { useState } from "react";
import TextField from "./TextField";

// TODO: add ability to add more fields
// TODO: colocate field state to individual wrapper component
// TODO: keep state array for each set of fields

function FieldGroup() {
  const [ph, setPh] = useState(8.1);
  const [salinity, setSalinity] = useState(35);
  const [temperature, setTemperature] = useState(25);

  // correct pH (NIST/NBS) levels
  const calculatePh = () => ph + (temperature - 25) * 0.0159;

  // convert celcius to kelvin units
  const calculateKelvin = () => temperature + 273.15;

  const calculateIonicStrength = () =>
    (19.924 * salinity) / (1000 - 1.005 * salinity);

  // calculate sulfate (SO4)
  const calculateSO4Total = () => (0.14 / 96.062) * (salinity / 1.80655);

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

  const calculateTotalPh = () =>
    calculatePh() -
    Math.log10(calculateSO4Total() / calculatePotassiumBisulfate());

  return (
    <div className="App">
      <label>
        pH<sub>NIST/NBS</sub>
        <TextField
          id="ph"
          type="number"
          name="ph"
          value={ph}
          placeholder="Enter pH"
          onChange={(e) => setPh(parseFloat(e.target.value))}
        />
      </label>

      <label>
        Salinity
        <TextField
          id="salinity"
          type="number"
          name="salinity"
          value={salinity}
          placeholder="Enter salinity"
          onChange={(e) => setSalinity(parseFloat(e.target.value))}
        />
      </label>

      <label>
        Temperature (°C)
        <TextField
          id="temperature"
          type="number"
          name="temperature"
          value={temperature}
          placeholder="Enter temperature"
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
      </label>

      <p>
        Ionic strength: {calculateIonicStrength()}
        <br /> SO4 total: {calculateSO4Total()}
        <br /> Potassium bisulfate: {calculatePotassiumBisulfate()}
        <br /> Total pH: {calculateTotalPh()}
      </p>
    </div>
  );
}

export default FieldGroup;
