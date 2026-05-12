const Form = (e) => {
  return (
    <>
      <h2>Log in to Application</h2>
      <form onSubmit={e.onSubmitFun}>
        <div>
          <label htmlFor="username">
            username
            <input onChange={e.emailChange} type="text" value={e.emailValue} />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password
            <input
              onChange={e.passwordChange}
              type="password"
              value={e.passwordValue}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default Form;
