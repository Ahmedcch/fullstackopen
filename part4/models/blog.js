// For the users component in the Mongoose Database
const mongoose = require("mongoose"); // To import the mongoose libirary in our porject

// The schema or the structure of the object in our database
// NOTE: We don't need an Id here because we added the notes under the user that create it
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true, // this ensures the uniqueness of username
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId, // An Array of all the user's Notes Id
      ref: "Note",
    },
  ],
});

// To convert the code form JavaScript object to JSON code.
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
