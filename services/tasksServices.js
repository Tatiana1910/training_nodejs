const { HttpError } = require("../utils/HttpError");
const { Task } = require("../models/Task");

const getTasksService = async () => {
  return await Task.find();
};

const getTaskService = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new HttpError(404, "Task is not found");
  }
  return task;
};

const createTaskService = async (data) => {
  return await Task.create(data);
};

const updateTaskService = async (id, data) => {
  const editedTask = await Task.findByIdAndUpdate(id, data);
  if (!editedTask) {
    throw new HttpError(404, "Task is not found");
  }
  return editedTask;
};

const deleteTaskService = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw new HttpError(404, "Task is not found");
  }
  return task;
};

module.exports = {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
