const Content = ({parts}) => {
  return (
    parts.map(lesson => 
     <p key={lesson.id}>{lesson.name} {lesson.exercises}</p>
    )
  );
};

export default Content;