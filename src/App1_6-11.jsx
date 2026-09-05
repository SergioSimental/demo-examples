/* Excersice 1.6 */

import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
}

const Statistics = (props) => {
    return (
        <table>
          <tbody>
            <StatisticsLine text="good" value={props.good} />
            <StatisticsLine text="neutral" value={props.neutral} />
            <StatisticsLine text="bad" value={props.bad} />
            <StatisticsLine text="all" value={props.good + props.neutral + props.bad} />
            <StatisticsLine text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad) || 0} />
            <StatisticsLine text="positive" value={((props.good) / (props.good + props.neutral + props.bad) * 100 || 0) + ' %'} />
          </tbody>
        </table>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log('values before click', good, neutral, bad)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log('values before click', good, neutral, bad)
    setNeutral(neutral + 1)
  }

    const handleBadClick = () => {
    console.log('values before click', good, neutral, bad)
    setBad(bad + 1)
  }

  return (
    <div> 
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

    {good + neutral + bad === 0 ? (
        <p>No feedback given</p>
      ) : (
      <div>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
      )}
    </div>
  )
}

export default App


{/* const App = () => {
            <p>neutral {props.neutral}</p>
            <p>bad {props.bad}</p>
            <p>all {props.good + props.neutral + props.bad}</p>
            <p>average {(props.good - props.bad) / (props.good + props.neutral + props.bad) || 0}</p>
            <p>positive {(props.good) / (props.good + props.neutral + props.bad) || 0}</p>
        </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        console.log('values before click', good, neutral, bad)
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        console.log('values before click', good, neutral, bad)
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        console.log('values before click', good, neutral, bad)
        setBad(bad + 1)
    }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      {good + neutral + bad === 0 ? (
        <p>No feedback given</p>
      ) : (
      <div>   
        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <p>average {(good - bad) / (good + neutral + bad) || 0}</p>
        <p>positive {(good) / (good + neutral + bad) || 0}</p>
      </div>
      )}
      </div> 
  )
}


export default App */}