import { DomainException, ErrorCode } from '@libs/exception';
import { Category, CreateCategoryProps } from '@project/domain/entity/category.entity';
import { CreateTaskProps, Task } from '@project/domain/entity/task.entity';

describe('Category Entity', () => {
  describe('constructor', () => {
    it('should create category with valid parameters', () => {
      const categoryData: CreateCategoryProps = {
        name: 'category test',
        projectId: '1234-1234-1234-1234',
      };

      const category = Category.create(categoryData);

      expect(category.name).toBe(categoryData.name);
    });

    it('should throw error with invalid parameters', () => {
      expect(() => Category.create(null as any));
    });
  });

  describe('category method', () => {
    let category: Category;
    beforeEach(() => {
      const categoryData: CreateCategoryProps = {
        name: 'category test',
        projectId: '1234-1234-1234-1234',
      };
      category = Category.create(categoryData);
    });
    describe('changeName', () => {
      it('should change category name', () => {
        const changedName = 'category test2';
        category.changeName(changedName);
        expect(changedName).toBe(changedName);
      });

      it('should throw DomainException(BAD_REQUEST) when name is null', () => {
        const changeName = null as any;
        try {
          category.changeName(changeName);
        } catch (error) {
          expect(error).toBeInstanceOf(DomainException);
          expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
        }
      });
    });

    describe('addTask', () => {
      it('should add task in category', () => {
        const taskData: CreateTaskProps = {
          categoryId: category.id,
          endDate: new Date(),
          startDate: new Date(),
          title: 'test',
        };
        const task = Task.create(taskData);

        category.addTask(task);

        expect(category.tasks.length).toBe(1);
      });

      it('should throw DomainException(BAD_REQUEST) when task is null', () => {
        const taskData: CreateTaskProps = {
          categoryId: category.id,
          endDate: new Date(),
          startDate: new Date(),
          title: 'test',
        };
        const task = null as any;

        try {
          category.addTask(task);
        } catch (error) {
          expect(error).toBeInstanceOf(DomainException);
          expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
        }
      });
    });

    describe('removeTask', () => {
      it('should remove task in category', () => {
        const taskData: CreateTaskProps = {
          categoryId: category.id,
          endDate: new Date(),
          startDate: new Date(),
          title: 'test',
        };

        const task = Task.create(taskData);
        category.addTask(task);

        category.removeTask(task.id);
        expect(category.tasks.length).toBe(0);
      });

      it('should throw DomainException(BAD_REQUEST) when taskId is null', () => {
        const taskData: CreateTaskProps = {
          categoryId: category.id,
          endDate: new Date(),
          startDate: new Date(),
          title: 'test',
        };

        const task = Task.create(taskData);
        category.addTask(task);

        try {
          category.removeTask(task.id);
        } catch (error) {
          expect(error).toBeInstanceOf(DomainException);
          expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
        }
      });
    });
  });
});
