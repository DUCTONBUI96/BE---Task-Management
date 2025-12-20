
/* =========================
   TASK STATUS
   ========================= */
INSERT INTO "task_status" ("name")
VALUES
  ('Backlog'),
  ('To Do'),
  ('In Progress'),
  ('Completed')
ON CONFLICT ("name") DO NOTHING;


/* =========================
   TASK PRIORITY
   ========================= */
INSERT INTO "task_priority" ("name", "level")
VALUES
  ('Low', 0),
  ('Medium', 1),
  ('High', 2)
ON CONFLICT ("name") DO NOTHING;


/* =========================
   role
   ========================= */
INSERT INTO "roles" ("name")
VALUES
  ('Owner'),
  ('Manager'),
  ('Developer')
ON CONFLICT ("name") DO NOTHING;