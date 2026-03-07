import Header from "./Header";
import Content from "./Content";

const Total = (props) => {
  const total = props.total.reduce((sum, num) => sum + num.exercises, 0);
  return <p>Total of {total} exercises </p>;
};

const Course = ({ courses }) => {
  let id = 0;
  const course =
    courses.map((c) => {
      id++;
      return (
        <div key={id}>
          <Header course={c.name} />
          <Content parts={c.parts} />
          <Total total={c.parts} />
        </div>
      );
    }) ?? "";

  return course;
};
export default Course;
