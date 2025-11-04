import pool from "../config/database";

export const getAllTask = async ()=>{
    const result = await pool.query("SELECT * FROM tasks");
    return result.rows;
}

export const GetTaskByProjectId = async (project_id:number)=>{
    const result = await pool.query("SELECT id,name FROM tasks where id = $1 ",[project_id]);
    return result.rows;
}

export const GetDetailTask = async (id:number)=>{
    const result = await pool.query("SELECT * FROM tasks where id = $1 ",[id]);
    return result.rows;
}

export const CreateTask = async (
    project_id: number,
    name: string,
    description: string,
    deadline: Date,
    status_id: number,
    priority_id: number
  ) => {
    const values = [project_id, name, description, deadline, status_id, priority_id];
  
    const result = await pool.query(
      `
      INSERT INTO tasks (
        project_id,
        name,
        description,
        deadline,
        status_id,
        priority_id,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      RETURNING *;
      `,
      values
    );
  
    return result.rows[0];
  };
  
export const UpdateTask = async (
    id: number,
    name: string,
    description: string,
    deadline: Date,
    priorityId: number,
    statusId: number
  ) => {
    const values = [name, description, deadline, priorityId, statusId, id];
  
    const result = await pool.query(
      `
      UPDATE tasks
      SET
        name = $1,
        description = $2,
        deadline = $3,
        priority_id = $4,
        status_id = $5,
        updated_at = NOW()
      WHERE id = $6
      RETURNING *;
      `,
      values
    );
  
    if (result.rowCount === 0) {
      throw new Error(`Task with id ${id} not found`);
    }
  
    return result.rows[0];
};


export const AssignTaskToUser = async (
    userId: number,
    taskId: number,
    name: string,
    description: string
  ) => {
    const values = [userId, taskId, name, description];
    const result = await pool.query(
      "INSERT INTO user_task (user_id, task_id, name, description, assigned_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      values
    );
    return result.rows[0];
  };

  export const UpdateTaskStatus = async (taskId: number, statusId: number) => {
    const result = await pool.query(
      "UPDATE tasks SET status_id = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [statusId, taskId]
    );
    return result.rows[0];
};

export const UpdateTaskPriority = async (taskId: number, priorityId: number) => {
    const result = await pool.query(
      "UPDATE tasks SET priority_id = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [priorityId, taskId]
    );
    return result.rows[0];
};

export const UpdateTaskTags = async (taskId: number, tagIds: number[]) => {
    // Xóa tag cũ
    await pool.query("DELETE FROM task_tags WHERE task_id = $1", [taskId]);
  
    // Thêm tag mới
    const values = tagIds.map((tagId) => `(${taskId}, ${tagId})`).join(",");
    if (tagIds.length > 0) {
      await pool.query(`INSERT INTO task_tags (task_id, tag_id) VALUES ${values}`);
    }
  
    return { taskId, tagIds };
};
