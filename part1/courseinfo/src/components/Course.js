import Header from './Header';
import Total from './Total';
import Content from './Content';

const Course = ({id, name, parts}) => {
  return (
    <>
      <Header course={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
};

export default Course;