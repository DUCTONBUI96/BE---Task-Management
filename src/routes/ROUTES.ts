
import  express from "express";
import { CreateNewUser, DeleteUser, GetAllUsers } from "../controllers/CONTROLER";

const router = express.Router();

//GET
router.get("/users", (req, res, next) => {
    GetAllUsers(req, res, next); // nhưng lúc này hàm GetAllUsers phải nhận thêm tham số
});
//POST 
router.post("/users",(req, res, next) => {
    CreateNewUser(req,res,next);   
});

//Delete
router.delete("/users/:id",(req, res, next) => {
    DeleteUser(req,res,next); 
});

export default router;