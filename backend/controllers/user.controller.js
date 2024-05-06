import User from "../models/user.model.js";

export const getAllUserForSidebar = async (req, res) => {
  try {
    const userId = req?.user._id;
    const getUserList = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    res.status(200).json(getUserList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
