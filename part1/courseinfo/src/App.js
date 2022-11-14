const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  );
}

const Content = ({parts}) => {
  let nextId = () => Math.random() * 10000000;

  return (
    parts.map((lesson, ) => 
     <p key={nextId()}>{lesson.name} {lesson.exercises}</p>
    )
  );
};

const Total = ({parts}) => {
  console.log(parts);
  return (
    <p>Number of exercises: 
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default App
