import { CoursePart } from '../types';

const Total = ({ parts } : { parts: CoursePart[] }) => {
  const style = {
    marginTop: 50
  }
  const total : number = parts.reduce((total, part) => total + part.exerciseCount, 0);
  return <p style={style}>Number of exercises {total}</p>;
}

export default Total;