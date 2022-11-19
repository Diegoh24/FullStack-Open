import { CoursePart } from '../types';
import Part from "./Part"

const Content = ({parts}: {parts: CoursePart[] }) : JSX.Element => {
  
  const nextId = (): number => Math.floor(Math.random() * 1000000);

  return (
  <>
    {parts.map((part) => (
      <Part key={nextId()} part={part} />
    ))}
  </>
  )
};


export default Content;