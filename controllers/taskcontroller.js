import TaskModel from "../models/taskmodel.js";

export const GetAllTasks = async (req, res, next) => {
  try {
    const taskRecord = await TaskModel.find();
    res.status(200).json(taskRecord);
  } catch (error) {
    console.error("Error getting tasks records:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};

export const GetSingleTask = async (req, res, next) => {
  try {
    const singletaskRecord = await TaskModel.findById(req.params.taskId);
    if (!singletaskRecord) {
      return res.status(404).json({ error: "task record not found" });
    }
    res.status(200).json(singletaskRecord);
  } catch (error) {
    console.error("Error getting task record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errmsg: error.message });
  }
};

export const CreateTask = async (req, res, next) => {
  try {
    const {
      userId,
      pending,
      completed,
      totaltasks,
      earnCommission,
      frozenamount,
      orderQuantity,
      availableBalance,
    } = req.body;

    // Create a new Order instance
    const newTask = new TaskModel({
      userId,
      pending,
      completed,
      totaltasks,
      earnCommission,
      frozenamount,
      orderQuantity,
      availableBalance,
    });

    // Save the record to the database
    await newTask.save();

    res.status(201).json({ message: "Task record submitted successfully" });
  } catch (error) {
    console.error("Error submitting Task record:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", errormsg: error.message });
  }
};

export const UpdateTask = async (req, res, next) => {
  try {
    const UpdateTaskRecord = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );
    if (!UpdateTaskRecord) {
      return res.status(404).json({ error: "Task record not found" });
    }
    res.status(200).json(UpdateTaskRecord);
  } catch (error) {
    console.error("Error updating task record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
export const DeleteTask = async (req, res, next) => {
  try {
    const DeleteTaskAccount = await TaskModel.findByIdAndDelete(
      req.params.taskId
    );
    if (!DeleteTaskAccount) {
      return res.status(404).json({ error: "Task record not found" });
    }
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting Task record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
