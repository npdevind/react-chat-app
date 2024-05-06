import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, conPassword, gender } = req.body;
    if (password !== conPassword)
      return res.status(400).json({ error: "confirm password not match" });

    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: "username already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //if model filed name and req.body.data is not same then model_fields : req.body.data1
    const newUser = new User({
      fullName,
      username,
      password: hashPass,
      gender,
      profilePic,
    });

    if (newUser) {
      await newUser.save();
      await generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        message: "Successfully signup",
        user: newUser,
      });
    } else {
      return res.status(400).json({ error: "Invalid user details found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid user name." });
    const checkPass = await bcrypt.compare(password, user?.password);
    if (!checkPass) return res.status(400).json({ error: "Invalid password." });

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      message: "login successful",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "logout successful",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
