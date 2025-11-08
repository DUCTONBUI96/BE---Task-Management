// Export base repository and interface
export { IRepository } from '../interfaces/IRepository';
export { BaseRepository } from './base/BaseRepository';

// Export all repository classes
export { UserRepository } from './UserRepository';
export { ProjectRepository } from './ProjectRepository';
export { TaskRepository } from './TaskRepository';
export { CommentRepository } from './CommentRepository';
export { RoleRepository } from './RoleRepository';
export { TaskStatusRepository } from './TaskStatusRepository';
export { TaskPriorityRepository } from './TaskPriorityRepository';
export { TagRepository } from './TagRepository';

// Import and export singleton instances for easy access
import { UserRepository } from './UserRepository';
import { ProjectRepository } from './ProjectRepository';
import { TaskRepository } from './TaskRepository';
import { CommentRepository } from './CommentRepository';
import { RoleRepository } from './RoleRepository';
import { TaskStatusRepository } from './TaskStatusRepository';
import { TaskPriorityRepository } from './TaskPriorityRepository';
import { TagRepository } from './TagRepository';

export const userRepository = UserRepository.getInstance();
export const projectRepository = ProjectRepository.getInstance();
export const taskRepository = TaskRepository.getInstance();
export const commentRepository = CommentRepository.getInstance();
export const roleRepository = RoleRepository.getInstance();
export const taskStatusRepository = TaskStatusRepository.getInstance();
export const taskPriorityRepository = TaskPriorityRepository.getInstance();
export const tagRepository = TagRepository.getInstance();
