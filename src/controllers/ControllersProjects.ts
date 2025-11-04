
import { NextFunction, Response,Request } from "express";
import { AddMember, CreateProject, deleteProject, GetAllNemberInProject, getProject, GetProjectById,deleteMember } from "../model/Project";

const handleResponse = (res:Response,status:number,message:string,data?:any):Response =>{
    return res.status(status).json({
        status,
        message,
        data,    
    });
}

export const GetAllProject = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const allProject = await getProject() ;
        handleResponse(res,201,"successfull",allProject);
    }
    catch(err){
        next(err);
    }
}

export const GetProject = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const Id = Number(req.params['id']); 
        const Project = await GetProjectById(Id) ;
        handleResponse(res,201,"successfull",Project);
    }
    catch(err){
        next(err);
    }
}

export const GetAllMember = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const Id = Number(req.params['id']);
        const result = await GetAllNemberInProject(Id) ;
        handleResponse(res,201,"successfull",result);
    }
    catch(err){
        next(err);
    }
}

export const CreateNewProject = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const  {name , description}= req.body;
        const newProject = await CreateProject(name,description);
        handleResponse(res,201,"successfull",newProject)
    }
    catch (err){
        next(err);
    }
}

export const AddNewMember = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {UserId,RoleId} = req.body;
        const id = Number(req.params['id']);
        const Add = await AddMember(UserId,RoleId,id);
        handleResponse(res,201,"Member added",Add);
    }
    catch (err){
        next(err);
    }
}

export const DeleteProject = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const Id = Number(req.params['id']); 
        const project = await deleteProject(Id);
        handleResponse(res,201,"successfull",project)
    }
    catch(err){
        next(err);
    }
}

export const DeleteMember = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const projectId = Number(req.params['projectId']);
        const userId = Number(req.params['userId']);
        const deleted = await deleteMember(projectId, userId);
        handleResponse(res, 200, "Member deleted", deleted);
      } 
      catch (err) {
        next(err);
    }
}