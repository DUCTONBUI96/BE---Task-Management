import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Bắt đầu Seeding Dữ Liệu Lớn ---');

  // --- 1. Chèn Dữ Liệu Cơ Sở (LOOKUP TABLES) ---

  // TaskStatus (4 records)
  await prisma.taskStatus.createMany({ 
      data: [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Review' }, { name: 'Done' }]
  });
  const statuses = await prisma.taskStatus.findMany();
  const statusMap = Object.fromEntries(statuses.map(s => [s.name, s.id]));

  // TaskPriority (3 records)
  await prisma.taskPriority.createMany({
      data: [{ name: 'Low', level: 0 }, { name: 'Medium', level: 1 }, { name: 'High', level: 2 }]
  });
  const priorities = await prisma.taskPriority.findMany();
  const priorityMap = Object.fromEntries(priorities.map(p => [p.name, p.id]));

  // Role (3 records)
  const roleData = await prisma.role.createManyAndReturn({
      data: [{ name: 'Admin' }, { name: 'Manager' }, { name: 'Developer' }]
  });
  const adminRole = roleData.find(r => r.name === 'Admin')!;
  const managerRole = roleData.find(r => r.name === 'Manager')!;
  const devRole = roleData.find(r => r.name === 'Developer')!;
  
  // Tag (3 records)
  const tagFeat = await prisma.tag.create({ data: { name: 'Feature' } });
  const tagBug = await prisma.tag.create({ data: { name: 'Bug' } });
  const tagRefactor = await prisma.tag.create({ data: { name: 'Refactor' } });

  // User (3 records)
  const user1 = await prisma.user.create({
    data: { name: 'Nguyen Van A', email: 'vana@company.com', passwordHash: 'hash_a', avatarUrl: 'a.png', avatarId: 'aid_a' },
  });
  const user2 = await prisma.user.create({
    data: { name: 'Tran Thi B', email: 'thib@company.com', passwordHash: 'hash_b', avatarUrl: 'b.png', avatarId: 'aid_b' },
  });
  const user3 = await prisma.user.create({
    data: { name: 'Le Van C', email: 'vanc@company.com', passwordHash: 'hash_c', avatarUrl: 'c.png', avatarId: 'aid_c' },
  });
  
  // Project (2 records)
  const projectA = await prisma.project.create({
    data: { name: 'Project Alpha (Backend)', description: 'Dự án phát triển API dịch vụ chính.' },
  });
  const projectB = await prisma.project.create({
    data: { name: 'Project Beta (Frontend)', description: 'Xây dựng giao diện người dùng bằng React/Vue.' },
  });

  console.log('--- 2. Chèn Dữ Liệu Quan Hệ (JUNCTION TABLES) ---');

  // UserRoleProject: Gán vai trò cho User trong các Project
  await prisma.userRoleProject.createMany({
    data: [
      // Project A
      { userId: user1.id, roleId: adminRole.id, projectId: projectA.id }, // A là Admin A
      { userId: user2.id, roleId: devRole.id, projectId: projectA.id }, // B là Dev A
      
      // Project B
      { userId: user1.id, roleId: managerRole.id, projectId: projectB.id }, // A là Manager B
      { userId: user3.id, roleId: devRole.id, projectId: projectB.id }, // C là Dev B
    ],
  });

  // --- 3. Chèn TASKS và Nested Writes (10 Tasks) ---

  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7); // Deadlines sau 7 ngày

  // Task 1: DONE, High, Project A
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Implement User Authentication Endpoint',
      statusId: statusMap['Done']!,
      priorityId: priorityMap['High']!,
      deadline: deadline,
      assignments: { create: [{ userId: user1.id }, { userId: user2.id }] },
      taskTags: { create: { tagId: tagFeat.id } },
      comments: { 
          create: [
              { userId: user1.id, content: 'Đã hoàn thành, code đã được merge.' },
              { userId: user2.id, content: 'Đã review và pass.' }
          ]
      },
    },
  });

  // Task 2: IN PROGRESS, Medium, Project A
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Optimize Database Queries for Performance',
      statusId: statusMap['In Progress']!,
      priorityId: priorityMap['Medium']!,
      assignments: { create: { userId: user2.id } }, // Gán cho B
      taskTags: { create: { tagId: tagRefactor.id } },
    },
  });
  
  // Task 3: TO DO, High, Project A (Task quan trọng)
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Fix critical bug in Payment Module',
      description: 'Lỗi 404 khi thanh toán.',
      statusId: statusMap['To Do']!,
      priorityId: priorityMap['High']!,
      assignments: { create: { userId: user2.id } }, 
      taskTags: { create: { tagId: tagBug.id } },
      comments: { create: { userId: user1.id, content: 'Ưu tiên số 1, cần phải fix ngay.' } },
    },
  });

  // Task 4: REVIEW, Low, Project B
  await prisma.task.create({
    data: {
      projectId: projectB.id,
      name: 'Design "About Us" Page Layout',
      statusId: statusMap['Review']!,
      priorityId: priorityMap['Low']!,
      assignments: { create: { userId: user3.id } }, // Gán cho C
    },
  });
  
  // Tasks 5-10 (Dữ liệu thêm)
  const taskNames = [
      'Setup CI/CD Pipeline', 'Integrate Third-Party Logging', 'Write Unit Tests for services', 
      'Refactor old CSS code', 'Create Modal Component', 'Update Documentation'
  ];
  
  for(let i = 0; i < taskNames.length; i++) {
      const pId = i % 2 === 0 ? projectA.id : projectB.id; // Xen kẽ A và B
      const assignedUser = i % 3 === 0 ? user1.id : i % 3 === 1 ? user2.id : user3.id;
      
      await prisma.task.create({
          data: {
              projectId: pId,
              name: taskNames[i]!,
              statusId: i % 4 + 1, // Status ngẫu nhiên
              priorityId: i % 3 + 1, // Priority ngẫu nhiên
              assignments: { create: { userId: assignedUser } },
          }
      });
  }

  console.log('--- HOÀN TẤT SEEDING DỮ LIỆU ---');
  console.log(`Đã chèn tổng cộng ${taskNames.length + 4} Task.`);
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