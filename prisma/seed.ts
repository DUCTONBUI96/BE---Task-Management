import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Bắt đầu Seeding Dữ Liệu ---');

  // --- 1. Chèn Dữ Liệu Cơ Sở (LOOKUP TABLES) ---

  // TaskStatus (4 records: Backlog, To Do, In Progress, Completed)
  // const existingStatuses = await prisma.taskStatus.findMany();
  // if (existingStatuses.length === 0) {
  //   const statusData = await prisma.taskStatus.createManyAndReturn({ 
  //       data: [
  //         { name: 'Backlog' }, 
  //         { name: 'To Do' }, 
  //         { name: 'In Progress' }, 
  //         { name: 'Completed' }
  //       ]
  //   });
  //   console.log(`✅ Đã tạo ${statusData.length} task statuses: Backlog, To Do, In Progress, Completed`);
  const taskStatuses = [
    'Backlog',
    'To Do',
    'In Progress',
    'Completed',
  ];

  for (const name of taskStatuses) {
    await prisma.taskStatus.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log('✅ TaskStatus seeded');
  // } else {
  //   console.log(`⏭️  Đã có ${existingStatuses.length} task statuses, bỏ qua`);
  // }

  const priorities = [
    { name: 'Low', level: 0 },
    { name: 'Medium', level: 1 },
    { name: 'High', level: 2 },
  ];

  for (const p of priorities) {
    await prisma.taskPriority.upsert({
      where: { name: p.name },
      update: { level: p.level },
      create: p,
    });
  }
  console.log('✅ TaskPriority seeded');
 
  // TaskPriority (3 records: Low, Medium, High)
  // const existingPriorities = await prisma.taskPriority.findMany();
  // if (existingPriorities.length === 0) {
  //   const priorityData = await prisma.taskPriority.createManyAndReturn({
  //       data: [
  //         { name: 'Low', level: 0 }, 
  //         { name: 'Medium', level: 1 }, 
  //         { name: 'High', level: 2 }
  //       ]
  //   });
  //   console.log(`✅ Đã tạo ${priorityData.length} task priorities: Low, Medium, High`);
  // } else {
  //   console.log(`⏭️  Đã có ${existingPriorities.length} task priorities, bỏ qua`);
  // }

  const roles = ['Owner', 'Manager', 'Developer'];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log('✅ Roles seeded');
  
  // Role (3 records)
  // const existingRoles = await prisma.role.findMany();
  // if (existingRoles.length === 0) {
  //   const roleData = await prisma.role.createManyAndReturn({
  //       data: [{ name: 'Owner' }, { name: 'Manager' }, { name: 'Developer' }]
  //   });
  //   console.log(`✅ Đã tạo ${roleData.length} roles: Owner, Manager, Developer`);
  // } else {
  //   console.log(`⏭️  Đã có ${existingRoles.length} roles, bỏ qua`);
  // }
  
//   // Tag (3 records)
//   const tagFeat = await prisma.tag.create({ data: { name: 'Feature' } });
//   const tagBug = await prisma.tag.create({ data: { name: 'Bug' } });
//   const tagRefactor = await prisma.tag.create({ data: { name: 'Refactor' } });

//   // User (3 records)
//   const user1 = await prisma.user.create({
//     data: { name: 'Nguyen Van A', email: 'vana@company.com', passwordHash: 'hash_a', avatarUrl: 'a.png', avatarId: 'aid_a' },
//   });
//   const user2 = await prisma.user.create({
//     data: { name: 'Tran Thi B', email: 'thib@company.com', passwordHash: 'hash_b', avatarUrl: 'b.png', avatarId: 'aid_b' },
//   });
//   const user3 = await prisma.user.create({
//     data: { name: 'Le Van C', email: 'vanc@company.com', passwordHash: 'hash_c', avatarUrl: 'c.png', avatarId: 'aid_c' },
//   });
  
//   // Project (2 records)
//   const projectA = await prisma.project.create({
//     data: { name: 'Project Alpha (Backend)', description: 'Dự án phát triển API dịch vụ chính.' },
//   });
//   const projectB = await prisma.project.create({
//     data: { name: 'Project Beta (Frontend)', description: 'Xây dựng giao diện người dùng bằng React/Vue.' },
//   });

//   console.log('--- 2. Chèn Dữ Liệu Quan Hệ (JUNCTION TABLES) ---');

//   // UserRoleProject: Gán vai trò cho User trong các Project
//   await prisma.userRoleProject.createMany({
//     data: [
//       // Project A
//       { userId: user1.id, roleId: adminRole.id, projectId: projectA.id }, // A là Admin A
//       { userId: user2.id, roleId: devRole.id, projectId: projectA.id }, // B là Dev A
      
//       // Project B
//       { userId: user1.id, roleId: managerRole.id, projectId: projectB.id }, // A là Manager B
//       { userId: user3.id, roleId: devRole.id, projectId: projectB.id }, // C là Dev B
//     ],
//   });

//   // --- 3. Chèn TASKS và Nested Writes (10 Tasks) ---

//   const deadline = new Date();
//   deadline.setDate(deadline.getDate() + 7); // Deadlines sau 7 ngày

//   // Task 1: DONE, High, Project A
//   await prisma.task.create({
//     data: {
//       projectId: projectA.id,
//       name: 'Implement User Authentication Endpoint',
//       statusId: statusMap['Done']!,
//       priorityId: priorityMap['High']!,
//       deadline: deadline,
//       assignments: { create: [{ userId: user1.id }, { userId: user2.id }] },
//       taskTags: { create: { tagId: tagFeat.id } },
//       comments: { 
//           create: [
//               { userId: user1.id, content: 'Đã hoàn thành, code đã được merge.' },
//               { userId: user2.id, content: 'Đã review và pass.' }
//           ]
//       },
//     },
//   });

//   // Task 2: IN PROGRESS, Medium, Project A
//   await prisma.task.create({
//     data: {
//       projectId: projectA.id,
//       name: 'Optimize Database Queries for Performance',
//       statusId: statusMap['In Progress']!,
//       priorityId: priorityMap['Medium']!,
//       assignments: { create: { userId: user2.id } }, // Gán cho B
//       taskTags: { create: { tagId: tagRefactor.id } },
//     },
//   });
  
//   // Task 3: TO DO, High, Project A (Task quan trọng)
//   await prisma.task.create({
//     data: {
//       projectId: projectA.id,
//       name: 'Fix critical bug in Payment Module',
//       description: 'Lỗi 404 khi thanh toán.',
//       statusId: statusMap['To Do']!,
//       priorityId: priorityMap['High']!,
//       assignments: { create: { userId: user2.id } }, 
//       taskTags: { create: { tagId: tagBug.id } },
//       comments: { create: { userId: user1.id, content: 'Ưu tiên số 1, cần phải fix ngay.' } },
//     },
//   });

//   // Task 4: REVIEW, Low, Project B
//   await prisma.task.create({
//     data: {
//       projectId: projectB.id,
//       name: 'Design "About Us" Page Layout',
//       statusId: statusMap['Review']!,
//       priorityId: priorityMap['Low']!,
//       assignments: { create: { userId: user3.id } }, // Gán cho C
//     },
//   });
  
//   // Tasks 5-10 (Dữ liệu thêm)
//   const taskNames = [
//       'Setup CI/CD Pipeline', 'Integrate Third-Party Logging', 'Write Unit Tests for services', 
//       'Refactor old CSS code', 'Create Modal Component', 'Update Documentation'
//   ];
  
//   for(let i = 0; i < taskNames.length; i++) {
//       const pId = i % 2 === 0 ? projectA.id : projectB.id; // Xen kẽ A và B
//       const assignedUser = i % 3 === 0 ? user1.id : i % 3 === 1 ? user2.id : user3.id;
      
//       await prisma.task.create({
//           data: {
//               projectId: pId,
//               name: taskNames[i]!,
//               statusId: i % 4 + 1, // Status ngẫu nhiên
//               priorityId: i % 3 + 1, // Priority ngẫu nhiên
//               assignments: { create: { userId: assignedUser } },
//           }
//       });
//   }

//   console.log('--- HOÀN TẤT SEEDING DỮ LIỆU ---');
//   console.log(`Đã chèn tổng cộng ${taskNames.length + 4} Task.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Đã đóng kết nối database.');
  });