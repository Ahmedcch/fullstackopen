function Filter(props) {
  return (
    <>
      <div>
        <input type="search" onChange={props.findname} />
      </div>

      <ul>{props.keyword}</ul>
    </>
  );
}
export default Filter;
