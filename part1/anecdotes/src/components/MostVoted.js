const MostVoted = ({votes}) => {
  let anecdotes = Object.keys(votes);

  let mostVoted = anecdotes.reduce((max, anecdote) => {
    return votes[max] < votes[anecdote] ? anecdote : max;
  }, anecdotes[0])

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{mostVoted || 'No Votes Yet'}</p>
      <p>Has {votes[mostVoted] || 0} Votes</p>
    </>
  )
}

export default MostVoted;
