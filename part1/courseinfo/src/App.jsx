// Header
function Header(props) {
  return <h1>{props.course}</h1>;
}

// Content
function Content(props) {
  return (
    <>
      <p>
        {props.parts[0].part1} {props.parts[0].exercises1}
      </p>
      <p>
        {props.parts[1].part2} {props.parts[1].exercises2}
      </p>
      <p>
        {props.parts[2].part3} {props.parts[2].exercises3}
      </p>
    </>
  );
}

// Total
function Total(props) {
  return (
    <p>
      Number of exercises{" "}
      {props.parts[0].exercises1 +
        props.parts[1].exercises2 +
        props.parts[2].exercises3}
    </p>
  );
}

function App() {
  // const [count, setCount] = useState(0)
  const course = {
    name: "Half Stack applicatin development",
    parts: [
      { part1: "Fundamentals of React", exercises1: 10 },
      { part2: "Using props to pass data", exercises2: 7 },
      { part3: "State of a component", exercises3: 14 },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
