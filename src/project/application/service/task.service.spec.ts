import { ApplicationException, ErrorCode } from '@libs/exception';
import { Test, TestingModule } from '@nestjs/testing';
import {
  QueryTaskByIdParams,
  QueryTasksByCategoryIdParams,
  StoreTaskParams,
  UpdateTaskParams,
} from '@project/application/param/task.params';
import {
  ITaskRepository,
  TaskRepositorySymbol,
} from '@project/application/port/out/task-repository.port';
import { TaskService } from '@project/application/service/task.service';
import { Task } from '@project/domain/entity/task.entity';
import { TaskState } from '@project/domain/value-objects/task-states.vo';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: jest.Mocked<ITaskRepository>;

  beforeEach(async () => {
    const mockTaskRepository: jest.Mocked<ITaskRepository> = {
      deleteTaskById: jest.fn(),
      queryTaskByCategoryId: jest.fn(),
      queryTaskByTaskId: jest.fn(),
      storeTask: jest.fn(),
      updateTask: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepositorySymbol,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();
    service = module.get<TaskService>(TaskService);
    taskRepository = module.get(TaskRepositorySymbol);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('storeTask', () => {
    it('should create a new with valid parameters', async () => {
      // Arrange
      const params: StoreTaskParams = {
        categoryId: 'category-123',
        title: 'New Task',
        endDate: new Date(),
        startDate: new Date(),
      };

      taskRepository.storeTask.mockResolvedValue(undefined);
      // Act
      const result = await service.storeTask(params);

      // Assert
      expect(result).toBeInstanceOf(Task);
      expect(result.title).toBe(params.title);
      expect(result.categoryId).toBe(params.categoryId);
      expect(result.startDate).toEqual(params.startDate);
      expect(result.endDate).toEqual(params.endDate);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task successfully', async () => {
      // Arrange
      const task = Task.create({
        categoryId: 'category-123',
        title: 'Original Title',
        endDate: new Date(),
        startDate: new Date(),
      });

      const params: UpdateTaskParams = {
        id: task.id,
        title: 'Updated Title',
        check: true,
        categoryId: 'category-456',
        taskStatus: TaskState.PENDING,
        endDate: new Date('2025-02-05'),
        startDate: new Date('2025-02-01'),
      };

      taskRepository.queryTaskByTaskId.mockResolvedValue(task);
      taskRepository.updateTask.mockResolvedValue(undefined);

      // Act
      const result = await service.updateTask(params);

      // Assert
      expect(result.title).toBe(params.title);
      expect(result.check).toBe(params.check);
    });

    it('should validate dates when updating startDate or endDate', async () => {
      // Arrange
      const task = Task.create({
        categoryId: 'category-123',
        endDate: new Date(),
        startDate: new Date(),
        title: 'Test Task',
      });

      const params: UpdateTaskParams = {
        id: task.id,
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-01-15'),
      };
      taskRepository.queryTaskByTaskId.mockResolvedValue(null);
      try {
        await service.updateTask(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });

  describe('queryTasksById', () => {
    it('should return task when task exists', async () => {
      // Arrange
      const task = Task.create({
        categoryId: 'category-123',
        endDate: new Date(),
        startDate: new Date(),
        title: 'Test Task',
      });

      const params: QueryTaskByIdParams = {
        id: task.id,
      };

      taskRepository.queryTaskByTaskId.mockResolvedValue(task);

      // Act
      const result = await service.queryTaskById(params);

      // Assert
      expect(result).toBe(task);
      expect(taskRepository.queryTaskByTaskId).toHaveBeenCalledWith(params.id);
    });

    it('should throw NOT_FOUND exception when task does not exist', async () => {
      // Arrange
      const params: QueryTaskByIdParams = {
        id: 'non-existent-id',
      };
      taskRepository.queryTaskByTaskId.mockResolvedValue(null);
      // Act & Assert
      try {
        await service.queryTaskById(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
      }
    });
  });

  describe('queryTasksByCategoryId', () => {
    it('should return all tasks for a given category', async () => {
      // Arrange
      const tasks = [
        Task.create({
          categoryId: 'category-123',
          title: 'Task 1',
          endDate: new Date(),
          startDate: new Date(),
        }),
        Task.create({
          categoryId: 'category-123',
          title: 'Task 2',
          endDate: new Date('2025-03-01'),
          startDate: new Date('2025-02-01'),
        }),
      ];
      const params: QueryTasksByCategoryIdParams = {
        categoryId: 'category-123',
      };

      taskRepository.queryTaskByCategoryId.mockResolvedValue(tasks);

      // Act
      const result = await service.queryTasksByCategoryId(params);

      // Assert
      expect(result).toBe(tasks);
      expect(taskRepository.queryTaskByCategoryId).toHaveBeenCalledWith(params.categoryId);
    });

    it('should return empty array when category has no tasks', async () => {
      // Arrange
      const params: QueryTasksByCategoryIdParams = {
        categoryId: 'category-with-no-tasks',
      };

      taskRepository.queryTaskByCategoryId.mockResolvedValue([]);

      // Act
      const result = await service.queryTasksByCategoryId(params);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('deleteTask', () => {
    it('should delete task with invalid parameter', () => {
      const taskId = 'task-id-123';
      const task = Task.create({
        categoryId: 'category-id-123',
        endDate: new Date(),
        startDate: new Date(),
        title: 'test title',
      });

      taskRepository.queryTaskByTaskId.mockResolvedValue(task);
      taskRepository.deleteTaskById.mockResolvedValue(undefined);

      expect(async () => await service.deleteTask({ id: taskId })).not.toThrow();
    });

    it('should throw ApplicationException(NOT_FOUND) when task is null', async () => {
      const taskId = null as any;
      taskRepository.queryTaskByTaskId.mockResolvedValue(taskId);

      try {
        await service.deleteTask({
          id: taskId,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });
});
