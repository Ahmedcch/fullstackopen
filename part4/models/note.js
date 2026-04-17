// For the notes component in the Mongoose Database
// Moving mongoose to it's own file or module
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// To get this URL dynamic: `mongodb+srv://ahmedjoker1627_db_user:${encodeURIComponent(password)}@cluster0.kn4ghux.mongodb.net/noteApp?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url, { family: 4 })

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: Boolean,
  // For the users info
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // To reference to the User document
  },
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
