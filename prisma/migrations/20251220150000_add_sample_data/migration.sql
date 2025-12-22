-- ===========================
-- TASK STATUS
-- ===========================
INSERT INTO "task_status" ("name")
VALUES
  ('Backlog'),
  ('To Do'),
  ('In Progress'),
  ('Completed')
ON CONFLICT ("name") DO NOTHING;

-- ===========================
-- TASK PRIORITY
-- ===========================
INSERT INTO "task_priority" ("name", "level")
VALUES
  ('Low', 0),
  ('Medium', 1),
  ('High', 2)
ON CONFLICT ("name") DO NOTHING;

-- ===========================
-- ROLES
-- ===========================
INSERT INTO "roles" ("name")
VALUES
  ('Owner'),
  ('Manager'),
  ('Developer')
ON CONFLICT ("name") DO NOTHING;

-- ===========================
-- USERS
-- ===========================
INSERT INTO "users" ("id", "name", "email", "passwordHash", "avatarUrl", "created_at", "updated_at")
VALUES
  ('user-1', 'Alice Johnson', 'alice.johnson@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2020-03-15 08:30:00', '2025-12-15 14:22:00'),
  ('user-2', 'Bob Smith', 'bob.smith@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2020-06-22 10:15:00', '2025-12-18 09:45:00'),
  ('user-3', 'Charlie Brown', 'charlie.brown@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2020-09-10 11:20:00', '2025-12-19 16:30:00'),
  ('user-4', 'Diana Prince', 'diana.prince@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2021-01-05 09:00:00', '2025-12-20 11:15:00'),
  ('user-5', 'Edward Norton', 'edward.norton@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2021-03-18 13:45:00', '2025-12-17 10:20:00'),
  ('user-6', 'Fiona Chen', 'fiona.chen@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2021-07-12 08:00:00', '2025-12-16 15:40:00'),
  ('user-7', 'George Martinez', 'george.martinez@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2021-09-25 14:30:00', '2025-12-19 08:25:00'),
  ('user-8', 'Hannah Lee', 'hannah.lee@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2022-01-08 10:45:00', '2025-12-20 13:50:00'),
  ('user-9', 'Ian Rodriguez', 'ian.rodriguez@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2022-04-14 09:15:00', '2025-12-18 12:10:00'),
  ('user-10', 'Julia Wilson', 'julia.wilson@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2022-06-30 11:00:00', '2025-12-21 09:00:00'),
  ('user-11', 'Kevin Park', 'kevin.park@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2022-08-19 15:20:00', '2025-12-15 17:30:00'),
  ('user-12', 'Laura Thompson', 'laura.thompson@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2023-02-11 08:50:00', '2025-12-19 14:45:00'),
  ('user-13', 'Michael Davis', 'michael.davis@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2023-05-03 10:30:00', '2025-12-20 10:20:00'),
  ('user-14', 'Nina Patel', 'nina.patel@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2023-07-22 13:15:00', '2025-12-17 16:55:00'),
  ('user-15', 'Oscar Kim', 'oscar.kim@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2023-09-17 09:40:00', '2025-12-16 11:30:00'),
  ('user-16', 'Patricia Nguyen', 'patricia.nguyen@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2023-11-28 14:55:00', '2025-12-18 15:20:00'),
  ('user-17', 'Quinn Foster', 'quinn.foster@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2024-01-09 08:20:00', '2025-12-20 08:40:00'),
  ('user-18', 'Rachel Green', 'rachel.green@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2024-03-16 12:10:00', '2025-12-19 13:25:00'),
  ('user-19', 'Samuel Wright', 'samuel.wright@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2024-05-21 10:05:00', '2025-12-21 07:15:00'),
  ('user-20', 'Tina Brooks', 'tina.brooks@example.com', '$2b$10$bWXSWKVyeV3e.J66qJecje1NWimoyFUaOXHAo/fps5PE6KbActfia', NULL, '2024-07-30 15:35:00', '2025-12-17 12:50:00')
ON CONFLICT ("email") DO NOTHING;

-- ===========================
-- PROJECTS
-- ===========================
INSERT INTO "projects" ("name", "description", "created_at", "updated_at")
VALUES
  ('Website Redesign', 'Complete redesign of company website with modern UI/UX', '2023-01-15 09:00:00', '2025-12-18 14:30:00'),
  ('Mobile App Development', 'Build iOS and Android application for customer engagement', '2023-03-22 10:30:00', '2025-12-19 16:45:00'),
  ('Database Migration', 'Migrate legacy database to cloud infrastructure', '2022-11-10 08:15:00', '2025-10-05 11:20:00'),
  ('API Integration', 'Integrate third-party APIs for payment and analytics', '2024-02-18 13:45:00', '2025-12-20 09:15:00'),
  ('E-commerce Platform', 'Build complete e-commerce platform with shopping cart and payment gateway', '2021-05-12 08:00:00', '2025-12-17 15:30:00'),
  ('Cloud Infrastructure Setup', 'Setup and configure AWS infrastructure for production deployment', '2023-08-07 09:30:00', '2025-12-19 10:45:00'),
  ('CRM System Development', 'Develop customer relationship management system for sales team', '2022-06-20 11:15:00', '2025-12-16 13:20:00'),
  ('Data Analytics Dashboard', 'Create real-time analytics dashboard for business insights', '2024-01-25 14:20:00', '2025-12-20 17:00:00'),
  ('Security Audit Platform', 'Build automated security audit and compliance platform', '2023-09-14 10:00:00', '2025-12-15 12:40:00'),
  ('DevOps Automation', 'Implement CI/CD pipelines and automation tools', '2022-03-08 08:45:00', '2024-11-30 16:25:00'),
  ('AI Chatbot Integration', 'Integrate AI-powered chatbot for customer support', '2024-06-11 15:10:00', '2025-12-21 08:50:00'),
  ('Microservices Architecture', 'Refactor monolith to microservices architecture', '2023-04-30 09:20:00', '2025-12-18 11:35:00'),
  ('Inventory Management System', 'Develop inventory tracking and management system', '2024-08-15 10:50:00', '2025-12-19 14:15:00'),
  ('Enterprise Resource Planning', 'Build comprehensive ERP system for enterprise management', '2024-11-10 09:00:00', '2025-12-20 16:30:00')
ON CONFLICT DO NOTHING;

-- ===========================
-- USER-ROLE-PROJECT ASSIGNMENTS
-- ===========================
INSERT INTO "user_role_project" ("user_id", "role_id", "project_id", "joined_at")
VALUES
  -- Website Redesign (6 members)
  ('user-1', 1, 1, '2023-01-15 09:30:00'),
  ('user-2', 2, 1, '2023-01-16 10:00:00'),
  ('user-3', 3, 1, '2023-01-17 11:15:00'),
  ('user-4', 3, 1, '2023-01-18 09:45:00'),
  ('user-6', 3, 1, '2023-02-01 14:20:00'),
  ('user-7', 3, 1, '2023-02-05 10:30:00'),
  -- Mobile App Development (6 members)
  ('user-2', 1, 2, '2023-03-22 11:00:00'),
  ('user-3', 2, 2, '2023-03-23 09:15:00'),
  ('user-5', 3, 2, '2023-03-24 13:30:00'),
  ('user-8', 3, 2, '2023-03-25 10:45:00'),
  ('user-9', 3, 2, '2023-04-01 08:20:00'),
  ('user-10', 3, 2, '2023-04-02 15:10:00'),
  -- Database Migration (3 members)
  ('user-1', 1, 3, '2022-11-10 08:30:00'),
  ('user-4', 2, 3, '2022-11-11 10:00:00'),
  ('user-11', 3, 3, '2022-11-15 14:15:00'),
  -- API Integration (4 members)
  ('user-5', 1, 4, '2024-02-18 14:00:00'),
  ('user-1', 2, 4, '2024-02-19 09:30:00'),
  ('user-12', 3, 4, '2024-02-20 11:45:00'),
  ('user-13', 3, 4, '2024-02-21 13:20:00'),
  -- E-commerce Platform (5 members)
  ('user-6', 1, 5, '2021-05-12 08:30:00'),
  ('user-7', 2, 5, '2021-05-13 10:15:00'),
  ('user-8', 3, 5, '2021-05-14 09:00:00'),
  ('user-14', 3, 5, '2021-05-20 14:30:00'),
  ('user-15', 3, 5, '2021-05-25 11:40:00'),
  -- Cloud Infrastructure Setup (5 members)
  ('user-9', 1, 6, '2023-08-07 10:00:00'),
  ('user-10', 2, 6, '2023-08-08 09:15:00'),
  ('user-11', 3, 6, '2023-08-09 13:45:00'),
  ('user-16', 3, 6, '2023-08-15 10:30:00'),
  ('user-17', 3, 6, '2023-08-20 15:20:00'),
  -- CRM System Development (6 members)
  ('user-12', 1, 7, '2022-06-20 11:30:00'),
  ('user-13', 2, 7, '2022-06-21 10:00:00'),
  ('user-14', 3, 7, '2022-06-22 14:15:00'),
  ('user-15', 3, 7, '2022-06-23 09:45:00'),
  ('user-18', 3, 7, '2022-07-01 13:00:00'),
  ('user-19', 3, 7, '2022-07-05 11:20:00'),
  -- Data Analytics Dashboard (2 members)
  ('user-16', 1, 8, '2024-01-25 14:30:00'),
  ('user-17', 3, 8, '2024-01-26 10:15:00'),
  -- Security Audit Platform (7 members)
  ('user-1', 1, 9, '2023-09-14 10:15:00'),
  ('user-3', 2, 9, '2023-09-15 09:30:00'),
  ('user-5', 3, 9, '2023-09-16 11:45:00'),
  ('user-7', 3, 9, '2023-09-17 14:00:00'),
  ('user-11', 3, 9, '2023-09-20 10:30:00'),
  ('user-13', 3, 9, '2023-09-22 15:15:00'),
  ('user-18', 3, 9, '2023-09-25 09:00:00'),
  -- DevOps Automation (4 members)
  ('user-4', 1, 10, '2022-03-08 09:00:00'),
  ('user-9', 2, 10, '2022-03-09 10:30:00'),
  ('user-10', 3, 10, '2022-03-10 13:15:00'),
  ('user-20', 3, 10, '2022-03-15 11:45:00'),
  -- AI Chatbot Integration (3 members)
  ('user-2', 1, 11, '2024-06-11 15:20:00'),
  ('user-8', 2, 11, '2024-06-12 09:45:00'),
  ('user-19', 3, 11, '2024-06-13 14:10:00'),
  -- Microservices Architecture (5 members)
  ('user-5', 1, 12, '2023-04-30 09:30:00'),
  ('user-6', 2, 12, '2023-05-01 10:15:00'),
  ('user-12', 3, 12, '2023-05-02 11:45:00'),
  ('user-15', 3, 12, '2023-05-03 14:20:00'),
  ('user-20', 3, 12, '2023-05-05 09:00:00'),
  -- Inventory Management System (4 members)
  ('user-7', 1, 13, '2024-08-15 11:00:00'),
  ('user-11', 2, 13, '2024-08-16 10:30:00'),
  ('user-14', 3, 13, '2024-08-17 13:45:00'),
  ('user-18', 3, 13, '2024-08-18 09:15:00'),
  -- Enterprise Resource Planning (6 members)
  ('user-1', 1, 14, '2024-11-10 09:30:00'),
  ('user-4', 2, 14, '2024-11-11 10:15:00'),
  ('user-8', 3, 14, '2024-11-12 11:00:00'),
  ('user-10', 3, 14, '2024-11-13 14:30:00'),
  ('user-12', 3, 14, '2024-11-14 09:45:00'),
  ('user-16', 3, 14, '2024-11-15 13:20:00')
ON CONFLICT DO NOTHING;

-- ===========================
-- TAGS
-- ===========================
INSERT INTO "tags" ("name", "created_at")
VALUES
  ('Bug Fix', NOW()),
  ('Feature', NOW()),
  ('Documentation', NOW()),
  ('Enhancement', NOW()),
  ('Testing', NOW()),
  ('Performance', NOW()),
  ('Security', NOW()),
  ('UI/UX', NOW())
ON CONFLICT ("name") DO NOTHING;

