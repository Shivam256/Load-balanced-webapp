import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  duration: {
    type: Number,
  },
});

const User = mongoose.model("Task", TaskSchema);

export default User;
