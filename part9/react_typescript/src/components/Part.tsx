import React from "react";
import { CoursePart } from "../types";

const Part = ({part}: {part: CoursePart}) : JSX.Element => {
  let courseDeets;
  
  const assertNever = (value: never) : never => {
    throw new Error(
      `Unhandled discriminated union membor: ${JSON.stringify(value)}`
    )
  }

  switch (part.type) {
    case "normal":
      courseDeets = <i>{part.description}</i>;
      break;
    case "groupProject":
      courseDeets = <p>project exercises {part.groupProjectCount}</p>;
      break;
    case "submission":
      courseDeets = 
      <> 
        <i>{part.description}</i>
        <p>submit to {part.exerciseSubmissionLink}</p>
      </>;
      break;
    case "special":
      courseDeets =
      <>
        <i>{part.description}</i>
        <p>required skills: {part.requirements.join(', ')}</p>
      </>;
      break;
    default:
      return assertNever(part);
  }

  return (
    <>
      <h3>{part.name} {part.exerciseCount}</h3>
      {courseDeets}
    </>
  )
}

export default Part;