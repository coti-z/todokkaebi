import { ObjectType } from '@nestjs/graphql';
import { TaskType } from '../type/task.type';

@ObjectType()
export class CreateTaskOutput extends TaskType {}
