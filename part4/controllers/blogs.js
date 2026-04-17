const bcrypt = require("bcrypt"); // A package for hashing the password
const usersRouter = require("express").Router();
// imports the User schema/model from user.js
const User = require("../models/blog");

// This defines a POST endpoint at /api/users/ that creates a new user.
usersRouter.post("/", async (request, response) => {
  // Extracting the data from the request body sent by the client.
  const { username, name, password } = request.body;

  // ells bcrypt how many times to mix the password (higher = more secure but slower)
  const saltRounds = 10;
  // converts plain text password into a hashed string.
  // await pauses execution until hashing finishes.
  const passwordHash = await bcrypt.hash(password, saltRounds);

  /* Creates a new User document with the extracted data (note: no plain password 
here, only the hash). */

  const user = new User({
    username, // is shorthand for username: username
    name,
    passwordHash,
  });
  // Saves the new user to MongoDB and waits for confirmation.
  const savedUser = await user.save();

  // HTTP 201 = "Created" (successful resource creation).
  response.status(201).json(savedUser);
});

// To get all the users list from /api/users/ URL
usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

// Exports the router so app.js can use it.
module.exports = usersRouter;