-- ===========================
-- TASKS
-- ===========================
INSERT INTO "tasks" ("project_id", "name", "description", "deadline", "status_id", "priority_id", "created_at", "updated_at")
VALUES
  -- Website Redesign tasks (Project 1) - Jan: 2, Feb: 2, Mar: 1, Apr: 1, May: 1, Jun: 1
  (1, 'Design Homepage Mockup', 'Create wireframes and visual mockups for the homepage', '2025-02-28 17:00:00', 4, 2, '2025-01-08 09:15:00', '2025-02-20 14:30:00'),
  (1, 'Setup Frontend Environment', 'Initialize React project with necessary dependencies', '2025-01-25 17:00:00', 4, 3, '2025-01-15 10:30:00', '2025-01-23 16:45:00'),
  (1, 'Fix Navigation Menu Bug', 'Fix responsive navigation menu on mobile devices', '2025-12-25 17:00:00', 2, 3, '2025-02-12 11:20:00', '2025-12-05 15:10:00'),
  (1, 'Write API Documentation', 'Document all API endpoints for frontend team', '2026-01-20 17:00:00', 3, 1, '2025-02-25 08:45:00', '2025-12-10 13:25:00'),
  (1, 'Optimize Image Assets', 'Compress and optimize all images for web', '2025-05-30 17:00:00', 4, 1, '2025-03-18 14:00:00', '2025-05-25 11:30:00'),
  (1, 'Implement Responsive Grid', 'Create responsive grid system for all pages', '2025-04-30 17:00:00', 4, 2, '2025-04-22 09:30:00', '2025-04-25 11:15:00'),
  (1, 'Add Contact Form', 'Implement contact form with email validation', '2025-12-30 17:00:00', 3, 2, '2025-05-15 13:45:00', '2025-12-10 16:20:00'),
  (1, 'SEO Optimization', 'Optimize website for search engines', '2024-03-15 17:00:00', 4, 1, '2023-12-01 10:15:00', '2024-03-10 14:30:00'),
  (1, 'Performance Audit', 'Conduct website performance audit', '2025-07-30 17:00:00', 4, 2, '2025-06-20 11:00:00', '2025-07-28 14:45:00'),
  
  -- Mobile App Development tasks (Project 2) - Jan: 1, Feb: 2, Mar: 1, Apr: 1, May: 2, Jun: 1, Jul: 2, Aug: 1
  (2, 'Implement User Authentication', 'Create login and signup flow for mobile app', '2025-04-15 17:00:00', 4, 3, '2025-01-20 09:00:00', '2025-04-12 16:45:00'),
  (2, 'Create Database Schema', 'Design and implement database schema for user data', '2025-03-10 17:00:00', 4, 3, '2025-02-08 11:30:00', '2025-03-08 15:20:00'),
  (2, 'Fix App Crash on Logout', 'Debug and fix critical crash issue when user logs out', '2025-12-22 17:00:00', 3, 3, '2025-02-22 08:15:00', '2025-12-18 10:45:00'),
  (2, 'Add Dark Mode Support', 'Implement dark mode toggle and theme switching', '2026-01-30 17:00:00', 2, 2, '2025-03-28 14:20:00', '2025-12-05 09:30:00'),
  (2, 'Performance Testing', 'Run load tests and optimize app performance', '2025-07-30 17:00:00', 4, 2, '2025-04-18 10:45:00', '2025-07-25 14:20:00'),
  (2, 'Push Notification System', 'Implement push notification for user engagement', '2025-06-20 17:00:00', 4, 2, '2025-05-12 13:00:00', '2025-06-18 11:25:00'),
  (2, 'In-App Purchases', 'Add in-app purchase functionality', '2025-08-30 17:00:00', 4, 3, '2025-05-28 09:15:00', '2025-08-28 14:40:00'),
  (2, 'Social Media Integration', 'Integrate social media sharing features', '2026-02-15 17:00:00', 2, 1, '2025-06-15 11:20:00', '2025-12-15 16:10:00'),
  (2, 'Biometric Authentication', 'Add fingerprint and face ID authentication', '2025-08-15 17:00:00', 4, 2, '2025-07-10 09:30:00', '2025-08-13 14:20:00'),
  (2, 'App Analytics Integration', 'Integrate analytics tracking', '2025-09-30 17:00:00', 4, 1, '2025-07-25 11:45:00', '2025-09-28 16:10:00'),
  (2, 'Offline Data Sync', 'Implement offline data synchronization', '2025-10-15 17:00:00', 4, 2, '2025-08-18 10:15:00', '2025-10-13 15:30:00'),
  
  -- Database Migration tasks (Project 3) - ALL COMPLETED (created before 2025)
  (3, 'Backup Legacy Database', 'Create full backup of existing production database', '2023-03-10 17:00:00', 4, 3, '2022-11-20 08:30:00', '2023-03-08 14:15:00'),
  (3, 'Design Cloud Database Schema', 'Plan new schema for cloud-based database', '2023-05-15 17:00:00', 4, 2, '2023-01-10 10:00:00', '2023-05-12 16:30:00'),
  (3, 'Migration Script Development', 'Write automated migration scripts', '2024-02-28 17:00:00', 4, 2, '2023-06-05 09:45:00', '2024-02-25 11:20:00'),
  (3, 'Data Validation and Testing', 'Validate data integrity after migration', '2024-06-30 17:00:00', 4, 1, '2024-03-15 13:20:00', '2024-06-28 15:45:00'),
  (3, 'Performance Benchmarking', 'Run performance tests on new database', '2024-08-15 17:00:00', 4, 2, '2024-05-10 11:00:00', '2024-08-12 09:30:00'),
  
  -- API Integration tasks (Project 4) - Mar: 1, Jul: 2, Aug: 2, Sep: 1, Oct: 1
  (4, 'Integrate Stripe Payment API', 'Integrate Stripe for payment processing', '2025-09-15 17:00:00', 4, 3, '2025-07-08 09:30:00', '2025-09-12 14:20:00'),
  (4, 'Setup Google Analytics', 'Configure Google Analytics tracking', '2025-08-10 17:00:00', 4, 2, '2025-07-22 11:15:00', '2025-08-08 16:45:00'),
  (4, 'Fix API Rate Limiting Issue', 'Resolve intermittent API rate limiting errors', '2025-12-25 17:00:00', 2, 3, '2025-08-10 10:20:00', '2025-12-08 13:35:00'),
  (4, 'Implement Webhook Handlers', 'Add webhook handlers for payment notifications', '2026-01-30 17:00:00', 3, 2, '2025-08-28 14:00:00', '2025-12-12 11:50:00'),
  (4, 'OAuth 2.0 Integration', 'Implement OAuth authentication for third-party apps', '2024-05-20 17:00:00', 4, 3, '2024-01-10 08:45:00', '2024-05-18 15:10:00'),
  (4, 'API Documentation Portal', 'Build interactive API documentation', '2025-10-30 17:00:00', 4, 2, '2025-09-18 09:15:00', '2025-10-28 14:30:00'),
  (4, 'API Versioning Strategy', 'Implement API versioning mechanism', '2025-11-15 17:00:00', 4, 2, '2025-10-05 10:45:00', '2025-11-13 16:20:00'),
  (4, 'GraphQL API Layer', 'Add GraphQL support alongside REST', '2025-04-30 17:00:00', 4, 3, '2025-03-15 11:30:00', '2025-04-28 15:10:00'),
  
  -- E-commerce Platform tasks (Project 5) - ALL COMPLETED (created before 2025)
  (5, 'Shopping Cart Implementation', 'Build shopping cart with add/remove functionality', '2022-08-30 17:00:00', 4, 3, '2021-06-15 09:00:00', '2022-08-28 16:20:00'),
  (5, 'Payment Gateway Integration', 'Integrate multiple payment gateways', '2023-01-15 17:00:00', 4, 3, '2022-09-10 10:30:00', '2023-01-12 14:45:00'),
  (5, 'Product Search Engine', 'Implement advanced product search and filtering', '2023-06-30 17:00:00', 4, 2, '2023-02-05 11:15:00', '2023-06-28 13:30:00'),
  (5, 'Order Management System', 'Build order tracking and management features', '2024-03-15 17:00:00', 4, 2, '2023-08-20 09:45:00', '2024-03-12 11:55:00'),
  (5, 'Customer Review System', 'Add product review and rating functionality', '2024-08-30 17:00:00', 4, 1, '2024-04-10 14:20:00', '2024-08-27 16:10:00'),
  (5, 'Inventory Sync Module', 'Synchronize inventory across multiple warehouses', '2024-12-28 17:00:00', 4, 2, '2024-10-15 10:00:00', '2024-12-25 15:30:00'),
  
  -- Cloud Infrastructure Setup tasks (Project 6) - Tasks in Oct-Dec 2025
  (6, 'AWS Account Configuration', 'Setup AWS accounts and IAM policies', '2023-10-15 17:00:00', 4, 3, '2023-08-15 09:30:00', '2023-10-12 14:45:00'),
  (6, 'Configure Load Balancers', 'Setup and configure application load balancers', '2024-01-30 17:00:00', 4, 2, '2023-11-05 11:00:00', '2024-01-28 16:20:00'),
  (6, 'Implement Auto-Scaling', 'Configure auto-scaling groups for EC2 instances', '2025-12-30 17:00:00', 3, 2, '2025-10-10 10:15:00', '2025-12-15 13:40:00'),
  (6, 'Setup Monitoring and Alerts', 'Configure CloudWatch monitoring and alerting', '2025-12-15 17:00:00', 4, 2, '2025-10-20 13:30:00', '2025-12-12 11:25:00'),
  (6, 'Database Backup Strategy', 'Implement automated backup and recovery system', '2026-02-28 17:00:00', 2, 1, '2025-11-01 09:00:00', '2025-12-10 14:15:00'),
  (6, 'Container Registry Setup', 'Setup ECR for Docker container images', '2026-01-30 17:00:00', 3, 2, '2025-11-15 10:30:00', '2025-12-18 15:45:00'),
  (6, 'VPC Configuration', 'Configure VPC with subnets and security groups', '2026-01-15 17:00:00', 2, 3, '2025-12-01 11:45:00', '2025-12-19 09:20:00'),
  (6, 'S3 Lifecycle Policies', 'Configure S3 bucket lifecycle and storage tiers', '2026-01-20 17:00:00', 3, 1, '2025-10-15 13:20:00', '2025-12-17 14:35:00'),
  (6, 'CloudFront CDN Setup', 'Setup CloudFront for content delivery', '2025-12-28 17:00:00', 4, 2, '2025-11-10 10:45:00', '2025-12-26 16:10:00'),
  
  -- CRM System Development tasks (Project 7) - Tasks in Jan-May 2025
  (7, 'Contact Management Module', 'Build contact management with custom fields', '2023-09-30 17:00:00', 4, 3, '2022-07-10 09:15:00', '2023-09-27 15:30:00'),
  (7, 'Sales Pipeline Dashboard', 'Create visual sales pipeline tracking', '2024-02-15 17:00:00', 4, 2, '2023-10-15 10:45:00', '2024-02-12 14:20:00'),
  (7, 'Email Campaign Integration', 'Integrate email marketing campaigns', '2024-08-30 17:00:00', 4, 2, '2024-03-20 11:30:00', '2024-08-28 16:45:00'),
  (7, 'Reports and Analytics', 'Build customizable reports and analytics', '2025-12-30 17:00:00', 3, 2, '2025-01-15 13:00:00', '2025-12-18 10:25:00'),
  (7, 'Mobile CRM App', 'Develop mobile app for field sales team', '2025-07-15 17:00:00', 4, 1, '2025-02-10 08:45:00', '2025-07-12 15:10:00'),
  (7, 'Task Automation System', 'Implement workflow automation for repetitive tasks', '2026-03-30 17:00:00', 2, 2, '2025-03-20 14:15:00', '2025-12-05 11:40:00'),
  (7, 'Customer Segmentation', 'Implement AI-based customer segmentation', '2026-02-28 17:00:00', 3, 2, '2025-04-10 10:00:00', '2025-12-12 14:30:00'),
  (7, 'Lead Scoring System', 'Build predictive lead scoring model', '2025-08-30 17:00:00', 4, 2, '2025-05-15 11:30:00', '2025-08-27 16:15:00'),
  
  -- Data Analytics Dashboard tasks (Project 8) - Tasks in Jun-Aug 2025
  (8, 'Real-time Data Processing', 'Implement real-time data processing pipeline', '2024-08-30 17:00:00', 4, 3, '2024-02-10 09:00:00', '2024-08-27 14:30:00'),
  (8, 'Interactive Charts Library', 'Integrate D3.js for interactive visualizations', '2025-12-30 17:00:00', 3, 2, '2025-06-15 10:30:00', '2025-12-15 16:20:00'),
  (8, 'Custom Report Builder', 'Build drag-and-drop report builder', '2026-02-28 17:00:00', 2, 2, '2025-07-20 11:45:00', '2025-12-10 13:15:00'),
  (8, 'Data Export Functionality', 'Add CSV, Excel, PDF export options', '2025-09-15 17:00:00', 4, 1, '2025-08-10 14:00:00', '2025-09-12 11:25:00'),
  
  -- Security Audit Platform tasks (Project 9) - Tasks throughout 2025
  (9, 'Vulnerability Scanner', 'Build automated vulnerability scanning tool', '2024-06-30 17:00:00', 4, 3, '2023-10-10 09:30:00', '2024-06-28 15:40:00'),
  (9, 'Compliance Reporting', 'Generate compliance reports for various standards', '2024-12-15 17:00:00', 4, 2, '2024-07-15 10:15:00', '2024-12-12 14:20:00'),
  (9, 'Penetration Testing Module', 'Implement automated penetration testing', '2025-12-30 17:00:00', 3, 3, '2025-01-20 11:00:00', '2025-12-18 16:35:00'),
  (9, 'Security Dashboard', 'Create real-time security monitoring dashboard', '2025-05-15 17:00:00', 4, 2, '2025-03-05 13:45:00', '2025-05-12 11:50:00'),
  (9, 'Incident Response System', 'Build incident detection and response system', '2025-09-30 17:00:00', 4, 3, '2025-05-10 09:15:00', '2025-09-27 15:25:00'),
  (9, 'Security Policy Engine', 'Implement customizable security policy engine', '2026-03-15 17:00:00', 2, 2, '2025-07-01 14:30:00', '2025-12-15 10:40:00'),
  (9, 'Threat Intelligence Integration', 'Integrate threat intelligence feeds', '2026-01-30 17:00:00', 3, 2, '2025-09-15 10:00:00', '2025-12-18 13:25:00'),
  (9, 'Access Control Audit', 'Audit and monitor access control policies', '2026-02-28 17:00:00', 2, 1, '2025-11-10 11:30:00', '2025-12-19 15:10:00'),
  
  -- DevOps Automation tasks (Project 10) - ALL COMPLETED (created before 2025)
  (10, 'CI/CD Pipeline Setup', 'Configure Jenkins CI/CD pipelines', '2022-08-30 17:00:00', 4, 3, '2022-03-20 09:00:00', '2022-08-28 14:15:00'),
  (10, 'Docker Container Strategy', 'Implement Docker containerization strategy', '2023-02-15 17:00:00', 4, 2, '2022-09-10 10:30:00', '2023-02-12 16:20:00'),
  (10, 'Infrastructure as Code', 'Write Terraform scripts for infrastructure', '2023-08-30 17:00:00', 4, 2, '2023-03-15 11:15:00', '2023-08-27 13:45:00'),
  (10, 'Automated Testing Framework', 'Build automated testing and quality gates', '2024-03-15 17:00:00', 4, 2, '2023-10-05 09:45:00', '2024-03-12 15:30:00'),
  (10, 'Deployment Rollback System', 'Implement automated rollback on failures', '2024-09-30 17:00:00', 4, 1, '2024-04-20 14:00:00', '2024-09-27 11:25:00'),
  
  -- AI Chatbot Integration tasks (Project 11) - Tasks in Sep-Nov 2025
  (11, 'NLP Model Training', 'Train natural language processing model', '2024-10-30 17:00:00', 4, 3, '2024-06-20 09:15:00', '2024-10-27 14:30:00'),
  (11, 'Chatbot UI Design', 'Design conversational user interface', '2025-12-30 17:00:00', 3, 2, '2025-09-15 10:30:00', '2025-12-18 16:45:00'),
  (11, 'Knowledge Base Integration', 'Connect chatbot to knowledge base', '2025-12-15 17:00:00', 4, 2, '2025-10-01 11:45:00', '2025-12-12 13:20:00'),
  (11, 'Multi-language Support', 'Add support for multiple languages', '2026-04-15 17:00:00', 2, 1, '2025-11-10 13:00:00', '2025-12-05 15:10:00'),
  
  -- Microservices Architecture tasks (Project 12) - Tasks in Mar-Jul 2025
  (12, 'Service Decomposition Plan', 'Plan microservices decomposition strategy', '2023-08-15 17:00:00', 4, 3, '2023-05-10 09:00:00', '2023-08-12 14:25:00'),
  (12, 'API Gateway Implementation', 'Build API gateway for service routing', '2024-01-30 17:00:00', 4, 3, '2023-09-05 10:30:00', '2024-01-27 16:15:00'),
  (12, 'Service Discovery Setup', 'Configure service discovery and registry', '2024-06-15 17:00:00', 4, 2, '2024-02-10 11:15:00', '2024-06-12 13:40:00'),
  (12, 'Distributed Tracing', 'Implement distributed tracing with Jaeger', '2025-12-30 17:00:00', 3, 2, '2025-03-20 13:45:00', '2025-12-18 11:30:00'),
  (12, 'Event-Driven Architecture', 'Implement event-driven communication', '2025-08-15 17:00:00', 4, 2, '2025-04-05 09:30:00', '2025-08-12 15:20:00'),
  (12, 'Service Mesh Implementation', 'Deploy Istio service mesh', '2026-05-30 17:00:00', 2, 1, '2025-05-15 14:00:00', '2025-12-10 10:45:00'),
  (12, 'Circuit Breaker Pattern', 'Implement circuit breaker for resilience', '2025-10-30 17:00:00', 4, 2, '2025-06-10 10:30:00', '2025-10-27 14:15:00'),
  (12, 'API Versioning Strategy', 'Define and implement API versioning', '2026-01-15 17:00:00', 3, 2, '2025-07-20 11:45:00', '2025-12-15 16:30:00'),
  
  -- Inventory Management System tasks (Project 13) - Tasks in Aug-Oct 2025
  (13, 'Barcode Scanning Module', 'Implement barcode scanning functionality', '2024-11-30 17:00:00', 4, 3, '2024-08-25 09:15:00', '2024-11-27 14:30:00'),
  (13, 'Stock Level Monitoring', 'Build real-time stock level tracking', '2025-12-30 17:00:00', 3, 2, '2025-08-10 10:30:00', '2025-12-18 16:20:00'),
  (13, 'Supplier Management', 'Create supplier management and ordering system', '2025-11-15 17:00:00', 4, 2, '2025-09-20 11:45:00', '2025-11-12 13:35:00'),
  (13, 'Inventory Forecasting', 'Implement AI-based inventory forecasting', '2026-06-30 17:00:00', 2, 1, '2025-10-10 13:00:00', '2025-12-15 15:25:00'),
  (13, 'Multi-warehouse Support', 'Add support for multiple warehouse locations', '2026-02-28 17:00:00', 3, 2, '2025-10-25 09:30:00', '2025-12-19 11:40:00'),
  
  -- Enterprise Resource Planning tasks (Project 14) - Tasks spread across ALL months of 2025 with varying quantities
  -- January: 7 tasks
  (14, 'Financial Module Design', 'Design financial accounting and reporting module', '2025-02-28 17:00:00', 4, 3, '2025-01-03 09:00:00', '2025-02-25 14:30:00'),
  (14, 'Human Resources Module', 'Build HR management and payroll system', '2025-03-15 17:00:00', 4, 3, '2025-01-05 10:30:00', '2025-03-12 16:20:00'),
  (14, 'Chart of Accounts Setup', 'Configure chart of accounts and GL structure', '2025-02-15 17:00:00', 4, 2, '2025-01-08 11:15:00', '2025-02-12 13:45:00'),
  (14, 'User Access Control', 'Design role-based access control system', '2025-02-20 17:00:00', 4, 3, '2025-01-10 09:45:00', '2025-02-18 15:10:00'),
  (14, 'Database Schema Design', 'Design comprehensive ERP database schema', '2025-02-10 17:00:00', 4, 3, '2025-01-15 13:00:00', '2025-02-08 11:25:00'),
  (14, 'System Architecture Planning', 'Plan overall ERP system architecture', '2025-02-05 17:00:00', 4, 3, '2025-01-18 10:30:00', '2025-02-03 14:15:00'),
  (14, 'API Design Documentation', 'Document all ERP module APIs', '2025-03-01 17:00:00', 4, 2, '2025-01-22 11:45:00', '2025-02-28 16:30:00'),
  -- February: 8 tasks
  (14, 'Inventory Control System', 'Implement inventory and warehouse management', '2025-03-30 17:00:00', 4, 2, '2025-02-02 11:15:00', '2025-03-28 13:45:00'),
  (14, 'Purchase Order Module', 'Create purchase order and vendor management', '2025-04-15 17:00:00', 4, 2, '2025-02-05 09:45:00', '2025-04-12 15:10:00'),
  (14, 'Accounts Payable Module', 'Build accounts payable and payment processing', '2025-03-20 17:00:00', 4, 3, '2025-02-08 13:00:00', '2025-03-18 11:25:00'),
  (14, 'General Ledger Implementation', 'Implement general ledger and journal entries', '2025-03-25 17:00:00', 4, 3, '2025-02-12 10:30:00', '2025-03-23 14:15:00'),
  (14, 'Budget Management Module', 'Create budget planning and control module', '2025-04-10 17:00:00', 4, 2, '2025-02-15 11:45:00', '2025-04-08 16:30:00'),
  (14, 'Cost Center Management', 'Implement cost center tracking and allocation', '2025-03-31 17:00:00', 4, 2, '2025-02-20 09:00:00', '2025-03-29 13:20:00'),
  (14, 'Fixed Assets Module', 'Build fixed asset tracking and depreciation', '2025-04-20 17:00:00', 4, 2, '2025-02-25 14:30:00', '2025-04-18 11:45:00'),
  (14, 'Multi-Company Support', 'Add support for multiple company entities', '2025-04-30 17:00:00', 4, 2, '2025-02-28 10:15:00', '2025-04-28 15:50:00'),
  -- March: 6 tasks
  (14, 'Sales Order Processing', 'Build sales order and customer management', '2025-05-30 17:00:00', 4, 3, '2025-03-03 13:00:00', '2025-05-27 11:25:00'),
  (14, 'Production Planning', 'Implement production planning and scheduling', '2025-04-30 17:00:00', 4, 2, '2025-03-08 10:30:00', '2025-04-28 14:15:00'),
  (14, 'Accounts Receivable Module', 'Build accounts receivable and collection', '2025-05-15 17:00:00', 4, 3, '2025-03-12 11:45:00', '2025-05-13 16:30:00'),
  (14, 'Customer Credit Management', 'Implement customer credit limits and control', '2025-05-20 17:00:00', 4, 2, '2025-03-18 09:00:00', '2025-05-18 13:20:00'),
  (14, 'Invoice Generation System', 'Build automated invoice generation', '2025-05-25 17:00:00', 4, 2, '2025-03-22 14:30:00', '2025-05-23 11:45:00'),
  (14, 'Payment Gateway Integration', 'Integrate payment gateways for customer payments', '2025-06-10 17:00:00', 4, 3, '2025-03-28 10:15:00', '2025-06-08 15:50:00'),
  -- April: 2 tasks
  (14, 'Quality Management', 'Build quality control and assurance module', '2025-06-15 17:00:00', 4, 2, '2025-04-10 11:45:00', '2025-06-12 16:30:00'),
  (14, 'Bill of Materials Module', 'Create BOM management for production', '2025-06-20 17:00:00', 4, 2, '2025-04-25 09:30:00', '2025-06-18 14:15:00'),
  -- May: 5 tasks
  (14, 'Supply Chain Dashboard', 'Create real-time supply chain visibility dashboard', '2025-07-30 17:00:00', 4, 2, '2025-05-05 09:15:00', '2025-07-27 13:20:00'),
  (14, 'Asset Management', 'Implement fixed asset tracking and depreciation', '2025-06-30 17:00:00', 4, 1, '2025-05-12 14:00:00', '2025-06-28 11:45:00'),
  (14, 'Warehouse Management System', 'Build advanced warehouse operations module', '2025-07-15 17:00:00', 4, 2, '2025-05-18 10:30:00', '2025-07-13 15:10:00'),
  (14, 'Shipping and Logistics', 'Implement shipping and logistics management', '2025-07-20 17:00:00', 4, 2, '2025-05-22 11:00:00', '2025-07-18 14:25:00'),
  (14, 'Barcode and RFID Integration', 'Integrate barcode and RFID scanning', '2025-07-25 17:00:00', 4, 2, '2025-05-28 13:45:00', '2025-07-23 16:15:00'),
  -- June: 3 tasks
  (14, 'Business Intelligence', 'Build BI and analytics for decision support', '2025-08-15 17:00:00', 4, 2, '2025-06-08 10:30:00', '2025-08-12 15:10:00'),
  (14, 'Project Management Module', 'Create project tracking and resource allocation', '2025-08-30 17:00:00', 4, 2, '2025-06-15 11:00:00', '2025-08-28 14:25:00'),
  (14, 'Time Tracking System', 'Build employee time tracking and attendance', '2025-08-20 17:00:00', 4, 2, '2025-06-25 13:45:00', '2025-08-18 16:15:00'),
  -- July: 4 tasks
  (14, 'Document Management', 'Implement document storage and version control', '2025-09-30 17:00:00', 4, 1, '2025-07-05 13:45:00', '2025-09-27 16:15:00'),
  (14, 'Email Integration', 'Integrate email communication within ERP', '2025-09-15 17:00:00', 4, 2, '2025-07-12 09:00:00', '2025-09-13 11:30:00'),
  (14, 'Report Designer Tool', 'Build drag-and-drop report designer', '2025-09-20 17:00:00', 4, 2, '2025-07-18 10:30:00', '2025-09-18 14:45:00'),
  (14, 'Data Import/Export Tools', 'Create tools for data import and export', '2025-09-25 17:00:00', 4, 2, '2025-07-25 11:15:00', '2025-09-23 13:20:00'),
  -- August: 1 task
  (14, 'Workflow Automation', 'Build business process automation engine', '2025-10-15 17:00:00', 4, 3, '2025-08-20 09:30:00', '2025-10-12 11:50:00'),
  -- September: 5 tasks
  (14, 'Mobile ERP App', 'Develop mobile application for field access', '2025-11-30 17:00:00', 4, 2, '2025-09-05 10:15:00', '2025-11-27 14:35:00'),
  (14, 'Offline Mode Support', 'Add offline sync capability to mobile app', '2025-11-15 17:00:00', 4, 2, '2025-09-12 11:30:00', '2025-11-13 15:20:00'),
  (14, 'Mobile Approvals', 'Implement approval workflows on mobile', '2025-11-20 17:00:00', 4, 2, '2025-09-18 09:45:00', '2025-11-18 13:10:00'),
  (14, 'Geolocation Features', 'Add GPS tracking for field operations', '2025-11-25 17:00:00', 4, 1, '2025-09-22 14:00:00', '2025-11-23 16:40:00'),
  (14, 'Mobile Dashboard', 'Create mobile-optimized dashboard', '2025-12-05 17:00:00', 4, 2, '2025-09-28 10:30:00', '2025-12-03 11:50:00'),
  -- October: 2 tasks
  (14, 'Multi-currency Support', 'Add support for multiple currencies', '2025-10-30 17:00:00', 4, 2, '2025-10-08 11:30:00', '2025-10-28 15:20:00'),
  (14, 'Exchange Rate Management', 'Implement automatic exchange rate updates', '2025-11-05 17:00:00', 4, 2, '2025-10-22 09:45:00', '2025-11-03 13:35:00'),
  -- November: 4 tasks
  (14, 'API Integration Layer', 'Build REST API for third-party integrations', '2025-12-15 17:00:00', 4, 3, '2025-11-05 13:00:00', '2025-12-12 11:40:00'),
  (14, 'User Permissions System', 'Implement role-based access control', '2025-12-30 17:00:00', 3, 2, '2025-11-12 09:45:00', '2025-12-18 16:25:00'),
  (14, 'Audit Trail Module', 'Build comprehensive audit logging system', '2026-01-15 17:00:00', 3, 2, '2025-11-18 10:30:00', '2025-12-19 13:50:00'),
  (14, 'Data Security Encryption', 'Implement end-to-end data encryption', '2026-01-10 17:00:00', 3, 3, '2025-11-25 14:15:00', '2025-12-20 10:30:00'),
  -- December: 6 tasks
  (14, 'Email Notification System', 'Implement automated email notifications', '2026-01-30 17:00:00', 2, 1, '2025-12-02 11:15:00', '2025-12-20 15:10:00'),
  (14, 'Data Migration Tools', 'Create tools for legacy data migration', '2026-02-15 17:00:00', 2, 2, '2025-12-05 14:00:00', '2025-12-21 09:30:00'),
  (14, 'System Performance Optimization', 'Optimize database queries and caching', '2026-01-20 17:00:00', 3, 2, '2025-12-08 09:30:00', '2025-12-19 14:15:00'),
  (14, 'User Training Materials', 'Create comprehensive user documentation', '2026-02-28 17:00:00', 2, 1, '2025-12-12 10:45:00', '2025-12-20 11:20:00'),
  (14, 'Load Testing', 'Perform system load and stress testing', '2026-01-25 17:00:00', 3, 2, '2025-12-16 13:20:00', '2025-12-20 16:45:00'),
  (14, 'Security Audit', 'Conduct comprehensive security audit', '2026-02-10 17:00:00', 2, 3, '2025-12-20 11:00:00', '2025-12-21 09:15:00')
