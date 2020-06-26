import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";

// TODO: copy to clipboard for 'Total pH'
// TODO: move calculation functions to external utilities
function FieldGroup(props) {
  const [ph, setPh] = useState(props.ph);
  const [salinity, setSalinity] = useState(props.salinity);
  const [temperature, setTemperature] = useState(props.temperature);

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
    return ph - Math.log10(calculateSO4Total() / calculatePotassiumBisulfate());
  };

  const hasAllValues = !!(ph && salinity && temperature);

  function formatFloatValue({ value, toDecimalPlace }) {
    if (!hasAllValues) return "-";

    return Number.parseFloat(value).toFixed(toDecimalPlace);
  }

  return (
    <div className="fieldgroup" data-testid="field-group">
      <form noValidate>
        <InputField
          label="pH<sub>NIST/NBS</sub>"
          id="ph"
          type="number"
          step=".01"
          name="ph"
          value={ph}
          placeholder="Enter pH"
          onChange={(e) => setPh(parseFloat(e.target.value))}
          pattern={"[0-9]*"}
        />

        <InputField
          label="Salinity"
          id="salinity"
          type="number"
          name="salinity"
          value={salinity}
          placeholder="Enter salinity"
          onChange={(e) => setSalinity(parseFloat(e.target.value))}
          pattern={"[0-9]*"}
        />

        <InputField
          label="Temperature (°C)"
          id="temperature"
          type="number"
          name="temperature"
          value={temperature}
          placeholder="Enter temperature"
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          pattern={"[0-9]*"}
        />
      </form>

      <ul>
        <li>
          <b>Ionic strength:</b>
          <span data-testid="ionic-strength">
            {formatFloatValue({
              value: calculateIonicStrength(),
              toDecimalPlace: 3,
            })}
          </span>
        </li>
        <li>
          <b>SO4 total:</b>
          <span data-testid="so4-total">
            {formatFloatValue({
              value: calculateSO4Total(),
              toDecimalPlace: 3,
            })}
          </span>
        </li>
        <li>
          <b>Potassium bisulfate:</b>
          <span data-testid="potassium-bisulfate">
            {formatFloatValue({
              value: calculatePotassiumBisulfate(),
              toDecimalPlace: 3,
            })}
          </span>
        </li>
        <li>
          <b>Total pH:</b>
          <span data-testid="total-ph">
            {formatFloatValue({
              value: calculateTotalPh(),
              toDecimalPlace: 3,
            })}
          </span>
        </li>
      </ul>
    </div>
  );
}

InputField.propTypes = {
  ph: PropTypes.number,
  salinity: PropTypes.number,
  temperature: PropTypes.number,
};

export default FieldGroup;
