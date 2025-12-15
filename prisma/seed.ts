import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Database Seeding ---');

  // --- 1. Seed Lookup Tables ---

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
      data: [
        { name: 'Admin', description: 'Full access to all features' }, 
        { name: 'Manager', description: 'Can manage projects and team members' }, 
        { name: 'Developer', description: 'Can create and update tasks' }
      ]
  });
  const adminRole = roleData.find(r => r.name === 'Admin')!;
  const managerRole = roleData.find(r => r.name === 'Manager')!;
  const devRole = roleData.find(r => r.name === 'Developer')!;
  
  // Tag (6 records) - More comprehensive tag set
  const tagFeature = await prisma.tag.create({ data: { name: 'Feature' } });
  const tagBug = await prisma.tag.create({ data: { name: 'Bug' } });
  const tagRefactor = await prisma.tag.create({ data: { name: 'Refactor' } });
  const tagDocumentation = await prisma.tag.create({ data: { name: 'Documentation' } });
  const tagTesting = await prisma.tag.create({ data: { name: 'Testing' } });
  const tagPerformance = await prisma.tag.create({ data: { name: 'Performance' } });

  // User (4 records)
  const user1 = await prisma.user.create({
    data: { 
      name: 'John Smith', 
      email: 'john.smith@company.com', 
      passwordHash: '$2b$10$FIm2NYWeR41aBh3i/usxzONXPrmxtoLb6Gu7OqzHpi7mVcu5.RlDi', 
      avatarUrl: 'https://avatar.example.com/john.png', 
      avatarId: 'avatar_john_001' 
    },
  });
  const user2 = await prisma.user.create({
    data: { 
      name: 'Sarah Johnson', 
      email: 'sarah.johnson@company.com', 
      passwordHash: '$2b$10$FIm2NYWeR41aBh3i/usxzONXPrmxtoLb6Gu7OqzHpi7mVcu5.RlDi', 
      avatarUrl: 'https://avatar.example.com/sarah.png', 
      avatarId: 'avatar_sarah_002' 
    },
  });
  const user3 = await prisma.user.create({
    data: { 
      name: 'Michael Chen', 
      email: 'michael.chen@company.com', 
      passwordHash: '$2b$10$FIm2NYWeR41aBh3i/usxzONXPrmxtoLb6Gu7OqzHpi7mVcu5.RlDi', 
      avatarUrl: 'https://avatar.example.com/michael.png', 
      avatarId: 'avatar_michael_003' 
    },
  });
  const user4 = await prisma.user.create({
    data: { 
      name: 'Emily Davis', 
      email: 'emily.davis@company.com', 
      passwordHash: '$2b$10$FIm2NYWeR41aBh3i/usxzONXPrmxtoLb6Gu7OqzHpi7mVcu5.RlDi', 
      avatarUrl: 'https://avatar.example.com/emily.png', 
      avatarId: 'avatar_emily_004' 
    },
  });
  
  // Project (2 records)
  const projectA = await prisma.project.create({
    data: { 
      name: 'Project Alpha - Backend Services', 
      description: 'Development of REST APIs and microservices for core business operations. Includes authentication, payment processing, and data management.' 
    },
  });
  const projectB = await prisma.project.create({
    data: { 
      name: 'Project Beta - Web Frontend', 
      description: 'Building responsive web application using React and modern web technologies. Focus on user experience and performance.' 
    },
  });

  console.log('--- Seeding Project Memberships (UserRoleProject) ---');

  // UserRoleProject: Assign roles to users in projects
  await prisma.userRoleProject.createMany({
    data: [
      // Project Alpha
      { userId: user1.id, roleId: adminRole.id, projectId: projectA.id },    // John is Admin
      { userId: user2.id, roleId: managerRole.id, projectId: projectA.id },   // Sarah is Manager
      { userId: user3.id, roleId: devRole.id, projectId: projectA.id },       // Michael is Developer
      
      // Project Beta
      { userId: user1.id, roleId: managerRole.id, projectId: projectB.id },   // John is Manager
      { userId: user4.id, roleId: devRole.id, projectId: projectB.id },       // Emily is Developer
      { userId: user3.id, roleId: devRole.id, projectId: projectB.id },       // Michael is also Developer in Beta
    ],
  });

  // --- 3. Seed Tasks with Random Deadlines ---

  // Helper function to create random deadline
  const createRandomDeadline = (): Date | null => {
    const randomize = Math.random();
    
    // 20% chance for no deadline
    if (randomize < 0.2) return null;
    
    // Random between -30 to +30 days
    const daysOffset = Math.floor(Math.random() * 61) - 30;
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    return d;
  };

  // Task 1: User Authentication - DONE
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Implement User Authentication Endpoint',
      description: 'Create JWT-based authentication endpoints for login and logout. Include refresh token rotation and session management.',
      statusId: statusMap['Done']!,
      priorityId: priorityMap['High']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user1.id }, { userId: user2.id }] },
      taskTags: { create: [{ tagId: tagFeature.id }, { tagId: tagTesting.id }] },
      comments: { 
          create: [
              { userId: user1.id, content: 'Implementation completed and merged to main branch.' },
              { userId: user2.id, content: 'Code review passed with 2 minor comments fixed.' },
              { userId: user3.id, content: 'Tested in staging environment, ready for production.' }
          ]
      },
    },
  });

  // Task 2: Payment Bug - IN PROGRESS
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Fix Critical Payment Processing Bug',
      description: 'Users receiving 404 error during payment checkout. Affects ~5% of transactions. Root cause appears to be payment gateway timeout handling.',
      statusId: statusMap['In Progress']!,
      priorityId: priorityMap['High']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user3.id }, { userId: user1.id }] },
      taskTags: { create: [{ tagId: tagBug.id }, { tagId: tagPerformance.id }] },
      comments: { 
          create: [
              { userId: user2.id, content: 'URGENT: This is blocking revenue. Check payment gateway integration.' },
              { userId: user3.id, content: 'Found issue in payment service timeout handler. Working on fix now.' },
              { userId: user1.id, content: 'Approved the hotfix. Deploy to production asap.' }
          ]
      },
    },
  });
  
  // Task 3: Database Optimization - TO DO
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Optimize Database Queries for Performance',
      description: 'Current query response time is 2+ seconds for user dashboard. Target: reduce to under 500ms using indexes and query optimization.',
      statusId: statusMap['To Do']!,
      priorityId: priorityMap['High']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user3.id }] },
      taskTags: { create: [{ tagId: tagPerformance.id }, { tagId: tagRefactor.id }] },
      comments: { 
          create: [
              { userId: user2.id, content: 'This needs to be prioritized. Performance is critical for user experience.' },
              { userId: user1.id, content: 'Scope this for next sprint planning. Should include database profiling.' }
          ]
      },
    },
  });

  // Task 4: Frontend Design - REVIEW
  await prisma.task.create({
    data: {
      projectId: projectB.id,
      name: 'Design Landing Page Layout',
      description: 'Create responsive landing page design with hero section, features showcase, testimonials, and CTA buttons. Should be mobile-first and follow brand guidelines.',
      statusId: statusMap['Review']!,
      priorityId: priorityMap['Medium']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user4.id }, { userId: user1.id }] },
      taskTags: { create: [{ tagId: tagFeature.id }] },
      comments: { 
          create: [
              { userId: user4.id, content: 'Design mockups uploaded to Figma. Ready for review.' },
              { userId: user1.id, content: 'Looks good! Minor feedback on color contrast for accessibility.' }
          ]
      },
    },
  });

  // Task 5: CI/CD Setup - IN PROGRESS
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Setup CI/CD Pipeline with GitHub Actions',
      description: 'Configure automated testing, building, and deployment pipeline. Include staging and production environments with approval gates.',
      statusId: statusMap['In Progress']!,
      priorityId: priorityMap['Medium']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user1.id }, { userId: user3.id }] },
      taskTags: { create: [{ tagId: tagFeature.id }, { tagId: tagTesting.id }] },
      comments: { 
          create: [
              { userId: user1.id, content: 'Initial workflow files created. Testing actions in dev environment.' },
              { userId: user3.id, content: 'Added unit test step. Need to configure deployment credentials.' }
          ]
      },
    },
  });

  // Task 6: Unit Tests - TO DO
  await prisma.task.create({
    data: {
      projectId: projectB.id,
      name: 'Write Unit Tests for React Components',
      description: 'Increase test coverage to 80% for all React components. Include snapshot tests, behavior tests, and integration tests. Use Jest and React Testing Library.',
      statusId: statusMap['To Do']!,
      priorityId: priorityMap['Low']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user4.id }] },
      taskTags: { create: [{ tagId: tagTesting.id }] },
      comments: { 
          create: [
              { userId: user1.id, content: 'Schedule for end of sprint after features are stabilized.' }
          ]
      },
    },
  });

  // Task 7: Code Refactoring - REVIEW
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Refactor Legacy Authentication Module',
      description: 'Replace old callback-based auth system with async/await pattern. Improve error handling and add comprehensive logging.',
      statusId: statusMap['Review']!,
      priorityId: priorityMap['Low']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user3.id }] },
      taskTags: { create: [{ tagId: tagRefactor.id }, { tagId: tagTesting.id }] },
      comments: { 
          create: [
              { userId: user3.id, content: 'PR submitted with comprehensive tests.' },
              { userId: user2.id, content: 'Review in progress. Code quality looks good!' }
          ]
      },
    },
  });

  // Task 8: Logging Integration - DONE
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Integrate Structured Logging System',
      description: 'Setup ELK stack (Elasticsearch, Logstash, Kibana) for centralized logging. Configure log aggregation and create dashboards.',
      statusId: statusMap['Done']!,
      priorityId: priorityMap['Medium']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user1.id }, { userId: user3.id }] },
      taskTags: { create: [{ tagId: tagFeature.id }, { tagId: tagDocumentation.id }] },
      comments: { 
          create: [
              { userId: user1.id, content: 'ELK stack deployed to staging. All logs flowing correctly.' },
              { userId: user3.id, content: 'Created dashboards for monitoring. Team trained on Kibana.' },
              { userId: user2.id, content: 'Excellent work! This will greatly improve our debugging capabilities.' }
          ]
      },
    },
  });

  // Task 9: API Documentation - IN PROGRESS
  await prisma.task.create({
    data: {
      projectId: projectA.id,
      name: 'Complete API Documentation with Swagger',
      description: 'Document all REST API endpoints using OpenAPI/Swagger specification. Include request/response examples, error codes, and authentication details.',
      statusId: statusMap['In Progress']!,
      priorityId: priorityMap['Medium']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user2.id }] },
      taskTags: { create: [{ tagId: tagDocumentation.id }, { tagId: tagFeature.id }] },
      comments: { 
          create: [
              { userId: user2.id, content: '70% complete. Working on error code documentation.' },
              { userId: user1.id, content: 'Include examples for webhook implementations.' }
          ]
      },
    },
  });

  // Task 10: Responsive Design - TO DO
  await prisma.task.create({
    data: {
      projectId: projectB.id,
      name: 'Implement Responsive Mobile Design',
      description: 'Ensure all UI components work perfectly on mobile devices (320px+). Test on various screen sizes and devices. Add touch-friendly interactions.',
      statusId: statusMap['To Do']!,
      priorityId: priorityMap['Medium']!,
      deadline: createRandomDeadline(),
      assignments: { create: [{ userId: user4.id }] },
      taskTags: { create: [{ tagId: tagFeature.id }] },
      comments: { 
          create: [
              { userId: user1.id, content: 'Use Tailwind CSS breakpoints for responsive design.' }
          ]
      },
    },
  });

  console.log('--- Seeding Complete ---');
  console.log('✅ Summary:');
  console.log('   • Roles: 3 (Admin, Manager, Developer)');
  console.log('   • Users: 4 (John, Sarah, Michael, Emily)');
  console.log('   • Projects: 2 (Project Alpha, Project Beta)');
  console.log('   • Tags: 6 (Feature, Bug, Refactor, Documentation, Testing, Performance)');
  console.log('   • Tasks: 10 (with random deadlines ranging from -30 to +30 days)');
  console.log('   • Task Assignments: Multiple users per task');
  console.log('   • Task Comments: 16 total comments across tasks');
  console.log('   • Task Tags: Multiple tags per task');
  console.log('   • Project Memberships: Complete role assignments');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Database connection closed.');
  });