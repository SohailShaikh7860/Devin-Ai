import Project from "../models/project_model.js";
import { createProject,addUserToProject,getAllProjects,getProjectById } from "../services/project_service.js";
import { validationResult } from "express-validator";
import userModel from "../models/userModel.js";

const createProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    // ensure request is authenticated and req.user is present
    if (!req.user || !req.user.email) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // find the logged in user by email from req.user
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser?._id;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Could not determine user from token" });
    }

    const newProject = await createProject({ name, userId });
    res.status(201).json({ newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProjectsController = async (req, res) => {
  try {
    // ensure request is authenticated
    if (!req.user || !req.user.email) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // find the logged in user by email
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // find all projects where this user is in the users array
    const allUserProjects = await Project.find({ users: loggedInUser._id });
    return res.status(200).json({ projects: allUserProjects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const addUserToProjectController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { projectId, users } = req.body;

        const loggedInUser = await userModel.findOne({ email: req.user.email });

        const project = await addUserToProject({ projectId, users, userId: loggedInUser._id });

        return res.status(200).json({ project });
    } catch (error) {
        console.log("addUserProject Error",error);
        res.status(500).json({ error: error.message });
        
    }
}

const getProjectByIdController = async (req, res) => {
  const { projectId } = req.params;

  try {
    const projects = await getProjectById({ projectId });

    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export { createProjectController, getAllProjectsController, addUserToProjectController, getProjectByIdController };
