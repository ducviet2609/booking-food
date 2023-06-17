import userModel from "../modelss/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//get user
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    const { password, ...other } = user._doc;
    if (user) {
      res.status(200).json(other);
    } else res.status(404).json("no such user exists");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all user
export const getAllUsers = async (req, res) => {
  try {
    let users = await userModel.find();
    users = users.map((user) => {
      const { password, ...other } = user._doc;
      return other;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, oldPassword, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const oldUser = await userModel.findById(id);
        const verify = await bcrypt.compare(oldPassword, oldUser.password);
        if (verify) {
          const salt = await bcrypt.genSalt(10);
          const newPassword = await bcrypt.hash(password, salt);
          const user = await userModel.findByIdAndUpdate(
            id,
            { password: newPassword },
            { new: true }
          );
          const token = jwt.sign(
            {
              username: user.username,
              id: user._id,
            },
            process.env.JWT_KEY
          );
          res.status(200).json({ user, token });
        } else res.status(400).json("Mật khẩu cũ không đúng");
      } else {
        const user = await userModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY
        );
        res.status(200).json({ user, token });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else
    res.status(403).json("Access Denied! You can`t update your own profile");
};

//delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, AdminStatus } = req.body;

  if (id === currentUserId || AdminStatus) {
    try {
      await userModel.findByIdAndDelete(id);
      res.status(200).json("User Deleteed");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else
    res.status(403).json("Access Denied! You can`t delete your own profile");
};
