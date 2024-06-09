import cloudinary from "cloudinary";
import User from "../models/User.js";

const createCurrentUser = async (req, res) => {
  try {
    const { auth0Id } = req.body;

    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

const updateCurrentUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    user.name = name;

    if (req.file) {
      const imageUrl = await uploadImage(req.file[0]);
      user.imageUrl = imageUrl;
    }
    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating user",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAdminMessage = (req, res) => {
  try {
    const isAdmin = true;
    res.json({ message: "reched", isAdmin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const uploadImage = async (file) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
  getAdminMessage,
};