ON CONFLICT DO NOTHING;

-- ===========================
-- TASK-TAGS ASSOCIATIONS
-- ===========================
INSERT INTO "task_tags" ("task_id", "tag_id")
VALUES
  -- Website Redesign tasks
  (1, 2), (1, 8),
  (2, 2),
  (3, 1), (3, 8),
  (4, 3),
  (5, 5), (5, 6),
  (6, 2), (6, 8),
  (7, 2), (7, 8),
  (8, 4), (8, 6),
  (9, 5), (9, 6),
  -- Mobile App Development tasks
  (10, 2), (10, 7),
  (11, 2),
  (12, 1),
  (13, 4), (13, 8),
  (14, 5), (14, 6),
  (15, 2), (15, 4),
  (16, 2), (16, 7),
  (17, 2), (17, 4),
  (18, 2), (18, 7),
  (19, 2), (19, 4),
  (20, 2), (20, 4),
  -- Database Migration tasks
  (21, 2),
  (22, 3),
  (23, 2),
  (24, 5),
  (25, 5), (25, 6),
  -- API Integration tasks
  (26, 2), (26, 7),
  (27, 2),
  (28, 1), (28, 6),
  (29, 2),
  (30, 2), (30, 7),
  (31, 2), (31, 5),
  (32, 2), (32, 5),
  (33, 3), (33, 5),
  -- E-commerce Platform tasks
  (34, 2), (34, 8),
  (35, 2), (35, 7),
  (36, 2), (36, 6),
  (37, 2), (37, 4),
  (38, 2), (38, 8),
  (39, 2), (39, 4),
  -- Cloud Infrastructure Setup tasks
  (40, 2), (40, 7),
  (41, 2), (41, 6),
  (42, 2), (42, 6),
  (43, 2), (43, 4),
  (44, 2), (44, 7),
  (45, 2), (45, 4),
  (46, 2), (46, 7),
  (47, 2), (47, 4),
  (48, 2), (48, 6),
  -- CRM System Development tasks
  (49, 2), (49, 4),
  (50, 2), (50, 8),
  (51, 2), (51, 4),
  (52, 2), (52, 3),
  (53, 2), (53, 8),
  (54, 2), (54, 4),
  -- Data Analytics Dashboard tasks
  (55, 2), (55, 6),
  (56, 2), (56, 8),
  (57, 2), (57, 4),
  (58, 4),
  -- Security Audit Platform tasks
  (59, 2), (59, 7),
  (60, 3), (60, 7),
  (61, 2), (61, 7),
  (62, 2), (62, 8),
  (63, 2), (63, 7),
  (64, 2), (64, 7),
  -- DevOps Automation tasks
  (65, 2), (65, 4),
  (66, 2), (66, 4),
  (67, 2), (67, 3),
  (68, 5), (68, 4),
  (69, 2), (69, 4),
  -- AI Chatbot Integration tasks
  (70, 2), (70, 4),
  (71, 2), (71, 8),
  (72, 2), (72, 4),
  (73, 4),
  -- Microservices Architecture tasks
  (74, 3), (74, 4),
  (75, 2), (75, 4),
  (76, 2), (76, 4),
  (77, 2), (77, 6),
  (78, 2), (78, 4),
  (79, 2), (79, 4),
  -- Inventory Management System tasks
  (80, 2), (80, 4),
  (81, 2), (81, 6),
  (82, 2), (82, 4),
  (83, 2), (83, 4),
  (84, 2), (84, 4),
  -- Enterprise Resource Planning tasks
  (85, 2), (85, 3),
  (86, 2), (86, 4),
  (87, 2), (87, 6),
  (88, 2), (88, 4),
  (89, 2), (89, 4),
  (90, 2), (90, 4),
  (91, 2), (91, 5),
  (92, 2), (92, 8),
  (93, 2), (93, 4),
  (94, 2), (94, 8),
  (95, 2), (95, 4),
  (96, 2), (96, 4),
  (97, 2), (97, 5),
  (98, 2), (98, 6),
  (99, 2), (99, 6),
  (100, 2), (100, 4),
  (101, 2), (101, 7),
  (102, 2), (102, 8),
  (103, 2), (103, 4),
  (104, 2), (104, 4),
  (105, 2), (105, 3),
  (106, 2), (106, 4),
  (107, 2), (107, 8),
  (108, 2), (108, 4),
  (109, 2), (109, 7),
  (110, 2), (110, 7),
  (111, 7), (111, 3),
  (112, 2), (112, 4),
  (113, 2), (113, 4),
  (114, 2), (114, 3),
  (115, 2), (115, 4),
  (116, 2), (116, 3),
  (117, 2), (117, 4),
  (118, 2), (118, 4),
  (119, 2), (119, 7),
  (120, 2), (120, 7),
  (121, 2), (121, 6),
  (122, 2), (122, 7),
  (123, 2), (123, 4),
  (124, 2), (124, 7),
  (125, 2), (125, 6),
  (126, 2), (126, 8),
  (127, 2), (127, 4),
  (128, 2), (128, 3),
  (129, 2), (129, 7),
  (130, 2), (130, 1),
  (131, 2), (131, 4),
  (132, 2), (132, 4),
  (133, 2), (133, 4),
  (134, 2), (134, 7),
  (135, 2), (135, 4),
  (136, 2), (136, 3),
  (137, 2), (137, 3)
