export const TASK_MUTATIONS = {
  CREATE_TASK: `#graphql
    mutation CreateTask($input: CreateTaskInput!) {
        createTask(input: $input) {
            success
            message
            data {
                id
                title
                taskStatus
                categoryId
                startDate
                endDate
            }
        }
    }
    `,
  UPDATE_TASK: `#graphql
        mutation UpdateTask($input: UpdateTaskInput!) {
            updateTask(input: $input) {
                success
                message
                data {
                    id
                    title
                    taskStatus
                    categoryId
                    startDate
                    endDate
                }
            }
        }
    `,
  DELETE_TASK: `#graphql
        mutation DeleteTask($input: DeleteTaskInput!) {
            deleteTask(input: $input) {
                success
                message
                data {
                    id
                }
            }
        }
    `,
};

export const TASK_QUERIES = {
  QUERY_TASK_BY_ID: `#graphql
        query QueryTaskById($input: QueryTaskByIdInput!) {
            queryTaskById(input: $input) {
                success
                message
                data {
                    id
                    title
                    taskStatus
                    categoryId
                    createdAt
                    updatedAt
                }
            }
        }
    `,
  QUERY_TASKS_BY_CATEGORY_ID: `#graphql
        query QueryTasksByCategoryId($input: QueryTasksByCategoryIdInput!) {
            queryTasksByCategoryId(input: $input) {
                success
                message
                data {
                    tasks {
                        id
                        title
                        taskStatus
                        categoryId
                        createdAt
                        updatedAt
                    }
                }
            }
        }
    `,
};
