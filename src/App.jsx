/* Excersice 1.6 */

import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
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

      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

    
    </div>
  )
}

export default App