ON CONFLICT DO NOTHING;

-- ===========================
-- USER-TASK ASSIGNMENTS
-- ===========================
INSERT INTO "user_task" ("task_id", "user_id", "assigned_by_id", "assigned_at")
VALUES
  -- Website Redesign (Members: user-1, user-2, user-3, user-4, user-6, user-7)
  (1, 'user-3', 'user-2', '2023-02-11 09:00:00'),
  (1, 'user-4', 'user-2', '2023-02-11 10:30:00'),
  (2, 'user-3', 'user-1', '2025-01-16 08:45:00'),
  (3, 'user-4', 'user-2', '2025-02-13 09:15:00'),
  (4, 'user-1', 'user-1', '2025-02-26 10:00:00'),
  (4, 'user-6', 'user-1', '2025-02-26 10:15:00'),
  (5, 'user-3', 'user-1', '2025-03-19 08:30:00'),
  (6, 'user-3', 'user-2', '2025-04-23 10:00:00'),
  (6, 'user-7', 'user-2', '2025-04-23 10:05:00'),
  (7, 'user-4', 'user-2', '2025-05-16 11:20:00'),
  (7, 'user-6', 'user-2', '2025-05-16 11:25:00'),
  (8, 'user-3', 'user-1', '2023-12-02 09:45:00'),
  (9, 'user-3', 'user-1', '2025-06-21 10:30:00'),
  (9, 'user-6', 'user-1', '2025-06-21 10:35:00'),
  
  -- Mobile App Development (Members: user-2, user-3, user-5, user-8, user-9, user-10)
  (10, 'user-5', 'user-3', '2025-01-21 10:15:00'),
  (10, 'user-8', 'user-3', '2025-01-21 10:20:00'),
  (11, 'user-5', 'user-2', '2025-02-09 09:00:00'),
  (12, 'user-5', 'user-2', '2025-12-11 08:30:00'),
  (12, 'user-9', 'user-2', '2025-12-11 08:35:00'),
  (13, 'user-3', 'user-3', '2025-03-29 11:00:00'),
  (13, 'user-10', 'user-3', '2025-03-29 11:10:00'),
  (14, 'user-5', 'user-2', '2025-04-19 09:30:00'),
  (15, 'user-8', 'user-2', '2025-05-13 10:45:00'),
  (15, 'user-9', 'user-2', '2025-05-13 10:50:00'),
  (16, 'user-5', 'user-2', '2025-05-29 08:15:00'),
  (16, 'user-10', 'user-2', '2025-05-29 08:20:00'),
  (17, 'user-3', 'user-2', '2025-06-16 10:00:00'),
  (18, 'user-5', 'user-2', '2025-07-11 09:30:00'),
  (19, 'user-8', 'user-3', '2025-08-01 10:15:00'),
  (20, 'user-9', 'user-2', '2025-08-20 11:00:00'),
  
  -- Database Migration (Members: user-1, user-4, user-11) - ALL COMPLETED
  (21, 'user-4', 'user-1', '2022-11-21 09:00:00'),
  (21, 'user-11', 'user-1', '2022-11-21 09:10:00'),
  (22, 'user-4', 'user-1', '2023-01-11 10:30:00'),
  (23, 'user-4', 'user-1', '2023-06-06 11:15:00'),
  (23, 'user-11', 'user-1', '2023-06-06 11:20:00'),
  (24, 'user-11', 'user-4', '2024-03-16 09:45:00'),
  (25, 'user-4', 'user-1', '2024-05-12 10:00:00'),
  (25, 'user-11', 'user-1', '2024-05-12 10:05:00'),
  
  -- API Integration (Members: user-5, user-1, user-12, user-13)
  (26, 'user-1', 'user-5', '2025-07-09 10:00:00'),
  (26, 'user-12', 'user-5', '2025-07-09 10:10:00'),
  (27, 'user-1', 'user-5', '2025-07-23 09:30:00'),
  (28, 'user-1', 'user-5', '2025-08-11 11:15:00'),
  (28, 'user-13', 'user-5', '2025-08-11 11:20:00'),
  (29, 'user-12', 'user-1', '2025-08-29 10:45:00'),
  (29, 'user-13', 'user-1', '2025-08-29 10:50:00'),
  (30, 'user-1', 'user-5', '2024-01-11 09:00:00'),
  (30, 'user-12', 'user-5', '2024-01-11 09:05:00'),
  (31, 'user-1', 'user-5', '2025-09-19 10:15:00'),
  (32, 'user-12', 'user-5', '2025-10-06 11:00:00'),
  (33, 'user-13', 'user-5', '2025-03-16 09:30:00'),
  
  -- E-commerce Platform (Members: user-6, user-7, user-8, user-14, user-15) - ALL COMPLETED
  (34, 'user-8', 'user-6', '2021-06-16 10:00:00'),
  (34, 'user-14', 'user-6', '2021-06-16 10:10:00'),
  (35, 'user-7', 'user-6', '2022-09-11 11:15:00'),
  (35, 'user-8', 'user-6', '2022-09-11 11:20:00'),
  (36, 'user-14', 'user-7', '2023-02-06 09:30:00'),
  (36, 'user-15', 'user-7', '2023-02-06 09:35:00'),
  (37, 'user-8', 'user-6', '2023-08-21 10:45:00'),
  (37, 'user-14', 'user-6', '2023-08-21 10:50:00'),
  (38, 'user-15', 'user-7', '2024-04-11 11:00:00'),
  (39, 'user-7', 'user-6', '2024-10-16 09:15:00'),
  (39, 'user-8', 'user-6', '2024-10-16 09:20:00'),
  
  -- Cloud Infrastructure Setup (Members: user-9, user-10, user-11, user-16, user-17)
  (40, 'user-11', 'user-9', '2023-08-16 10:00:00'),
  (40, 'user-16', 'user-9', '2023-08-16 10:05:00'),
  (41, 'user-11', 'user-10', '2023-11-06 09:30:00'),
  (41, 'user-17', 'user-10', '2023-11-06 09:35:00'),
  (42, 'user-11', 'user-9', '2025-10-11 11:00:00'),
  (42, 'user-16', 'user-9', '2025-10-11 11:10:00'),
  (43, 'user-10', 'user-9', '2025-10-21 10:15:00'),
  (43, 'user-17', 'user-9', '2025-10-21 10:20:00'),
  (44, 'user-11', 'user-10', '2025-11-02 09:45:00'),
  (45, 'user-16', 'user-9', '2025-11-16 10:00:00'),
  (45, 'user-17', 'user-9', '2025-11-16 10:05:00'),
  (46, 'user-11', 'user-10', '2025-12-02 11:15:00'),
  (47, 'user-10', 'user-9', '2025-10-16 09:30:00'),
  (47, 'user-16', 'user-9', '2025-10-16 09:35:00'),
  (48, 'user-11', 'user-9', '2025-11-11 10:50:00'),
  (48, 'user-17', 'user-9', '2025-11-11 10:55:00'),
  
  -- CRM System Development (Members: user-12, user-13, user-14, user-15, user-18, user-19)
  (49, 'user-14', 'user-12', '2022-07-11 10:00:00'),
  (49, 'user-15', 'user-12', '2022-07-11 10:05:00'),
  (50, 'user-13', 'user-12', '2023-10-16 11:15:00'),
  (50, 'user-18', 'user-12', '2023-10-16 11:20:00'),
  (51, 'user-14', 'user-13', '2024-03-21 09:30:00'),
  (51, 'user-19', 'user-13', '2024-03-21 09:35:00'),
  (52, 'user-15', 'user-12', '2025-01-16 10:45:00'),
  (52, 'user-18', 'user-12', '2025-01-16 10:50:00'),
  (53, 'user-13', 'user-12', '2025-02-11 09:00:00'),
  (53, 'user-14', 'user-12', '2025-02-11 09:05:00'),
  (54, 'user-15', 'user-13', '2025-03-21 11:30:00'),
  (54, 'user-19', 'user-13', '2025-03-21 11:35:00'),
  (55, 'user-18', 'user-12', '2025-04-11 09:15:00'),
  (56, 'user-13', 'user-13', '2025-05-16 10:30:00'),
  
  -- Data Analytics Dashboard (Members: user-16, user-17)
  (55, 'user-17', 'user-16', '2024-02-11 10:00:00'),
  (56, 'user-17', 'user-16', '2025-06-16 11:15:00'),
  (57, 'user-17', 'user-16', '2025-07-21 09:30:00'),
  (58, 'user-17', 'user-16', '2025-08-11 10:45:00'),
  
  -- Security Audit Platform (Members: user-1, user-3, user-5, user-7, user-11, user-13, user-18)
  (59, 'user-5', 'user-1', '2023-10-11 10:00:00'),
  (59, 'user-11', 'user-1', '2023-10-11 10:10:00'),
  (60, 'user-7', 'user-3', '2024-07-16 11:15:00'),
  (60, 'user-13', 'user-3', '2024-07-16 11:20:00'),
  (61, 'user-5', 'user-1', '2025-01-21 09:30:00'),
  (61, 'user-18', 'user-1', '2025-01-21 09:35:00'),
  (62, 'user-11', 'user-3', '2025-03-06 10:45:00'),
  (62, 'user-13', 'user-3', '2025-03-06 10:50:00'),
  (63, 'user-7', 'user-1', '2025-05-11 09:00:00'),
  (63, 'user-18', 'user-1', '2025-05-11 09:10:00'),
  (64, 'user-5', 'user-3', '2025-07-02 11:15:00'),
  (64, 'user-7', 'user-3', '2025-07-02 11:20:00'),
  (65, 'user-11', 'user-1', '2025-09-16 10:00:00'),
  (65, 'user-13', 'user-1', '2025-09-16 10:10:00'),
  (66, 'user-18', 'user-3', '2025-12-16 11:30:00'),
  (67, 'user-7', 'user-1', '2025-12-17 09:45:00'),
  (68, 'user-11', 'user-3', '2025-12-18 10:00:00'),
  
  -- DevOps Automation (Members: user-4, user-9, user-10, user-20) - ALL COMPLETED
  (65, 'user-9', 'user-4', '2022-03-21 10:00:00'),
  (65, 'user-10', 'user-4', '2022-03-21 10:05:00'),
  (66, 'user-9', 'user-4', '2022-09-11 11:15:00'),
  (66, 'user-20', 'user-4', '2022-09-11 11:20:00'),
  (67, 'user-10', 'user-9', '2023-03-16 09:30:00'),
  (67, 'user-20', 'user-9', '2023-03-16 09:35:00'),
  (68, 'user-9', 'user-4', '2023-10-06 10:45:00'),
  (68, 'user-10', 'user-4', '2023-10-06 10:50:00'),
  (69, 'user-20', 'user-4', '2024-04-21 11:00:00'),
  
  -- AI Chatbot Integration (Members: user-2, user-8, user-19)
  (70, 'user-8', 'user-2', '2024-06-21 10:00:00'),
  (70, 'user-19', 'user-2', '2024-06-21 10:05:00'),
  (71, 'user-8', 'user-2', '2025-09-16 11:15:00'),
  (71, 'user-19', 'user-2', '2025-09-16 11:20:00'),
  (72, 'user-8', 'user-2', '2025-10-02 09:30:00'),
  (72, 'user-19', 'user-2', '2025-10-02 09:35:00'),
  (73, 'user-8', 'user-2', '2025-11-11 10:45:00'),
  (73, 'user-19', 'user-8', '2025-11-11 10:50:00'),
  
  -- Microservices Architecture (Members: user-5, user-6, user-12, user-15, user-20)
  (74, 'user-6', 'user-5', '2023-05-11 10:00:00'),
  (74, 'user-12', 'user-5', '2023-05-11 10:05:00'),
  (75, 'user-6', 'user-5', '2023-09-06 11:15:00'),
  (75, 'user-15', 'user-5', '2023-09-06 11:20:00'),
  (76, 'user-12', 'user-6', '2024-02-11 09:30:00'),
  (76, 'user-20', 'user-6', '2024-02-11 09:35:00'),
  (77, 'user-15', 'user-5', '2025-03-21 10:45:00'),
  (77, 'user-20', 'user-5', '2025-03-21 10:50:00'),
  (78, 'user-6', 'user-5', '2025-04-06 09:00:00'),
  (78, 'user-12', 'user-5', '2025-04-06 09:05:00'),
  (79, 'user-15', 'user-6', '2025-05-16 11:30:00'),
  (79, 'user-20', 'user-6', '2025-05-16 11:35:00'),
  
  -- Inventory Management System (Members: user-7, user-11, user-14, user-18)
  (80, 'user-11', 'user-7', '2024-08-26 10:00:00'),
  (80, 'user-14', 'user-7', '2024-08-26 10:05:00'),
  (81, 'user-11', 'user-7', '2025-08-11 11:15:00'),
  (81, 'user-18', 'user-7', '2025-08-11 11:20:00'),
  (82, 'user-14', 'user-11', '2025-09-21 09:30:00'),
  (82, 'user-18', 'user-11', '2025-09-21 09:35:00'),
  (83, 'user-11', 'user-7', '2025-10-11 10:45:00'),
  (83, 'user-7', 'user-7', '2025-10-11 10:50:00'),
  (84, 'user-14', 'user-7', '2025-10-26 11:00:00'),
  (84, 'user-18', 'user-7', '2025-10-26 11:05:00'),
  
  -- Enterprise Resource Planning (Members: user-1, user-4, user-8, user-10, user-12, user-16)
  (85, 'user-4', 'user-1', '2025-01-06 09:30:00'),
  (85, 'user-8', 'user-1', '2025-01-06 09:35:00'),
  (86, 'user-4', 'user-1', '2025-01-13 10:45:00'),
  (86, 'user-12', 'user-1', '2025-01-13 10:50:00'),
  (87, 'user-8', 'user-4', '2025-01-18 11:30:00'),
  (88, 'user-10', 'user-4', '2025-01-22 09:00:00'),
  (89, 'user-4', 'user-1', '2025-01-28 10:15:00'),
  (89, 'user-16', 'user-1', '2025-01-28 10:20:00'),
  (90, 'user-8', 'user-1', '2025-02-05 11:00:00'),
  (91, 'user-10', 'user-4', '2025-02-10 09:30:00'),
  (92, 'user-12', 'user-1', '2025-02-15 10:45:00'),
  (93, 'user-16', 'user-4', '2025-02-20 11:30:00'),
  (94, 'user-4', 'user-1', '2025-02-25 09:00:00'),
  (95, 'user-8', 'user-1', '2025-03-05 10:15:00'),
  (96, 'user-10', 'user-1', '2025-03-12 11:00:00'),
  (97, 'user-12', 'user-4', '2025-03-18 09:30:00'),
  (98, 'user-16', 'user-1', '2025-03-02 11:30:00'),
  (99, 'user-4', 'user-4', '2025-03-05 09:45:00'),
  (100, 'user-8', 'user-4', '2025-03-08 09:00:00'),
  (100, 'user-10', 'user-4', '2025-03-08 09:05:00'),
  (101, 'user-12', 'user-1', '2025-03-13 10:15:00'),
  (101, 'user-16', 'user-1', '2025-03-13 10:20:00'),
  (102, 'user-4', 'user-4', '2025-03-20 11:00:00'),
  (103, 'user-16', 'user-4', '2025-03-23 09:30:00'),
  (103, 'user-8', 'user-4', '2025-03-23 09:35:00'),
  (104, 'user-12', 'user-1', '2025-03-29 10:45:00'),
  (104, 'user-4', 'user-1', '2025-03-29 10:50:00'),
  (105, 'user-8', 'user-1', '2025-04-01 11:30:00'),
  (105, 'user-10', 'user-1', '2025-04-01 11:35:00'),
  (106, 'user-10', 'user-4', '2025-04-13 09:00:00'),
  (106, 'user-4', 'user-4', '2025-04-13 09:05:00'),
  (107, 'user-12', 'user-1', '2025-04-27 10:15:00'),
  (107, 'user-8', 'user-1', '2025-04-27 10:20:00'),
  (108, 'user-16', 'user-1', '2025-05-08 11:00:00'),
  (108, 'user-12', 'user-1', '2025-05-08 11:05:00'),
  (109, 'user-4', 'user-4', '2025-05-16 09:30:00'),
  (109, 'user-16', 'user-4', '2025-05-16 09:35:00'),
  (110, 'user-8', 'user-1', '2025-05-22 10:45:00'),
  (110, 'user-10', 'user-1', '2025-05-22 10:50:00'),
  (111, 'user-16', 'user-4', '2025-05-28 11:30:00'),
  (111, 'user-4', 'user-4', '2025-05-28 11:35:00'),
  (112, 'user-12', 'user-4', '2025-06-01 09:00:00'),
  (112, 'user-8', 'user-4', '2025-06-01 09:05:00'),
  (113, 'user-16', 'user-1', '2025-06-10 10:15:00'),
  (113, 'user-10', 'user-1', '2025-06-10 10:20:00'),
  (114, 'user-4', 'user-1', '2025-06-18 11:00:00'),
  (114, 'user-12', 'user-1', '2025-06-18 11:05:00'),
  (115, 'user-8', 'user-4', '2025-06-27 09:30:00'),
  (115, 'user-16', 'user-4', '2025-06-27 09:35:00'),
  (116, 'user-10', 'user-1', '2025-07-08 10:45:00'),
  (116, 'user-12', 'user-1', '2025-07-08 10:50:00'),
  (117, 'user-12', 'user-1', '2025-07-14 11:30:00'),
  (117, 'user-8', 'user-1', '2025-07-14 11:35:00'),
  (118, 'user-16', 'user-4', '2025-07-21 09:00:00'),
  (118, 'user-10', 'user-4', '2025-07-21 09:05:00'),
  (119, 'user-4', 'user-1', '2025-08-22 11:00:00'),
  (119, 'user-8', 'user-1', '2025-08-22 11:05:00'),
  (120, 'user-10', 'user-1', '2025-09-08 09:30:00'),
  (120, 'user-12', 'user-1', '2025-09-08 09:35:00'),
  (121, 'user-10', 'user-4', '2025-09-16 10:45:00'),
  (121, 'user-12', 'user-4', '2025-09-16 10:50:00'),
  (122, 'user-16', 'user-1', '2025-09-25 09:00:00'),
  (122, 'user-8', 'user-1', '2025-09-25 09:05:00'),
  (123, 'user-16', 'user-1', '2025-09-28 10:45:00'),
  (123, 'user-4', 'user-1', '2025-09-28 10:50:00'),
  (124, 'user-8', 'user-4', '2025-10-02 10:15:00'),
  (124, 'user-16', 'user-4', '2025-10-02 10:20:00'),
  (125, 'user-8', 'user-1', '2025-10-10 11:30:00'),
  (125, 'user-10', 'user-1', '2025-10-10 11:35:00'),
  (126, 'user-12', 'user-1', '2025-10-12 11:00:00'),
  (126, 'user-16', 'user-1', '2025-10-12 11:05:00'),
  (127, 'user-12', 'user-4', '2025-10-25 09:00:00'),
  (127, 'user-4', 'user-4', '2025-10-25 09:05:00'),
  (128, 'user-4', 'user-1', '2025-11-05 11:00:00'),
  (128, 'user-10', 'user-1', '2025-11-05 11:05:00'),
  (129, 'user-4', 'user-1', '2025-11-08 10:15:00'),
  (129, 'user-8', 'user-1', '2025-11-08 10:20:00'),
  (130, 'user-10', 'user-4', '2025-11-10 10:45:00'),
  (130, 'user-12', 'user-4', '2025-11-10 10:50:00'),
  (131, 'user-10', 'user-1', '2025-11-15 11:30:00'),
  (131, 'user-16', 'user-1', '2025-11-15 11:35:00'),
  (132, 'user-16', 'user-1', '2025-11-20 09:30:00'),
  (132, 'user-8', 'user-1', '2025-11-20 09:35:00'),
  (133, 'user-16', 'user-4', '2025-11-28 10:45:00'),
  (133, 'user-4', 'user-4', '2025-11-28 10:50:00'),
  (134, 'user-8', 'user-1', '2025-12-05 11:30:00'),
  (134, 'user-12', 'user-1', '2025-12-05 11:35:00'),
  (135, 'user-8', 'user-1', '2025-12-07 09:30:00'),
  (135, 'user-10', 'user-1', '2025-12-07 09:35:00'),
  (136, 'user-10', 'user-4', '2025-12-11 10:45:00'),
  (136, 'user-16', 'user-4', '2025-12-11 10:50:00'),
  (137, 'user-12', 'user-1', '2025-12-15 11:30:00'),
  (137, 'user-4', 'user-1', '2025-12-15 11:35:00'),
  (124, 'user-4', 'user-4', '2025-12-08 09:00:00'),
  (125, 'user-8', 'user-1', '2025-12-10 10:15:00'),
  (126, 'user-10', 'user-1', '2025-12-15 11:00:00'),
  (127, 'user-12', 'user-4', '2025-12-18 09:30:00'),
  (128, 'user-16', 'user-1', '2025-12-22 10:45:00'),
  (129, 'user-4', 'user-1', '2025-12-05 11:30:00'),
  (130, 'user-8', 'user-4', '2025-12-08 09:00:00'),
  (131, 'user-10', 'user-1', '2025-12-10 10:15:00'),
  (132, 'user-12', 'user-1', '2025-12-15 11:00:00'),
  (133, 'user-16', 'user-4', '2025-12-18 09:30:00'),
  (134, 'user-4', 'user-1', '2025-12-20 10:45:00'),
  (135, 'user-8', 'user-1', '2025-12-22 11:30:00'),
  (136, 'user-10', 'user-4', '2025-12-10 09:00:00'),
  (137, 'user-12', 'user-1', '2025-12-22 10:15:00')
