// For the Login functionality or Code
const jwt = require("jsonwebtoken"); // For the JSON web token liberary
const bcrypt = require("bcrypt"); // For the password hashing library
const loginRouter = require("express").Router(); // For the login Router that we will create a routes that the user submit the username and password on it a URL
const User = require("../models/blog"); // To import The User Document or schema

loginRouter.post("/", async (request, response) => {
  // Create a new route
  // Getting the user name and the password
  const { username, password } = request.body;
  // To find the user name that matches the username that in our response
  const user = await User.findOne({ username });
  // To check if the password is matches our password that is in database or not
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // send Success state if the username and password are matches
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  // I don't know what it does
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  // I don't know what it does
  const token = jwt.sign(userForToken, process.env.SECRET);
  // I don't know what it does
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
