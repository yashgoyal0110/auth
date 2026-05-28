import User from "../models/user.model.js";

export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(400).json({
      message: "no user exists with given id",
    });
  }

  return res.status(200).json({
    message: "user deleted successfully",
  });
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const dataToBeUpdated = req.body;

  const updatedUser = await User.findByIdAndUpdate(id, dataToBeUpdated);

  if (!updatedUser) {
    return res.status(400).json({
      message: "no user exists with given id",
    });
  }

  return res.status(200).json({
    message: "user updated successfully",
  });
};

export const getAllUsers = async (req, res) => {

  const allUsers = await User.find({});

  return res.status(200).json({
    message: "user fetched successfully",
    users: allUsers
  });
};

