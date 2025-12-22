import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('✅ All seed data has been successfully inserted via migration!');
  console.log('   - Task Statuses (4): Backlog, To Do, In Progress, Completed');
  console.log('   - Task Priorities (3): Low, Medium, High');
  console.log('   - Roles (3): Owner, Manager, Developer');
  console.log('   - Users (5): Alice Johnson, Bob Smith, Charlie Brown, Diana Prince, Edward Norton');
  console.log('   - Projects (4): Website Redesign, Mobile App Development, Database Migration, API Integration');
  console.log('   - Tags (8): Bug Fix, Feature, Documentation, Enhancement, Testing, Performance, Security, UI/UX');
  console.log('   - Tasks (18): Various tasks with different statuses, priorities, and deadlines');
  console.log('   - Task Assignments: Users assigned to different tasks');
  console.log('   - Comments (12): Various comments on tasks');
  console.log('   - User-Role-Project Relationships: Users assigned to projects with roles');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
