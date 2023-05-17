import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, category, startTime, duration } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send({ message: "Employee does not exists" });
    }
    const task = new Task({
      description,
      category,
      startTime,
      duration,
    });
    await task.save();

    user.tasks.push(task);

    await user.save();

    return res
      .status(200)
      .send({ ok: true, message: "Task added successfully!", task });
  } catch (err) {
    //console.log(err);
    return res.status(400).send({ message: "Something went wrong!" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res
      .status(200)
      .send({ ok: true, message: "Tasks fetched successfully!", tasks });
  } catch (err) {
    //console.log(err);
    return res.status(400).send({ message: "Something went wrong!" });
  }
};
