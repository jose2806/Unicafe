import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistics = (props) => {
  if (props.total == 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticLine text="Good" value={props.good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="Neutral" value={props.neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="Bad" value={props.bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="Total" value={props.total} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="Average" value={props.average} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="Positive" value={props.positive} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = (props) => {
  return (
    <>
      <p>
        {props.text} {props.value}
      </p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updateGood = good + 1;
    const updateTotal = total + 1;
    setGood(updateGood);
    setTotal(updateTotal);
    handleAverage(updateGood, neutral, bad, updateTotal);
    handlePositive(updateGood, updateTotal);
  };

  const handleNuetralClick = () => {
    const updateNeutral = neutral + 1;
    const updateTotal = total + 1;
    setNeutral(updateNeutral);
    setTotal(updateTotal);
    handleAverage(good, updateNeutral, bad, updateTotal);
    handlePositive(good, updateTotal);
  };

  const handleBadClick = () => {
    const updateBad = bad + 1;
    const updateTotal = total + 1;
    setBad(updateBad);
    setTotal(updateTotal);
    handleAverage(good, neutral, updateBad, updateTotal);
    handlePositive(good, updateTotal);
  };

  function handleAverage(good, neutral, bad, total) {
    const average = good * 1 + neutral * 0 + bad * -1;
    const result = average / total;
    setAverage(result);
  }

  function handlePositive(good, total) {
    const result = (good / total) * 100;
    setPositive(result);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <Button onClick={handleGoodClick} text="Good" />
            </td>
            <td>
              <Button onClick={handleNuetralClick} text="Neutral" />
            </td>
            <td>
              <Button onClick={handleBadClick} text="Bad" />
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <h2>Statistics</h2>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                average={average}
                positive={positive}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