ON CONFLICT DO NOTHING;

-- ===========================
-- COMMENTS
-- ===========================
INSERT INTO "comments" ("task_id", "user_id", "content", "created_at", "updated_at")
VALUES
  -- Website Redesign comments (Project 1)
  (1, 'user-2', 'Great progress on the mockups! Please incorporate the feedback from design review.', '2025-01-10 10:30:00', '2025-01-10 10:30:00'),
  (1, 'user-3', 'Thanks! I will update the mockups and share revised version by tomorrow.', '2025-01-10 14:20:00', '2025-01-10 14:20:00'),
  (1, 'user-4', 'The color scheme looks modern. Should we add dark mode option?', '2025-01-11 09:45:00', '2025-01-11 09:45:00'),
  (1, 'user-1', 'Mockups approved. Moving to implementation phase.', '2025-02-20 11:00:00', '2025-02-20 11:00:00'),
  (2, 'user-1', 'This is critical for the project timeline. Please expedite.', '2025-01-16 09:15:00', '2025-01-16 09:15:00'),
  (2, 'user-3', 'Setting up Webpack, Babel, and ESLint configurations.', '2025-01-18 10:30:00', '2025-01-18 10:30:00'),
  (2, 'user-3', 'Environment setup completed. Ready for development.', '2025-01-23 15:30:00', '2025-01-23 15:30:00'),
  (3, 'user-2', 'This bug is affecting multiple users. We need to prioritize fixing it ASAP.', '2025-12-01 10:00:00', '2025-12-01 10:00:00'),
  (3, 'user-4', 'Started investigation. The issue appears to be in the CSS media queries.', '2025-12-03 14:30:00', '2025-12-03 14:30:00'),
  (3, 'user-6', 'Found the issue - hamburger menu z-index conflict. Working on fix.', '2025-12-04 11:15:00', '2025-12-04 11:15:00'),
  (4, 'user-1', 'API docs should include authentication examples and error codes.', '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
  (4, 'user-6', 'Added Swagger UI with interactive API testing. Much better!', '2025-12-08 14:30:00', '2025-12-08 14:30:00'),
  (5, 'user-3', 'Using ImageOptim to compress assets. Size reduced by 70%!', '2025-03-20 15:00:00', '2025-03-20 15:00:00'),
  (6, 'user-7', 'CSS Grid is working beautifully across all screen sizes.', '2025-04-24 10:20:00', '2025-04-24 10:20:00'),
  (7, 'user-4', 'Form validation is working correctly. Need to test with different browsers.', '2025-11-20 11:45:00', '2025-11-20 11:45:00'),
  (7, 'user-6', 'Testing completed on Chrome, Firefox, and Safari. All looking good.', '2025-12-05 16:00:00', '2025-12-05 16:00:00'),
  (8, 'user-3', 'Meta tags and structured data added. Google Search Console setup done.', '2024-02-08 11:30:00', '2024-02-08 11:30:00'),
  (9, 'user-1', 'PageSpeed score improved from 65 to 92. Great optimization work!', '2025-07-26 15:10:00', '2025-07-26 15:10:00'),
  
  -- Mobile App Development comments (Project 2)
  (10, 'user-2', 'Let''s use JWT for token-based authentication. More secure than sessions.', '2025-01-22 09:00:00', '2025-01-22 09:00:00'),
  (10, 'user-3', 'Working on integrating Auth0 for authentication.', '2025-01-25 10:30:00', '2025-01-25 10:30:00'),
  (10, 'user-2', 'Make sure to implement refresh token logic properly.', '2025-01-28 14:15:00', '2025-01-28 14:15:00'),
  (10, 'user-8', 'OAuth implementation complete. Testing in progress.', '2025-04-10 09:45:00', '2025-04-10 09:45:00'),
  (10, 'user-5', 'Biometric authentication (Touch ID/Face ID) integrated. Works smoothly!', '2025-04-12 11:20:00', '2025-04-12 11:20:00'),
  (11, 'user-2', 'Database schema looks good. Ready for implementation.', '2025-02-10 11:30:00', '2025-02-10 11:30:00'),
  (11, 'user-5', 'Using SQLite for local storage and PostgreSQL for backend.', '2025-03-07 10:00:00', '2025-03-07 10:00:00'),
  (12, 'user-2', 'Critical issue - app crashes immediately after logout. High priority fix needed.', '2025-12-11 09:00:00', '2025-12-11 09:00:00'),
  (12, 'user-5', 'Found the issue - memory leak in session cleanup. Will deploy patch shortly.', '2025-12-15 11:20:00', '2025-12-15 11:20:00'),
  (12, 'user-9', 'Patch deployed and tested. Issue resolved.', '2025-12-18 14:30:00', '2025-12-18 14:30:00'),
  (13, 'user-3', 'Dark mode toggle working. Also added auto-switch based on system settings.', '2025-11-20 10:45:00', '2025-11-20 10:45:00'),
  (13, 'user-10', 'OLED dark theme looks stunning on iPhone! Users will love it.', '2025-12-02 14:20:00', '2025-12-02 14:20:00'),
  (14, 'user-5', 'Load testing with 10k concurrent users. Response time under 200ms!', '2025-04-20 11:30:00', '2025-04-20 11:30:00'),
  (15, 'user-8', 'Push notification service configured. Testing with FCM.', '2025-05-15 10:00:00', '2025-05-15 10:00:00'),
  (15, 'user-9', 'Notification segmentation by user preferences completed.', '2025-06-16 13:45:00', '2025-06-16 13:45:00'),
  (16, 'user-10', 'Apple and Google payment APIs integrated successfully.', '2025-05-30 15:45:00', '2025-05-30 15:45:00'),
  (16, 'user-5', 'Subscription management with auto-renewal working great!', '2025-08-26 11:15:00', '2025-08-26 11:15:00'),
  (17, 'user-3', 'Facebook, Twitter, Instagram sharing implemented.', '2025-12-12 10:30:00', '2025-12-12 10:30:00'),
  (18, 'user-5', 'Fingerprint authentication fallback working for older devices.', '2025-07-12 14:00:00', '2025-07-12 14:00:00'),
  (19, 'user-8', 'Google Analytics and Mixpanel integrated. Tracking 50+ events.', '2025-07-28 15:30:00', '2025-07-28 15:30:00'),
  (20, 'user-9', 'Offline data sync with conflict resolution working perfectly!', '2025-08-20 13:45:00', '2025-08-20 13:45:00'),
  
  -- Database Migration comments (Project 3)
  (21, 'user-1', 'Critical project! All hands on deck for this migration.', '2022-11-22 09:00:00', '2022-11-22 09:00:00'),
  (21, 'user-4', 'Full backup created and stored in S3. Verified integrity checks passed.', '2023-03-05 11:30:00', '2023-03-05 11:30:00'),
  (21, 'user-11', 'Created backup on 3 different locations for redundancy.', '2023-03-06 10:00:00', '2023-03-06 10:00:00'),
  (22, 'user-4', 'Schema design reviewed with DBA team. Ready for approval.', '2023-05-10 14:15:00', '2023-05-10 14:15:00'),
  (22, 'user-1', 'Schema approved. Proceed with development.', '2023-05-11 09:30:00', '2023-05-11 09:30:00'),
  (23, 'user-11', 'Migration scripts tested in staging environment. No issues found.', '2024-02-20 16:00:00', '2024-02-20 16:00:00'),
  (23, 'user-4', 'Dry run completed successfully. Ready for production migration.', '2024-02-22 11:45:00', '2024-02-22 11:45:00'),
  (24, 'user-11', 'Data validation passed. All records migrated correctly!', '2024-06-25 14:30:00', '2024-06-25 14:30:00'),
  (25, 'user-4', 'Performance benchmarks show 40% improvement over legacy system.', '2024-08-10 11:20:00', '2024-08-10 11:20:00'),
  (25, 'user-11', 'Query response time reduced from 5s to 2s on average. Excellent!', '2024-08-11 15:00:00', '2024-08-11 15:00:00'),
  
  -- API Integration comments (Project 4)
  (26, 'user-5', 'Payment integration with Stripe is in progress. Testing with sandbox account.', '2025-07-10 10:30:00', '2025-07-10 10:30:00'),
  (26, 'user-12', 'Webhook endpoints configured. Waiting for test transactions.', '2025-07-15 14:45:00', '2025-07-15 14:45:00'),
  (26, 'user-1', 'PCI compliance documentation completed. Ready for production!', '2025-09-10 11:20:00', '2025-09-10 11:20:00'),
  (27, 'user-1', 'GA4 setup completed. Tracking all user interactions.', '2025-08-06 15:30:00', '2025-08-06 15:30:00'),
  (28, 'user-13', 'The API is returning 429 status codes intermittently. Need to review rate limiting rules.', '2025-11-25 11:00:00', '2025-11-25 11:00:00'),
  (28, 'user-1', 'Implemented exponential backoff retry logic. Issue should be resolved.', '2025-12-02 15:30:00', '2025-12-02 15:30:00'),
  (29, 'user-12', 'Webhook retry mechanism with dead letter queue implemented.', '2025-12-10 14:15:00', '2025-12-10 14:15:00'),
  (30, 'user-1', 'OAuth 2.0 tested with Google, Facebook, and GitHub. All working!', '2024-05-16 14:30:00', '2024-05-16 14:30:00'),
  (31, 'user-12', 'API documentation portal with Swagger UI looks professional.', '2025-10-26 15:45:00', '2025-10-26 15:45:00'),
  (32, 'user-5', 'API versioning with header-based routing implemented. Very clean!', '2025-11-12 13:20:00', '2025-11-12 13:20:00'),
  (33, 'user-13', 'GraphQL schema with pagination and filtering completed.', '2025-04-26 14:00:00', '2025-04-26 14:00:00'),
  
  -- E-commerce Platform comments (Project 5)
  (34, 'user-6', 'Shopping cart persistence with Redis for better performance.', '2022-07-18 10:00:00', '2022-07-18 10:00:00'),
  (34, 'user-14', 'Shopping cart state management implemented using Redux.', '2022-07-20 11:30:00', '2022-07-20 11:30:00'),
  (34, 'user-8', 'Cart abandonment emails automated. Recovery rate at 25%!', '2022-08-15 14:45:00', '2022-08-15 14:45:00'),
  (35, 'user-7', 'Integrated PayPal, Stripe, and Square payment gateways.', '2023-01-05 14:15:00', '2023-01-05 14:15:00'),
  (35, 'user-8', 'Payment gateway failover logic implemented for high availability.', '2023-01-10 11:00:00', '2023-01-10 11:00:00'),
  (36, 'user-15', 'Search engine optimized with Elasticsearch. Very fast results.', '2023-06-25 16:00:00', '2023-06-25 16:00:00'),
  (36, 'user-14', 'Added faceted search and autocomplete. UX is much better!', '2023-06-26 10:30:00', '2023-06-26 10:30:00'),
  (37, 'user-8', 'Order tracking with SMS and email notifications implemented.', '2024-03-10 14:20:00', '2024-03-10 14:20:00'),
  (38, 'user-15', 'Review moderation system working correctly. Spam detection implemented.', '2024-08-20 11:45:00', '2024-08-20 11:45:00'),
  (38, 'user-7', 'Photo reviews with automatic image compression added.', '2024-08-22 15:10:00', '2024-08-22 15:10:00'),
  (39, 'user-8', 'Real-time inventory sync across 5 warehouses working perfectly!', '2024-12-26 14:30:00', '2024-12-26 14:30:00'),
  
  -- Cloud Infrastructure comments (Project 6)
  (40, 'user-9', 'Setting up AWS Organizations for multi-account structure.', '2023-08-18 09:45:00', '2023-08-18 09:45:00'),
  (40, 'user-16', 'IAM policies configured with principle of least privilege.', '2023-10-10 11:00:00', '2023-10-10 11:00:00'),
  (40, 'user-11', 'MFA enforced for all admin accounts. Security hardened!', '2023-10-11 14:30:00', '2023-10-11 14:30:00'),
  (41, 'user-17', 'Application load balancers configured with health checks.', '2024-01-25 14:30:00', '2024-01-25 14:30:00'),
  (41, 'user-10', 'SSL certificates from ACM auto-renewing. No more manual work!', '2024-01-26 10:15:00', '2024-01-26 10:15:00'),
  (42, 'user-11', 'Auto-scaling policies configured based on CPU and memory metrics.', '2025-10-15 10:15:00', '2025-10-15 10:15:00'),
  (42, 'user-16', 'Testing auto-scaling. Scales up smoothly during load spikes!', '2025-12-12 13:20:00', '2025-12-12 13:20:00'),
  (43, 'user-10', 'CloudWatch dashboards created for real-time monitoring.', '2025-10-25 15:45:00', '2025-10-25 15:45:00'),
  (43, 'user-17', 'Custom metrics and alarms configured for all critical services.', '2025-12-10 11:00:00', '2025-12-10 11:00:00'),
  (44, 'user-11', 'Automated daily backups with 30-day retention configured.', '2025-11-05 10:30:00', '2025-11-05 10:30:00'),
  (45, 'user-17', 'Container registry configured with image scanning enabled.', '2025-11-20 14:20:00', '2025-11-20 14:20:00'),
  (45, 'user-16', 'Vulnerability scanning integrated into CI/CD pipeline.', '2025-12-16 11:45:00', '2025-12-16 11:45:00'),
  (46, 'user-11', 'VPC with public and private subnets across 3 AZs configured.', '2025-12-03 12:00:00', '2025-12-03 12:00:00'),
  (47, 'user-16', 'S3 lifecycle policies moving old data to Glacier automatically.', '2025-10-20 11:35:00', '2025-10-20 11:35:00'),
  (47, 'user-9', 'Intelligent tiering saving us 40% on storage costs!', '2025-12-15 14:50:00', '2025-12-15 14:50:00'),
  (48, 'user-11', 'CloudFront CDN reducing latency by 60%. Great performance!', '2025-12-25 15:50:00', '2025-12-25 15:50:00'),
  (48, 'user-17', 'Edge caching with TTL optimization working perfectly!', '2025-12-26 10:20:00', '2025-12-26 10:20:00'),
  
  -- CRM System comments (Project 7)
  (49, 'user-12', 'Custom fields with validation rules for different contact types.', '2022-07-12 10:00:00', '2022-07-12 10:00:00'),
  (49, 'user-14', 'Custom fields feature implemented with validation rules.', '2023-09-20 10:30:00', '2023-09-20 10:30:00'),
  (49, 'user-15', 'Import/export functionality for contacts working great!', '2023-09-22 14:15:00', '2023-09-22 14:15:00'),
  (50, 'user-18', 'Visual pipeline with drag-and-drop functionality completed.', '2024-02-10 14:15:00', '2024-02-10 14:15:00'),
  (50, 'user-13', 'Deal probability calculation based on stage is very accurate!', '2024-02-12 11:30:00', '2024-02-12 11:30:00'),
  (51, 'user-19', 'Email campaign tracking and analytics integrated with Mailchimp.', '2024-08-25 16:00:00', '2024-08-25 16:00:00'),
  (51, 'user-14', 'A/B testing for email campaigns showing great insights!', '2024-08-27 10:45:00', '2024-08-27 10:45:00'),
  (52, 'user-18', 'Report builder supports complex queries and custom filters.', '2025-12-15 11:20:00', '2025-12-15 11:20:00'),
  (52, 'user-15', 'Scheduled reports with email delivery configured. Awesome!', '2025-12-16 09:30:00', '2025-12-16 09:30:00'),
  (53, 'user-14', 'Mobile app synchronized with web platform. Offline mode working.', '2025-06-10 15:30:00', '2025-06-10 15:30:00'),
  (53, 'user-13', 'GPS check-in for field visits tracking location perfectly!', '2025-07-10 13:45:00', '2025-07-10 13:45:00'),
  (54, 'user-15', 'Workflow automation reducing manual data entry by 60%!', '2025-12-03 14:20:00', '2025-12-03 14:20:00'),
  (54, 'user-19', 'Lead assignment rules with round-robin working smoothly.', '2025-12-04 10:15:00', '2025-12-04 10:15:00'),
  
  -- Data Analytics comments (Project 8)
  (55, 'user-16', 'Setting up Apache Kafka for real-time event streaming.', '2024-02-12 09:30:00', '2024-02-12 09:30:00'),
  (55, 'user-17', 'Real-time data pipeline processing 10k events per second.', '2024-08-25 11:00:00', '2024-08-25 11:00:00'),
  (56, 'user-17', 'D3.js charts look amazing. Interactive features working smoothly.', '2025-12-12 14:30:00', '2025-12-12 14:30:00'),
  (56, 'user-16', 'Added drill-down capability. Users can explore data in depth!', '2025-12-13 10:45:00', '2025-12-13 10:45:00'),
  (57, 'user-17', 'Drag-and-drop report builder intuitive and powerful!', '2025-12-08 15:20:00', '2025-12-08 15:20:00'),
  (58, 'user-17', 'Export functionality supports large datasets up to 1M rows.', '2025-08-15 16:15:00', '2025-08-15 16:15:00'),
  (58, 'user-16', 'Scheduled exports with email delivery working perfectly!', '2025-09-13 11:30:00', '2025-09-13 11:30:00'),
  
  -- Security Audit comments (Project 9)
  (59, 'user-1', 'Security is critical. Let''s build a comprehensive audit platform.', '2023-10-12 09:00:00', '2023-10-12 09:00:00'),
  (59, 'user-11', 'Vulnerability scanner detecting OWASP Top 10 issues accurately.', '2024-06-25 10:30:00', '2024-06-25 10:30:00'),
  (59, 'user-5', 'Integrated with CVE database for up-to-date vulnerability info.', '2024-06-26 14:15:00', '2024-06-26 14:15:00'),
  (60, 'user-13', 'Compliance reports generated for SOC2, HIPAA, and GDPR.', '2024-07-20 14:15:00', '2024-07-20 14:15:00'),
  (60, 'user-7', 'Automated compliance checking saves hours of manual work!', '2024-12-10 11:30:00', '2024-12-10 11:30:00'),
  (61, 'user-18', 'Penetration testing module simulating real-world attack scenarios.', '2025-12-15 11:45:00', '2025-12-15 11:45:00'),
  (61, 'user-5', 'SQL injection and XSS detection working flawlessly!', '2025-12-16 10:20:00', '2025-12-16 10:20:00'),
  (62, 'user-13', 'Security dashboard showing metrics in real-time with alerts.', '2025-03-10 16:00:00', '2025-03-10 16:00:00'),
  (62, 'user-11', 'Custom widgets for different security metrics. Very flexible!', '2025-05-10 13:45:00', '2025-05-10 13:45:00'),
  (63, 'user-18', 'Incident response workflows automated with notification system.', '2025-08-25 10:15:00', '2025-08-25 10:15:00'),
  (63, 'user-7', 'Mean time to respond (MTTR) reduced by 50%!', '2025-09-26 14:30:00', '2025-09-26 14:30:00'),
  (64, 'user-5', 'Custom security policies with rule engine implemented.', '2025-12-13 11:00:00', '2025-12-13 11:00:00'),
  
  -- DevOps Automation comments (Project 10)
  (65, 'user-4', 'Setting up Jenkins with Blue Ocean UI. Much better experience!', '2022-03-22 09:30:00', '2022-03-22 09:30:00'),
  (65, 'user-10', 'Jenkins pipelines configured for all microservices.', '2022-08-25 11:00:00', '2022-08-25 11:00:00'),
  (65, 'user-9', 'Automated deployment to staging and production working!', '2022-08-26 14:15:00', '2022-08-26 14:15:00'),
  (66, 'user-20', 'Docker images optimized. Build time reduced by 60%.', '2023-02-10 14:30:00', '2023-02-10 14:30:00'),
  (66, 'user-9', 'Multi-stage builds reducing image size significantly!', '2023-02-12 11:00:00', '2023-02-12 11:00:00'),
  (67, 'user-20', 'Terraform modules created for all infrastructure components.', '2023-08-25 16:15:00', '2023-08-25 16:15:00'),
  (67, 'user-10', 'Infrastructure provisioning automated. Deployment time cut in half!', '2023-08-26 13:30:00', '2023-08-26 13:30:00'),
  (68, 'user-9', 'Quality gates configured with code coverage minimum 80%.', '2024-03-10 11:45:00', '2024-03-10 11:45:00'),
  (68, 'user-10', 'SonarQube integration catching bugs early in development!', '2024-03-11 15:20:00', '2024-03-11 15:20:00'),
  (69, 'user-20', 'Blue-green deployment strategy with automatic rollback ready.', '2024-09-25 13:00:00', '2024-09-25 13:00:00'),
  (69, 'user-4', 'Zero-downtime deployments now possible. Game changer!', '2024-09-26 10:45:00', '2024-09-26 10:45:00'),
  
  -- AI Chatbot comments (Project 11)
  (70, 'user-2', 'Let''s train the model with diverse conversation samples.', '2024-06-22 09:30:00', '2024-06-22 09:30:00'),
  (70, 'user-19', 'NLP model trained with 50k conversation samples. Accuracy at 92%.', '2024-10-25 10:30:00', '2024-10-25 10:30:00'),
  (70, 'user-8', 'Intent classification working great. Context handling improved!', '2024-10-26 14:15:00', '2024-10-26 14:15:00'),
  (71, 'user-8', 'Chatbot UI designed with accessibility features included.', '2025-12-15 14:15:00', '2025-12-15 14:15:00'),
  (71, 'user-19', 'Added typing indicators and smooth animations. Feels natural!', '2025-12-16 11:30:00', '2025-12-16 11:30:00'),
  (72, 'user-8', 'Knowledge base integrated. Chatbot can answer 1000+ FAQs.', '2025-10-05 16:00:00', '2025-10-05 16:00:00'),
  (72, 'user-2', 'Vector similarity search for FAQ matching working excellently!', '2025-12-10 13:45:00', '2025-12-10 13:45:00'),
  (73, 'user-19', 'Supporting English, Spanish, French, and German languages.', '2025-11-15 14:30:00', '2025-11-15 14:30:00'),
  (73, 'user-8', 'Language detection automatic. Seamless switching between languages!', '2025-12-03 10:15:00', '2025-12-03 10:15:00'),
  
  -- Microservices Architecture comments (Project 12)
  (74, 'user-5', 'Breaking down monolith. Identified 12 core services.', '2023-05-12 09:30:00', '2023-05-12 09:30:00'),
  (74, 'user-12', 'Service decomposition plan reviewed and approved by architecture team.', '2023-08-10 11:20:00', '2023-08-10 11:20:00'),
  (74, 'user-6', 'Domain-driven design approach working well for service boundaries.', '2023-08-11 14:45:00', '2023-08-11 14:45:00'),
  (75, 'user-15', 'API Gateway handling 5000 req/sec with sub-50ms latency.', '2024-01-25 14:45:00', '2024-01-25 14:45:00'),
  (75, 'user-6', 'Rate limiting and request throttling configured per client.', '2024-01-26 11:30:00', '2024-01-26 11:30:00'),
  (76, 'user-20', 'Consul service discovery configured for all microservices.', '2024-06-10 16:30:00', '2024-06-10 16:30:00'),
  (76, 'user-12', 'Health checks and automatic deregistration working perfectly!', '2024-06-11 13:15:00', '2024-06-11 13:15:00'),
  (77, 'user-20', 'Distributed tracing implemented. Performance bottlenecks identified.', '2025-12-15 10:15:00', '2025-12-15 10:15:00'),
  (77, 'user-15', 'Jaeger UI makes debugging distributed systems so much easier!', '2025-12-16 14:30:00', '2025-12-16 14:30:00'),
  (78, 'user-12', 'Event-driven architecture using Kafka. Message throughput excellent.', '2025-04-10 15:00:00', '2025-04-10 15:00:00'),
  (78, 'user-6', 'Event sourcing pattern implemented for audit trail. Very powerful!', '2025-08-10 11:45:00', '2025-08-10 11:45:00'),
  (79, 'user-15', 'Istio service mesh with mTLS between services secured!', '2025-12-08 13:20:00', '2025-12-08 13:20:00'),
  
  -- Inventory Management comments (Project 13)
  (80, 'user-7', 'Integrating handheld barcode scanners with the system.', '2024-08-27 09:30:00', '2024-08-27 09:30:00'),
  (80, 'user-14', 'Barcode scanner integrated with mobile devices. Testing completed.', '2024-11-25 11:30:00', '2024-11-25 11:30:00'),
  (80, 'user-11', '2D barcodes (QR codes) support added. Very versatile!', '2024-11-26 14:15:00', '2024-11-26 14:15:00'),
  (81, 'user-18', 'Real-time stock monitoring with automatic low-stock alerts configured.', '2025-08-15 14:45:00', '2025-08-15 14:45:00'),
  (81, 'user-11', 'Predictive low-stock alerts using ML. Accuracy at 85%!', '2025-12-16 11:30:00', '2025-12-16 11:30:00'),
  (82, 'user-18', 'Supplier management with automated purchase order generation working.', '2025-09-25 16:20:00', '2025-09-25 16:20:00'),
  (82, 'user-14', 'Supplier performance metrics helping with vendor selection!', '2025-11-10 13:45:00', '2025-11-10 13:45:00'),
  (83, 'user-11', 'AI forecasting model trained with 2 years of historical data.', '2025-10-12 14:30:00', '2025-10-12 14:30:00'),
  (83, 'user-7', 'Forecasting accuracy improved from 70% to 88%. Impressive!', '2025-12-13 10:15:00', '2025-12-13 10:15:00'),
  (84, 'user-14', 'Multi-warehouse inventory sync is working smoothly across locations.', '2025-10-30 11:15:00', '2025-10-30 11:15:00'),
  (84, 'user-18', 'Inter-warehouse transfer requests automated. Saves time!', '2025-12-17 15:30:00', '2025-12-17 15:30:00'),
  
  -- Enterprise Resource Planning comments (Project 14 - 85 to 137 tasks)
  -- Financial Module Design (Task 85)
  (85, 'user-1', 'Kicked off ERP project! Financial module is our foundation. Let''s make it robust.', '2025-01-03 09:30:00', '2025-01-03 09:30:00'),
  (85, 'user-4', 'Financial module architecture reviewed. Using microservices pattern for scalability.', '2025-01-10 10:30:00', '2025-01-10 10:30:00'),
  (85, 'user-8', 'Working on GL structure. Should we support multi-currency from day one?', '2025-01-15 14:15:00', '2025-01-15 14:15:00'),
  (85, 'user-1', 'Yes, multi-currency is critical for our global expansion plans.', '2025-01-16 09:00:00', '2025-01-16 09:00:00'),
  (85, 'user-4', 'Financial module completed! GL, AP, AR all integrated. Ready for UAT.', '2025-02-25 14:30:00', '2025-02-25 14:30:00'),
  
  -- Human Resources Module (Task 86)
  (86, 'user-12', 'Starting HR module. What are the priority features for payroll?', '2025-01-06 11:00:00', '2025-01-06 11:00:00'),
  (86, 'user-1', 'Tax calculation, benefits tracking, and direct deposit are must-haves.', '2025-01-07 08:30:00', '2025-01-07 08:30:00'),
  (86, 'user-4', 'HR module with full payroll system completed. Compliance checks passed!', '2025-03-12 16:20:00', '2025-03-12 16:20:00'),
  (86, 'user-8', 'Tested payroll for 500 employees. Performance is excellent!', '2025-03-13 10:45:00', '2025-03-13 10:45:00'),
  
  -- Chart of Accounts Setup (Task 87)
  (87, 'user-8', 'Setting up COA. Should we follow IFRS or GAAP standards?', '2025-01-08 11:30:00', '2025-01-08 11:30:00'),
  (87, 'user-1', 'Let''s go with IFRS for international compatibility.', '2025-01-08 14:00:00', '2025-01-08 14:00:00'),
  (87, 'user-4', 'COA structure approved by CFO. Moving to implementation.', '2025-02-12 13:45:00', '2025-02-12 13:45:00'),
  
  -- User Access Control (Task 88)
  (88, 'user-10', 'Implementing RBAC. How many roles should we support initially?', '2025-01-11 10:00:00', '2025-01-11 10:00:00'),
  (88, 'user-1', 'Start with 10-12 standard roles, but make it extensible.', '2025-01-11 11:30:00', '2025-01-11 11:30:00'),
  (88, 'user-4', 'RBAC system complete with granular permissions. Very flexible!', '2025-02-18 15:10:00', '2025-02-18 15:10:00'),
  
  -- Database Schema Design (Task 89)
  (89, 'user-4', 'Database schema design in progress. Planning for 10M+ transactions/year.', '2025-01-16 13:30:00', '2025-01-16 13:30:00'),
  (89, 'user-16', 'Added partitioning strategy for large tables. Should improve performance.', '2025-01-25 10:00:00', '2025-01-25 10:00:00'),
  (89, 'user-1', 'Schema looks solid. DBA team approved the design.', '2025-02-08 11:25:00', '2025-02-08 11:25:00'),
  
  -- System Architecture Planning (Task 90)
  (90, 'user-8', 'Proposing event-driven architecture for better scalability. Thoughts?', '2025-01-19 11:00:00', '2025-01-19 11:00:00'),
  (90, 'user-1', 'Good idea! Will help with future integrations too.', '2025-01-20 09:15:00', '2025-01-20 09:15:00'),
  (90, 'user-4', 'Architecture finalized. Using Kafka for event streaming.', '2025-02-03 14:15:00', '2025-02-03 14:15:00'),
  
  -- API Design Documentation (Task 91)
  (91, 'user-10', 'Creating OpenAPI specs for all ERP modules. Following REST best practices.', '2025-01-23 12:00:00', '2025-01-23 12:00:00'),
  (91, 'user-4', 'API documentation complete with examples and sandbox environment.', '2025-02-28 16:30:00', '2025-02-28 16:30:00'),
  
  -- Inventory Control System (Task 92)
  (92, 'user-12', 'Inventory module starting. Need to support FIFO, LIFO, and weighted average.', '2025-02-03 11:30:00', '2025-02-03 11:30:00'),
  (92, 'user-4', 'All three costing methods implemented. Multi-warehouse support added.', '2025-03-28 13:45:00', '2025-03-28 13:45:00'),
  (92, 'user-8', 'Tested with 50K SKUs. System handles it smoothly!', '2025-03-29 10:20:00', '2025-03-29 10:20:00'),
  
  -- Purchase Order Module (Task 93)
  (93, 'user-16', 'PO module with 3-tier approval workflow implemented.', '2025-02-08 10:00:00', '2025-02-08 10:00:00'),
  (93, 'user-4', 'Added vendor rating system. Helps with procurement decisions.', '2025-04-12 15:10:00', '2025-04-12 15:10:00'),
  
  -- Accounts Payable Module (Task 94)
  (94, 'user-4', 'AP module with invoice matching (2-way and 3-way) completed.', '2025-02-10 13:30:00', '2025-02-10 13:30:00'),
  (94, 'user-8', 'Automatic payment scheduling working great. Reduces manual effort significantly.', '2025-03-18 11:25:00', '2025-03-18 11:25:00'),
  
  -- General Ledger Implementation (Task 95)
  (95, 'user-8', 'GL module with automated journal entries from all sub-ledgers ready.', '2025-02-15 10:45:00', '2025-02-15 10:45:00'),
  (95, 'user-10', 'Period-end closing procedures automated. Will save hours every month!', '2025-03-23 14:15:00', '2025-03-23 14:15:00'),
  
  -- Budget Management Module (Task 96)
  (96, 'user-10', 'Budget vs actual variance reports with drill-down capability completed.', '2025-02-18 12:00:00', '2025-02-18 12:00:00'),
  (96, 'user-1', 'Great work! CFO will love the real-time budget monitoring.', '2025-04-08 16:30:00', '2025-04-08 16:30:00'),
  
  -- Cost Center Management (Task 97)
  (97, 'user-12', 'Cost allocation rules configured for all departments.', '2025-02-22 09:30:00', '2025-02-22 09:30:00'),
  (97, 'user-4', 'Cross-charging between cost centers working correctly.', '2025-03-29 13:20:00', '2025-03-29 13:20:00'),
  
  -- Fixed Assets Module (Task 98)
  (98, 'user-16', 'Asset depreciation supporting straight-line, declining balance, and sum-of-years.', '2025-02-26 14:45:00', '2025-02-26 14:45:00'),
  (98, 'user-1', 'Asset disposal and transfer workflows look good. Ready to deploy.', '2025-04-18 11:45:00', '2025-04-18 11:45:00'),
  
  -- Multi-Company Support (Task 99)
  (99, 'user-8', 'Inter-company transactions and eliminations implemented.', '2025-03-01 10:30:00', '2025-03-01 10:30:00'),
  (99, 'user-4', 'Consolidated financial statements generation working perfectly!', '2025-04-28 15:50:00', '2025-04-28 15:50:00'),
  
  -- Sales Order Processing (Task 100)
  (100, 'user-8', 'SO module with pricing rules and discount management completed.', '2025-03-05 13:30:00', '2025-03-05 13:30:00'),
  (100, 'user-10', 'Integrated with inventory. Real-time ATP (Available to Promise) working.', '2025-05-27 11:25:00', '2025-05-27 11:25:00'),
  
  -- Production Planning (Task 101)
  (101, 'user-10', 'MRP calculations considering lead times and safety stock.', '2025-03-10 11:00:00', '2025-03-10 11:00:00'),
  (101, 'user-12', 'Production scheduling with finite capacity planning ready.', '2025-04-28 14:15:00', '2025-04-28 14:15:00'),
  
  -- Accounts Receivable Module (Task 102)
  (102, 'user-16', 'AR aging reports with automatic dunning letters configured.', '2025-03-15 12:00:00', '2025-03-15 12:00:00'),
  (102, 'user-4', 'Cash application with auto-matching working excellently!', '2025-05-13 16:30:00', '2025-05-13 16:30:00'),
  
  -- Customer Credit Management (Task 103)
  (103, 'user-4', 'Credit limit checks integrated with sales order processing.', '2025-03-20 09:30:00', '2025-03-20 09:30:00'),
  (103, 'user-8', 'Credit scoring model based on payment history implemented.', '2025-05-18 13:20:00', '2025-05-18 13:20:00'),
  
  -- Invoice Generation System (Task 104)
  (104, 'user-12', 'Automated invoice generation from SO, contracts, and time sheets.', '2025-03-25 14:45:00', '2025-03-25 14:45:00'),
  (104, 'user-16', 'E-invoicing compliance for multiple countries added.', '2025-05-23 11:45:00', '2025-05-23 11:45:00'),
  
  -- Payment Gateway Integration (Task 105)
  (105, 'user-8', 'Integrated Stripe, PayPal, and Square. Testing in sandbox.', '2025-03-29 10:45:00', '2025-03-29 10:45:00'),
  (105, 'user-10', 'PCI DSS compliance validated. Ready for production!', '2025-06-08 15:50:00', '2025-06-08 15:50:00'),
  
  -- Quality Management (Task 106)
  (106, 'user-4', 'QC inspection checklists with photo attachments implemented.', '2025-04-12 12:00:00', '2025-04-12 12:00:00'),
  (106, 'user-10', 'Non-conformance tracking with CAPA workflow ready.', '2025-06-12 16:30:00', '2025-06-12 16:30:00'),
  
  -- Bill of Materials Module (Task 107)
  (107, 'user-8', 'BOM with multi-level explosion and implosion queries working.', '2025-04-26 09:45:00', '2025-04-26 09:45:00'),
  (107, 'user-12', 'Engineering change orders (ECO) workflow integrated.', '2025-06-18 14:15:00', '2025-06-18 14:15:00'),
  
  -- Supply Chain Dashboard (Task 108)
  (108, 'user-12', 'Real-time supply chain visibility across procurement, production, and delivery.', '2025-05-08 09:45:00', '2025-05-08 09:45:00'),
  (108, 'user-16', 'KPI widgets showing on-time delivery, fill rate, and inventory turns. Awesome!', '2025-07-27 13:20:00', '2025-07-27 13:20:00'),
  
  -- Asset Management (Task 109)
  (109, 'user-16', 'Asset maintenance schedules with predictive maintenance alerts added.', '2025-05-15 14:30:00', '2025-05-15 14:30:00'),
  (109, 'user-12', 'IoT sensor integration for real-time asset monitoring works great!', '2025-06-28 11:45:00', '2025-06-28 11:45:00'),
  
  -- Warehouse Management System (Task 110)
  (110, 'user-10', 'WMS with bin location tracking and wave picking completed.', '2025-05-20 11:30:00', '2025-05-20 11:30:00'),
  (110, 'user-12', 'Integrated with handheld scanners. Warehouse efficiency up 40%!', '2025-07-13 15:10:00', '2025-07-13 15:10:00'),
  
  -- Shipping and Logistics (Task 111)
  (111, 'user-16', 'Carrier integration (FedEx, UPS, DHL) with rate shopping done.', '2025-05-25 11:45:00', '2025-05-25 11:45:00'),
  (111, 'user-4', 'Automated tracking updates and delivery notifications working.', '2025-07-18 14:25:00', '2025-07-18 14:25:00'),
  
  -- Barcode and RFID Integration (Task 112)
  (112, 'user-8', 'Barcode scanning and RFID tag reading integrated across all modules.', '2025-05-29 14:00:00', '2025-05-29 14:00:00'),
  (112, 'user-10', 'Real-time inventory updates. Accuracy improved from 85% to 99%!', '2025-07-23 16:15:00', '2025-07-23 16:15:00'),
  
  -- Business Intelligence (Task 113)
  (113, 'user-10', 'BI dashboards with 50+ pre-built reports for all modules.', '2025-06-10 10:45:00', '2025-06-10 10:45:00'),
  (113, 'user-8', 'Ad-hoc query builder allows users to create custom reports. Very powerful!', '2025-08-12 15:10:00', '2025-08-12 15:10:00'),
  
  -- Project Management Module (Task 114)
  (114, 'user-12', 'Project tracking with Gantt charts, resource allocation, and time tracking.', '2025-06-18 11:30:00', '2025-06-18 11:30:00'),
  (114, 'user-10', 'Earned value analysis for project performance measurement added.', '2025-08-28 14:25:00', '2025-08-28 14:25:00'),
  
  -- Time Tracking System (Task 115)
  (115, 'user-16', 'Employee time tracking with mobile check-in/out using geofencing.', '2025-06-27 14:00:00', '2025-06-27 14:00:00'),
  (115, 'user-4', 'Overtime calculations and leave management integrated with payroll.', '2025-08-18 16:15:00', '2025-08-18 16:15:00'),
  
  -- Document Management (Task 116)
  (116, 'user-10', 'Document repository with version control and access permissions ready.', '2025-07-08 14:00:00', '2025-07-08 14:00:00'),
  (116, 'user-12', 'OCR for invoice scanning and automatic data extraction working amazingly!', '2025-09-27 16:15:00', '2025-09-27 16:15:00'),
  
  -- Email Integration (Task 117)
  (117, 'user-8', 'Email integration for sending POs, invoices, and reports configured.', '2025-07-14 09:30:00', '2025-07-14 09:30:00'),
  (117, 'user-12', 'Email templates customizable per document type. Very flexible!', '2025-09-13 11:30:00', '2025-09-13 11:30:00'),
  
  -- Report Designer Tool (Task 118)
  (118, 'user-16', 'Drag-and-drop report designer with live preview implemented.', '2025-07-20 10:45:00', '2025-07-20 10:45:00'),
  (118, 'user-10', 'Users can now create custom reports without IT help. Game changer!', '2025-09-18 14:45:00', '2025-09-18 14:45:00'),
  
  -- Data Import/Export Tools (Task 119)
  (119, 'user-12', 'Bulk data import with validation and error handling completed.', '2025-07-27 11:30:00', '2025-07-27 11:30:00'),
  (119, 'user-4', 'Export to Excel, CSV, PDF, and XML formats supported.', '2025-09-23 13:20:00', '2025-09-23 13:20:00'),
  
  -- Workflow Automation (Task 120)
  (120, 'user-10', 'Business process automation engine with visual workflow designer.', '2025-08-22 09:45:00', '2025-08-22 09:45:00'),
  (120, 'user-8', 'Conditional routing and parallel approvals working smoothly!', '2025-10-12 11:50:00', '2025-10-12 11:50:00'),
  
  -- Mobile ERP App (Task 121)
  (121, 'user-12', 'Mobile app for iOS and Android with offline support in development.', '2025-09-08 10:30:00', '2025-09-08 10:30:00'),
  (121, 'user-8', 'Field sales team can now access ERP on mobile. Big productivity boost!', '2025-11-27 14:35:00', '2025-11-27 14:35:00'),
  
  -- Offline Mode Support (Task 122)
  (122, 'user-16', 'Offline data sync with conflict resolution implemented.', '2025-09-15 11:45:00', '2025-09-15 11:45:00'),
  (122, 'user-10', 'Tested in areas with no connectivity. Sync works perfectly when back online!', '2025-11-13 15:20:00', '2025-11-13 15:20:00'),
  
  -- Mobile Approvals (Task 123)
  (123, 'user-4', 'Mobile approval workflows with push notifications ready.', '2025-09-20 10:00:00', '2025-09-20 10:00:00'),
  (123, 'user-16', 'Managers can now approve POs, expense reports on the go. Very convenient!', '2025-11-18 13:10:00', '2025-11-18 13:10:00'),
  
  -- Geolocation Features (Task 124)
  (124, 'user-8', 'GPS tracking for field service and delivery personnel implemented.', '2025-09-24 14:30:00', '2025-09-24 14:30:00'),
  (124, 'user-12', 'Route optimization using real-time location data works great!', '2025-11-23 16:40:00', '2025-11-23 16:40:00'),
  
  -- Mobile Dashboard (Task 125)
  (125, 'user-10', 'Mobile-optimized dashboard with key metrics and alerts.', '2025-09-30 10:45:00', '2025-09-30 10:45:00'),
  (125, 'user-16', 'Touch-friendly UI with swipe gestures. Users love it!', '2025-12-03 11:50:00', '2025-12-03 11:50:00'),
  
  -- Multi-currency Support (Task 126)
  (126, 'user-12', 'Supporting 150+ currencies with automatic exchange rate updates.', '2025-10-10 12:00:00', '2025-10-10 12:00:00'),
  (126, 'user-16', 'Currency translation for consolidated reporting ready.', '2025-10-28 15:20:00', '2025-10-28 15:20:00'),
  
  -- Exchange Rate Management (Task 127)
  (127, 'user-16', 'Integration with multiple FX rate providers for redundancy.', '2025-10-24 10:15:00', '2025-10-24 10:15:00'),
  (127, 'user-4', 'Historical rate tracking for revaluation and audit purposes done.', '2025-11-03 13:35:00', '2025-11-03 13:35:00'),
  
  -- API Integration Layer (Task 128)
  (128, 'user-4', 'REST API with OAuth 2.0 authentication completed.', '2025-11-08 13:30:00', '2025-11-08 13:30:00'),
  (128, 'user-12', 'API rate limiting and throttling configured for security.', '2025-12-12 11:40:00', '2025-12-12 11:40:00'),
  (128, 'user-1', 'API documentation looks comprehensive. Third-party integrations will be easy!', '2025-12-13 09:15:00', '2025-12-13 09:15:00'),
  
  -- User Permissions System (Task 129)
  (129, 'user-8', 'Granular permissions at field and record level implemented.', '2025-11-14 10:00:00', '2025-11-14 10:00:00'),
  (129, 'user-16', 'Data access rules based on organizational hierarchy working correctly.', '2025-12-18 16:25:00', '2025-12-18 16:25:00'),
  
  -- Audit Trail Module (Task 130)
  (130, 'user-10', 'Comprehensive audit logging for all data changes.', '2025-11-20 10:45:00', '2025-11-20 10:45:00'),
  (130, 'user-4', 'Audit reports showing who changed what and when. Perfect for compliance!', '2025-12-19 13:50:00', '2025-12-19 13:50:00'),
  
  -- Data Security Encryption (Task 131)
  (131, 'user-12', 'End-to-end encryption for sensitive data at rest and in transit.', '2025-11-27 14:45:00', '2025-11-27 14:45:00'),
  (131, 'user-1', 'Security audit passed! We''re ready for SOC 2 certification.', '2025-12-20 10:30:00', '2025-12-20 10:30:00'),
  
  -- Email Notification System (Task 132)
  (132, 'user-16', 'Configurable email notifications for all business events.', '2025-12-04 11:45:00', '2025-12-04 11:45:00'),
  (132, 'user-10', 'Users can customize which notifications they want to receive. Nice feature!', '2025-12-20 15:10:00', '2025-12-20 15:10:00'),
  
  -- Data Migration Tools (Task 133)
  (133, 'user-12', 'Legacy data migration tools with data cleansing and validation ready.', '2025-12-06 14:30:00', '2025-12-06 14:30:00'),
  (133, 'user-4', 'Successfully migrated 5 years of historical data. Zero data loss!', '2025-12-21 09:30:00', '2025-12-21 09:30:00'),
  
  -- System Performance Optimization (Task 134)
  (134, 'user-4', 'Database query optimization reduced response time by 60%.', '2025-12-10 10:00:00', '2025-12-10 10:00:00'),
  (134, 'user-8', 'Implemented Redis caching. System now handles 1000+ concurrent users!', '2025-12-19 14:15:00', '2025-12-19 14:15:00'),
  
  -- User Training Materials (Task 135)
  (135, 'user-10', 'Created video tutorials for all major modules.', '2025-12-14 11:00:00', '2025-12-14 11:00:00'),
  (135, 'user-16', 'User manual with screenshots and step-by-step guides completed.', '2025-12-20 11:20:00', '2025-12-20 11:20:00'),
  (135, 'user-1', 'Training materials look excellent! Ready for user onboarding.', '2025-12-20 15:00:00', '2025-12-20 15:00:00'),
  
  -- Load Testing (Task 136)
  (136, 'user-16', 'Load testing with 5000 concurrent users. System stable!', '2025-12-18 13:45:00', '2025-12-18 13:45:00'),
  (136, 'user-4', 'Stress testing completed. System can handle 3x current load.', '2025-12-20 16:45:00', '2025-12-20 16:45:00'),
  
  -- Security Audit (Task 137)
  (137, 'user-12', 'Penetration testing completed. Only minor issues found and fixed.', '2025-12-21 09:00:00', '2025-12-21 09:00:00'),
  (137, 'user-1', 'Security audit passed with flying colors! ERP system is production-ready!', '2025-12-21 09:15:00', '2025-12-21 09:15:00'),
  (137, 'user-4', '🎉 Amazing team effort! This ERP system will transform our business operations!', '2025-12-21 10:00:00', '2025-12-21 10:00:00'),
  (137, 'user-8', 'Proud of what we''ve accomplished! Best project I''ve worked on!', '2025-12-21 10:30:00', '2025-12-21 10:30:00')
ON CONFLICT DO NOTHING;
