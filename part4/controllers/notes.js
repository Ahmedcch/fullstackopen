// For all the project routes
// This file contains all our routs
const jwt = require("jsonwebtoken"); // To create a JSON webtokens
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/blog");

// Replace it with async await function
// notesRouter.get("/", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

// For the web token
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.get("/", async (request, response, next) => {
  try {
    // NOTE: populate don't want to work when i checked it in http://localhost:3001/api/notes
    const notes = await Note.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(notes);
  } catch (error) {
    next(error);
  }
});

notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;
  // For the web token
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  // End
  // const user = await User.findById(body.userId);

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id, // For the user id
  });
  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(201).json(savedNote);
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
