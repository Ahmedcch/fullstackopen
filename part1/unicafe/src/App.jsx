import { useState } from "react";
import "./App.css";

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}
function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}
function Statistic(props) {
  // Calculated the average & precentage
  /* I don't need to use a useState with these becuase the variables (good, bad, neutral) is changing from they state
  So we don't need their own memory */
  const total = props.good + props.bad + props.neutral;
  const average = ((props.good - props.bad) / total).toFixed(1);
  const precentage = ((props.good / total) * 100).toFixed(1);
  if (!total) {
    return <h2>No feedback given</h2>;
  }

  return (
    <table>
      <tbody>
        {/* Calling the StatisticLine custom component to our custom statistic component */}
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="precentage" value={precentage + " %"} />
      </tbody>
    </table>
  );
}

function App() {
  // Assign use States for each button
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  // Giving the usestate a functionality or action to do when the button is createded
  const goodBtn = () => setGood(good + 1);
  const neutralBtn = () => setNeutral(neutral + 1);
  const badBtn = () => setBad(bad + 1);

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button onClick={goodBtn} text="good" />
        <Button onClick={neutralBtn} text="neutral" />
        <Button onClick={badBtn} text="bad" />
      </div>
      <h1>Statistics</h1>
      <Statistic good={good} bad={bad} neutral={neutral} />
    </>
  );
}

export default App;
