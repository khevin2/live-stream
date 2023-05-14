import { User } from "../models/user.model.js";
import CryptoJS from "crypto-js";
let secret = "SECRET";
export const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      res.status(404).json({ message: `No such User found`, status: 401 });
    let bytes = CryptoJS.AES.decrypt(user.password, secret);

    let password = bytes.toString(CryptoJS.enc.Utf8);

    if (password !== req.body.password)
      res
        .status(401)
        .json({ message: "Invalid email or password", status: 401 });
    else {
      req.session.email = req.body.email;
      console.log(req.session);
      res.status(200).json({
        names: user.names,
        phone: user.phone,
        email: user.email,
        role: user.role,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    let users = await User.find({}).select({ password: 0 });
    if (!users) res.status(400).json("There are some issues :(");
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ e });
  }
};

export const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.query.userId).select({ password: 0 });
    if (!user) res.status(200).json("No user found with this ID :(");
    res.status(200).json(user);
  } catch (e) {
    res.status(400);
  }
};
