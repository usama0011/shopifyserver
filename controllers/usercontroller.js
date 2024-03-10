import User from "../models/usermodel.js";

// Get a specific user by ID
export const GetsingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all usersD
export const GetAllUsers = async (req, res) => {
  try {
    let userRecords = await User.find();
    res.status(200).json(userRecords);
  } catch (error) {
    console.error("Error getting users:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};

// Update an user by ID
export const UpdateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};

// Delete an user by ID
export const DeleteUser = async (req, res) => {
  try {
    const deleteuser = await User.findByIdAndDelete(req.params.userId);
    if (!deleteuser) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json("User Deleted Successfully");
  } catch (error) {
    console.error("Error deleting User by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
