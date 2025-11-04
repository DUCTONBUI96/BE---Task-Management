import pool from "../config/database";

export const getUsers = async ()=>{
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}

export const CreateUser = async(name:string,email:string,passwordhash:string)=>{
    const value = [ name,email,passwordhash]
    const result = await pool.query("INSERT INTO users(Name,email,passwordhash) VALUES($1,$2,$3) RETURNING * ",value);
    return result.rows;
}

export const deleteUser = async(id:number)=>{
    const value = [id];
    const result = await pool.query("DELETE FROM users WHERE id = $1",value);
    if (result.rowCount === 0) {
        throw new Error(`Task with id ${id} not found or already deleted`);
    }
    return result.rows[0];
}

