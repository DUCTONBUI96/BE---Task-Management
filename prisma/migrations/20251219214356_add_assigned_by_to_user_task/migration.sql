/*
  Warnings:

  - Added the required column `assigned_by_id` to the `user_task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_task" ADD COLUMN     "assigned_by_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_task" ADD CONSTRAINT "user_task_assigned_by_id_fkey" FOREIGN KEY ("assigned_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
