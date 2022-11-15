const Total = ({parts}) => {
  let total = parts.map(lesson => lesson.exercises)
                   .reduce((total, number) => total + number);
            
  return (
    <b> Total of {total} exercises </b>
  );
}

export default Total;