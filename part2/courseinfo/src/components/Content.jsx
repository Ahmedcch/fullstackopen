const Part = (props) => {
  let id = 0;
  const showData = props.part.map((obj) => {
    id++;
    return (
      <p key={id}>
        {obj.name} {obj.exercises}
      </p>
    );
  });
  return showData;
};
function Content(props) {
  return (
    <div>
      <Part part={props.parts} />
    </div>
  );
}
export default Content;
