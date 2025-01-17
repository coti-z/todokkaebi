import { TaskState } from '@project/domain/value-objects/task-states.vo';
import { v4 as uuidv4 } from 'uuid';

type TaskImmutableProps = {
  readonly id: string;
  readonly createdAt: Date;
};

type TaskMutableProps = {
  title: string;
  categoryId: string;
  check: boolean;
  status: TaskState;
  startDate: Date;
  endDate: Date;
  actualStartDate: Date;
  actualEndDate?: Date;
  updatedAt: Date;
};
type TaskProps = TaskMutableProps & TaskImmutableProps;

type CreateTaskProps = Omit<
  TaskProps,
  'id' | 'createdAt' | 'updatedAt' | 'actualStartDate' | 'actualEndDate'
>;

export class Task {
  private constructor(private props: TaskProps) {}

  // Getter 예시
  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get check(): boolean {
    return this.props.check;
  }

  get status(): TaskState {
    return this.props.status;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date {
    return this.props.endDate;
  }

  get actualStartDate(): Date {
    return this.props.actualStartDate;
  }

  get actualEndDate(): Date | undefined {
    return this.props.actualEndDate;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(props: CreateTaskProps) {
    const id = uuidv4();
    const now = new Date();

    return new Task({
      id: id,
      title: props.title,
      status: props.status,
      actualStartDate: props.startDate,
      createdAt: now,
      endDate: props.endDate,
      updatedAt: now,
      check: false,
      categoryId: props.categoryId,
      startDate: now,
    });
  }

  static reconstitute(props: TaskProps): Task {
    return new Task({
      id: props.id,
      title: props.title,
      status: props.status,
      actualStartDate: props.actualStartDate,
      actualEndDate: props.actualEndDate,
      updatedAt: props.updatedAt,
      createdAt: props.createdAt,
      startDate: props.startDate,
      endDate: props.endDate,
      categoryId: props.categoryId,
      check: props.check,
    });
  }
}
