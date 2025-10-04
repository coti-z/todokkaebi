import { DomainException } from '@libs/exception';
import { Category } from '@project/domain/entity/category.entity';
import { Project } from '@project/domain/entity/project.entity';
import { Task } from '@project/domain/entity/task.entity';
import { TaskWorkflowPolicy } from '@project/domain/logic/task-management/task-workflow.policy';

describe('TaskWorkflowPolicy', () => {
  let project: Project;
  let category: Category;
  let task: Task;
  const projectName: string = 'testName';
  const categoryName: string = 'categoryName';
  const taskName: string = 'taskName';
  const adminId: string = 'admin-1234-1234-1234-1234';

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
      title: taskName,
    });

    category.addTask(task);
    project.addCategory(category);
  });
  describe('canQueryTask', () => {
    it('should throw DomainException when project is null', () => {
      project = null as any;

      expect(() => TaskWorkflowPolicy.canQuery(project, adminId)).toThrow(DomainException);
    });

    it('should throw DomainException when userId is null', () => {
      const userId = null as any;
      expect(() => TaskWorkflowPolicy.canQuery(project, userId)).toThrow(DomainException);
    });

    it('should pass when project, userId is valid', () => {
      expect(() => TaskWorkflowPolicy.canQuery(project, adminId)).not.toThrow(DomainException);
    });
  });

  describe('canRemove', () => {
    it('should throw DomainException when project is null', () => {
      project = null as any;

      expect(() => TaskWorkflowPolicy.canRemove(project, adminId)).toThrow(DomainException);
    });

    it('should throw DomainException when userId is null', () => {
      const userId = null as any;
      expect(() => TaskWorkflowPolicy.canRemove(project, userId)).toThrow(DomainException);
    });
    it('should pass when project, userId is valid ', () => {
      expect(() => TaskWorkflowPolicy.canRemove(project, adminId)).not.toThrow(DomainException);
    });
  });

  describe('canAdd', () => {
    it('should throw DomainException when project is null', () => {
      project = null as any;

      expect(() => TaskWorkflowPolicy.canAdd(project, adminId)).toThrow(DomainException);
    });

    it('should throw DomainException when userId is null', () => {
      const userId = null as any;
      expect(() => TaskWorkflowPolicy.canAdd(project, userId)).toThrow(DomainException);
    });
    it('should pass when project, userId is valid ', () => {
      expect(() => TaskWorkflowPolicy.canAdd(project, adminId)).not.toThrow(DomainException);
    });
  });
  describe('canChangeStatus', () => {
    it('should throw DomainException when project is null', () => {
      project = null as any;

      expect(() => TaskWorkflowPolicy.canChangeStatus(project, adminId)).toThrow(DomainException);
    });

    it('should throw DomainException when userId is null', () => {
      const userId = null as any;
      expect(() => TaskWorkflowPolicy.canChangeStatus(project, userId)).toThrow(DomainException);
    });
    it('should pass when project, userId is valid ', () => {
      expect(() => TaskWorkflowPolicy.canChangeStatus(project, adminId)).not.toThrow(
        DomainException,
      );
    });
  });
});
