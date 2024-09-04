import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "user already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
    });
    if (newUser) {
      await newUser.save();
      res.status(200).json({
        id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        password: newUser.password,
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const ispasswordcorrect = await bcrypt.compare(
      password,
      user.password || ""
    );
    if (!user || !ispasswordcorrect) {
      return res.status(400).json({ error: "Invalid username and password" });
    }
    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
