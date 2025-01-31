import { gql } from 'graphql-tag';

export enum TaskQueries {
  QUERY_TASK = 'QUERY_TASK',
  QUERY_TASKS = 'QUERY_TASKS',
}

export enum TaskMutations {
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

export const TaskOperations = {
  [TaskQueries.QUERY_TASK]: gql`
    query QueryTask($input: QueryTaskByIdInput!) {
      queryTaskById(input: $input) {
        status
        success
        message
        data {
          id
          title
          categoryId
          check
          status
          startDate
          endDate
          actualStartDate
          actualEndDate
          createdAt
          updateAt
        }
      }
    }
  `,

  [TaskQueries.QUERY_TASKS]: gql`
    query QueryTasks($input: QueryTasksByCategoryIdInput!) {
      queryTasksByCategoryId(input: $input) {
        status
        success
        message
        data {
          tasks {
            id
            title
            categoryId
            check
            status
            startDate
            endDate
            actualStartDate
            actualEndDate
            createdAt
            updateAt
          }
        }
      }
    }
  `,

  [TaskMutations.CREATE_TASK]: gql`
    mutation CreateTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        status
        success
        message
        data {
          id
          title
          categoryId
          check
          status
          startDate
          endDate
          actualStartDate
          actualEndDate
          createdAt
          updateAt
        }
      }
    }
  `,

  [TaskMutations.UPDATE_TASK]: gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
      updateTask(input: $input) {
        status
        success
        message
        data {
          id
          title
          categoryId
          check
          status
          startDate
          endDate
          actualStartDate
          actualEndDate
          createdAt
          updateAt
        }
      }
    }
  `,

  [TaskMutations.DELETE_TASK]: gql`
    mutation DeleteTask($input: DeleteTaskInput!) {
      deleteTask(input: $input) {
        status
        success
        message
        data {
          id
        }
      }
    }
  `,
};

export interface TaskInputBase {
  id: string;
  title: string;
  categoryId: string;
  check: boolean;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETE';
  startDate: string;
  endDate: string;
  actualStartDate: string;
  actualEndDate: string;
}

export interface CreateTaskVariables {
  input: Pick<TaskInputBase, 'title' | 'categoryId' | 'startDate' | 'endDate'>;
}

export interface UpdateTaskVariables {
  input: Partial<TaskInputBase> & Pick<TaskInputBase, 'id'>;
}

export interface DeleteTaskVariables {
  input: Pick<TaskInputBase, 'id'>;
}

export interface QueryTaskVariables {
  input: Pick<TaskInputBase, 'id'>;
}

export interface QueryTasksVariables {
  input: {
    categoryId?: string;
    status?: TaskInputBase['status'];
  };
}
