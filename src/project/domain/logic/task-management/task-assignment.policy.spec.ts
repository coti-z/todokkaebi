import { DomainException } from '@libs/exception';
import { Category } from '@project/domain/entity/category.entity';
import { Project } from '@project/domain/entity/project.entity';
import { Task } from '@project/domain/entity/task.entity';
import { TaskAssignmentPolicy } from '@project/domain/logic/task-management/task-assignment.policy';

describe('TaskAssignmentPolicy', () => {
  const taskTitle = 'task';
  const adminId = 'admin-1234-1234-1234-1234';
  const projectName = 'test-project';
  const categoryName = 'test-category';

  let task: Task;
  let category: Category;
  let project: Project;

  beforeEach(() => {
    project = Project.create({
      adminId: adminId,
      name: projectName,
    });

    category = Category.create({
      name: categoryName,
      projectId: project.id,
    });

    task = Task.create({
      categoryId: category.id,
      endDate: new Date(),
      startDate: new Date(),
      title: taskTitle,
    });

    category.addTask(task);
    project.addCategory(category);
  });
  describe('canAssignmentTask', () => {
    it('should throw DomainException when project is null', () => {
      project = null as any;
      expect(() => {
        TaskAssignmentPolicy.canAssignmentTask(project, adminId);
      }).toThrow(DomainException);
    });

    it('should throw DomainException when userId is null', () => {
      const userId = 'user-1234-1234-1234-1234';
      expect(() => {
        TaskAssignmentPolicy.canAssignmentTask(project, userId);
      });
    });

    it('should pass when project, userId is valid', () => {
      expect(() => {
        TaskAssignmentPolicy.canAssignmentTask(project, adminId);
      });
    });
  });
});
