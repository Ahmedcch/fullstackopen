const Note = (e) => {
  return (
    <div>
      <br />
      <br />
      <h2>Create new Note </h2>
      <br />
      <form onSubmit={e.onSubmitFun}>
        <div>
          <label htmlFor="content">
            Content:
            <input
              onChange={e.contentChange}
              type="textarea"
              value={e.contentValue}
            />
          </label>
        </div>
        <div>
          <label htmlFor="important">
            Important or not:
            <select
              onChange={e.importantChange}
              id="important"
              name="important"
              value={e.importantValue}
            >
              <option value="true">True</option>
              <option value="false" defaultValue>
                False
              </option>
            </select>
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
      <br />
      <br />
    </div>
  );
};
export default Note;
