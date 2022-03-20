const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  head: {
    type: String,
  },
  text: {
    type: String,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
