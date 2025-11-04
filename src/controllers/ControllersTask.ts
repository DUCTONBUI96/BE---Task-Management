import { NextFunction, Response,Request } from "express";
import { getAllTask, GetDetailTask, GetTaskByProjectId,CreateTask,UpdateTask,AssignTaskToUser,UpdateTaskStatus,UpdateTaskPriority,UpdateTaskTags } from "../model/Task";

const handleResponse = (res:Response,status:number,message:string,data?:any):Response =>{
    return res.status(status).json({
        status,
        message,
        data,    
    });
}

export const GetAllTask = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const all = await getAllTask();
        handleResponse(res,201,"successfull",all);
    }
    catch(err){
        next(err);
    }
}

export const GetTasksByProjectId = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const Id = Number(req.params['id']); 
        const all = await GetTaskByProjectId(Id) ;
        handleResponse(res,201,"successfull",all);
    }
    catch(err){
        next(err);
    }
}

export const GetTask = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const Id = Number(req.params['id']); 
        const all = await GetDetailTask(Id) ;
        handleResponse(res,201,"successfull",all);
    }
    catch(err){
        next(err);
    }
}

export const AddNewTask = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const { project_id, name, description, deadline, status_id, priority_id } = req.body;
        const newTask = await CreateTask(project_id, name, description, deadline, status_id, priority_id);
        handleResponse(res, 201, "Created", newTask);
      } catch (err) {
        next(err);
      }
} 

export const UpdateTaskById = async (req:Request,res:Response,next:NextFunction) => {
    try {
      const id = Number(req.params['id']);
      const { name, description, deadline, priorityId, statusId } = req.body;
      const updatedTask = await UpdateTask(id, name, description, deadline, priorityId, statusId);

      handleResponse(res, 200, "Updated", updatedTask);
    } catch (err) {
      next(err);
    }
  };

export const assignTask = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const id = Number(req.params['id']);
    const { taskId, name, description } = req.body;
    const assignedTask = await AssignTaskToUser(id, taskId, name, description);

    handleResponse(res, 200, "Assigned", assignedTask);
  } 
  catch (error) {
    next(error);
  }
};

export const UpdateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params['id']);
      const { statusId } = req.body;
  
      const updated = await UpdateTaskStatus(id, statusId);
      handleResponse(res, 200, "Status updated", updated);
    } catch (err) {
      next(err);
    }
};

export const UpdatePriority = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params['id']);
      const { priorityId } = req.body;
  
      const updated = await UpdateTaskPriority(id, priorityId);
      handleResponse(res, 200, "Priority updated", updated);
    } catch (err) {
      next(err);
    }
};

export const UpdateTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params['id']);
      const { tagIds } = req.body;
  
      const updated = await UpdateTaskTags(id, tagIds);
      handleResponse(res, 200, "Tags updated", updated);
    } catch (err) {
      next(err);
    }
};