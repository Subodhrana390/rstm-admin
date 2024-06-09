import cloudinary from "cloudinary";
import Project from "../models/Project.js";
import mongoose from "mongoose";

const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);

    if (!req.body) {
      throw new Error("Missing parameter");
    }
    newProject.user = new mongoose.Types.ObjectId(req.userId);

    console.log(req.file);
    if (req.file) {
      const imageUrl = await uploadImage(req.file);
      newProject.coverPageUrl = imageUrl;
    }

    await newProject.save();
    res.status(201).json(newProject.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

const getProjectByUser = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId });

    if (!projects) {
      return res.status(404).json({
        message: "no Project found!",
        data: [],
      });
    }

    const total = await Project.countDocuments({ user: req.userId });

    const response = {
      data: projects,
      pagination: {
        total,
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById({ _id: projectId });

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something get Wrong" });
  }
};

const updateMyProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      user: req.userId,
      _id: req.params.id,
    });
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    project.title = req.body.title;
    project.shortdesc = req.body.shortdesc;
    project.desc = req.body.desc;
    project.eventDate = req.body.eventDate;
    project.startingTime = req.body.startingTime;
    project.endingTime = req.body.endingTime;
    project.venue = req.body.venue;
    project.slug = req.body.slug;

    if (req.file) {
      const imageUrl = await uploadImage(req.file);
      project.coverPageUrl = imageUrl;
    }

    await project.save();
    res.status(201).send(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching projects",
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
  createProject,
  getProjectByUser,
  updateMyProject,
  getProjectById,
};
