function PersonForm(props) {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input type="text" onChange={props.name} value={props.newName} />
        Number:{" "}
        <input type="number" onChange={props.number} value={props.newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
export default PersonForm;
