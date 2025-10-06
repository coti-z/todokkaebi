import { CreateTaskProps, Task } from '@project/domain/entity/task.entity';
import { TaskState } from '@project/domain/value-objects/task-states.vo';

describe('Task Entity', () => {
  describe('constructor', () => {
    it('constructor', async () => {
      const createTaskProps: CreateTaskProps = {
        categoryId: 'category-id',
        endDate: new Date(),
        startDate: new Date(),
        title: 'testTitle',
      };

      const task = Task.create(createTaskProps);

      expect(task.endDate).toBe(createTaskProps.endDate);
      expect(task.startDate).toBe(createTaskProps.startDate);
      expect(task.categoryId).toBe(createTaskProps.categoryId);
      expect(task.title).toBe(createTaskProps.title);
    });
  });

  describe('method', () => {
    let task: Task;
    beforeEach(() => {
      const createTaskProps: CreateTaskProps = {
        categoryId: 'category-id-123',
        endDate: new Date(),
        startDate: new Date(),
        title: 'testTitle',
      };

      task = Task.create(createTaskProps);
    });
    it('markAsPending', () => {
      task.markAsCompleted();
      task.markAsPending();

      expect(task.taskStatus).toBe(TaskState.PENDING);
    });

    it('markAsComplete', () => {
      task.markAsCompleted();
      expect(task.taskStatus).toBe(TaskState.COMPLETE);
    });

    it('markAsInProgress', () => {
      task.markAsInProgress();
      expect(task.taskStatus).toBe(TaskState.IN_PROGRESS);
    });

    it('changeCategory', () => {
      const changedCategoryId = 'change-category-id-456';
      task.changeCategory(changedCategoryId);

      expect(task.categoryId).toBe(changedCategoryId);
    });

    it('reschedule', () => {
      const changedStartDate = new Date('1999-01-01');
      const changedEndDate = new Date('1999-02-05');

      task.reschedule(changedStartDate, changedEndDate);

      expect(task.startDate).toBe(changedStartDate);
      expect(task.endDate).toBe(changedEndDate);
    });
  });
});
