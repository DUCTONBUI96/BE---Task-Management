import  express from "express";
import {AddNewMember, CreateNewProject, DeleteMember, DeleteProject, GetAllMember, GetAllProject, GetProject } from "../controllers/ControllersProjects";

const Project = express.Router();

// GET
Project.get("/projects", GetAllProject);
Project.get("/projects/:id",GetProject)
Project.get("/projects/:id/member",GetAllMember)

// POST
Project.post("/projects", CreateNewProject);
Project.post("/projects/:id/members",AddNewMember);


// DELETE
Project.delete("/projects/:id", DeleteProject);
Project.delete("/projects/:projectId/members/:userId",DeleteMember);


export default Project;