function Form(props) {
  return (
    <>
      <input onChange={props.change} value={props.value} />
    </>
  );
}

export default Form;
