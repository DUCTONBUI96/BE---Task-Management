import pool from "../config/database";

export const getCommentsByTask = async (taskId:number) => {
  const result = await pool.query(
    `SELECT c.id, c.content, u.name AS user
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.task_id = $1
     ORDER BY c.created_at ASC`,
    [taskId]
  );
  return result.rows;
};

export const addComment = async (taskId:number, userId:number, content:number) => {
  await pool.query(
    `INSERT INTO comments (task_id, user_id, content)
     VALUES ($1, $2, $3)`,
    [taskId, userId, content]
  );
};


export const updateComment = async (commentId:number, content:number) => {
  await pool.query(
    `UPDATE comments
     SET content = $1, updated_at = NOW()
     WHERE id = $2`,
    [content, commentId]
  );
};

export const deleteComment = async (commentId:number) => {
  await pool.query(`DELETE FROM comments WHERE id = $1`, [commentId]);
};
