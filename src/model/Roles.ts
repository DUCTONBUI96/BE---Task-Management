import pool from "../config/database";

export const getAllRole = async ()=>{
    const result = await pool.query("SELECT * FROM Roles");
    return result.rows;
}

export const getRolebyId = async (id :number )=>{
    const result = await pool.query("SELECT * FROM roles where id = $1",[id]);
    return result.rows;
}

export const CreateRole = async (name :string,Description:string) => {
    const result = await pool.query("INSERT INTO Roles (Name,Description)VALUES($1,$2)",[name,Description]);
    return result.rows;
}

export const DeleteRole = async (id:number)=>{
    const value = [id];
    const result = await pool.query("DELETE FROM Roles WHERE id = $1",value);
    if (result.rowCount === 0) {
        throw new Error(`Task with id ${id} not found or already deleted`);
    }
    return result.rows[0];
}