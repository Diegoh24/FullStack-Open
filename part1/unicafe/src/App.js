import { useState } from 'react'

const Statistics = ({all, average, positive}) => {
  if (!all) return <tr><td>{"No feedback Given"}</td></tr>;
  return (
    <>
      <StatisticLine name="all" count={all}/>
      <StatisticLine name="average" count={average}/>
      <tr>
        <td>Positive</td>
        <td>{positive} %</td>
      </tr>
    </>
  )
}

const StatisticLine = ({name, count}) => {
  return (
    <>  
      <tr>
        <td>{name}</td>
        <td>{count}</td>
      </tr>
    </>
  )
}

const Button = ({name, onClick}) => {
  return (<button onClick={onClick}>{name}</button>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad
  let average = (good + (bad * -1.0)) / all;
  let positive = good * 1.0 / all;
    
  let stats = {all, average, positive};

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="Good" onClick={() => setGood(good + 1)} />
      <Button name="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button name="Bad" onClick={() => setBad(bad + 1)} />

      <h2>Statistics</h2>

      <table>
        <tbody>
          <StatisticLine name="Good" count={good} />
          <StatisticLine name="Neutral" count={neutral} />
          <StatisticLine name="Bad" count={bad} />
          <Statistics {...stats} />
        </tbody>
      </table>


    </div>
  )
}

export default App