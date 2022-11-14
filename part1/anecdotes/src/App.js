import { useState } from 'react'
import MostVoted from './components/MostVoted';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  function getRandom() {
    let random = Math.floor(Math.random() * anecdotes.length);
    return random === selected ? getRandom() : random;
  }

  function updateVotes() {
    let newVotes = {...votes}
    let anecdote = anecdotes[selected];
    newVotes[anecdote] = newVotes[anecdote] ? newVotes[anecdote] + 1 : 1;

    setVotes(newVotes);
  }

  let anecdote = anecdotes[selected];

  return (
    <div>
      <h1>anectode of the day</h1>
      <p>{anecdote}</p>
      <button onClick={updateVotes}>Vote</button>
      <button onClick={() => setSelected(getRandom)}>new anectode</button>
      <p>Has {votes[anecdote] || 0} votes</p>

      <MostVoted votes={votes} />
    </div>
  )
}

export default App