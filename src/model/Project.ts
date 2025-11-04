import pool from "../config/database";

//GET
export const getProject = async ()=>{
    const result = await pool.query("SELECT * FROM projects");
    return result.rows;
}

export const GetProjectById = async (id:number) =>{
    const value = [ id]
    const result = await pool.query("SELECT * FROM projects WHERE id = $1 ",value);
    return result.rows;
}

export const GetAllNemberInProject = async (id:number)=>{
    const query = `
    SELECT 
      u.id AS user_id,
      u.name AS user_name,
      u.email,
      r.name AS role_name,
    FROM user_role_project urp
    INNER JOIN users u ON urp.user_id = u.id
    INNER JOIN roles r ON urp.role_id = r.id
    WHERE urp.project_id = $1;
  `;
    const value = [ id]
    const result = await pool.query(query,value);
    return result.rows;
}


//POST
export const CreateProject = async(name:string,description:string)=>{
    const value = [ name,description]
    const result = await pool.query("INSERT INTO projects(Name,description) VALUES($1,$2) RETURNING * ",value);
    return result.rows;
}

export const AddMember = async (UserId:number,RoleId:number,id:number)=>{
    const value = [UserId,RoleId,id];
    const result = await pool.query("INSERT INTO user_role_project(user_id, role_id, project_id) VALUES($1,$2,$3) RETURNING * ",value);
    return result.rows;
}

//DELETE
export const deleteProject = async(id:number)=>{
    const value = [id];
    const result = await pool.query("DELETE FROM projects WHERE id = $1",value);
    if (result.rowCount === 0) {
        throw new Error(`Task with id ${id} not found or already deleted`);
    }
    return result.rows[0];
}

export const deleteMember = async(id:number,userid:number)=>{
    const value = [id,userid];
    const result = await pool.query("DELETE FROM user_role_project WHERE project_id = $1 AND user_id = $2",value);
    if (result.rowCount === 0) {
        throw new Error(`Task with id ${id} not found or already deleted`);
    }
    return result.rows[0];
}