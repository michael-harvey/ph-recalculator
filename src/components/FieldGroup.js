import React, { useState } from "react";
import InputField from "./InputField";

// TODO: copy to clipboard for 'Total pH'
// TODO: add remove field group functionality
function FieldGroup(props) {
  const [ph, setPh] = useState(props.ph);
  const [salinity, setSalinity] = useState(props.salinity);
  const [temperature, setTemperature] = useState(props.temperature);

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

  const calculateTotalPh = () => {
    return (
      calculatePh() -
      Math.log10(calculateSO4Total() / calculatePotassiumBisulfate())
    );
  };

  const hasAllValues = !!(ph && salinity && temperature);

  return (
    <div className="fieldgroup">
      <form className="fieldgroup__wrapper" noValidate>
        <InputField
          label="pH<sub>NIST/NBS</sub>"
          id="ph"
          type="number"
          step=".01"
          name="ph"
          value={ph}
          placeholder="Enter pH"
          onChange={(e) => setPh(parseFloat(e.target.value))}
        />

        <InputField
          label="Salinity"
          id="salinity"
          type="number"
          name="salinity"
          value={salinity}
          placeholder="Enter salinity"
          onChange={(e) => setSalinity(parseFloat(e.target.value))}
        />

        <InputField
          label="Temperature (°C)"
          id="temperature"
          type="number"
          name="temperature"
          value={temperature}
          placeholder="Enter temperature"
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
      </form>

      <table>
        <thead>
          <tr>
            <th>Ionic strength:</th>
            <th>SO4 total:</th>
            <th>Potassium bisulfate:</th>
            <th>Total pH:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{hasAllValues ? calculateIonicStrength() : "-"}</td>
            <td>{hasAllValues ? calculateSO4Total() : "-"}</td>
            <td>{hasAllValues ? calculatePotassiumBisulfate() : "-"}</td>
            <td>
              {hasAllValues ? calculateTotalPh() : "-"}
              {/* <svg
              width="20"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 125"
            >
              <path d="M36 6c-3.29 0-6 2.71-6 6v10h-6c-3.29 0-6 2.71-6 6v60c0 3.29 2.71 6 6 6h40c3.29 0 6-2.71 6-6V78h6c3.29 0 6-2.71 6-6V26a2 2 0 00-.594-1.406l-18-18A2 2 0 0062 6H44a2 2 0 100 4h16v16a2 2 0 002 2h16v44c0 1.143-.857 2-2 2H36c-1.143 0-2-.857-2-2V12c0-1.143.857-2 2-2a2 2 0 100-4zm28 6.813L75.188 24H64V12.812zM24 26h6v46c0 3.29 2.71 6 6 6h30v10c0 1.143-.857 2-2 2H24c-1.143 0-2-.857-2-2V28c0-1.143.857-2 2-2z" />
            </svg> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FieldGroup;
