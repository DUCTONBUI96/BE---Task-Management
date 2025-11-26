import express from "express";
import { ProjectController } from "../controllers/ProjectController";

const Project = express.Router();
const projectController = new ProjectController();

// GET
// Project.get("/projects", projectController.getAllProjects);
Project.get("/projects", projectController.getAllProjectsDetail);
Project.get("/projects/:id", projectController.getProjectById);
Project.get("/projects/:id/member", projectController.getProjectMembers);

// POST
Project.post("/projects", projectController.createProject);
Project.post("/projects/:id/members", projectController.addMember);

// PUT
Project.put("/projects/:id", projectController.updateProject);

// DELETE
Project.delete("/projects/:id", projectController.deleteProject);
Project.delete("/projects/:projectId/members/:userId", projectController.removeMember);

export default Project;