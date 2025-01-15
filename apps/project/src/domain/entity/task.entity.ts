import { TaskState } from '../value-objects/task-states.vo';
import { v4 as uuidv4 } from 'uuid';

interface TaskProps {
  title: string;
  categoryId: string;
  check: boolean;
  status: TaskState;
  startDate: Date;
  endDate: Date;
  actualStartDate: Date;
  actualEndDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
export class Task {
  private constructor(
    public readonly id: string,
    private _title: string,
    private _categoryId: string,
    private _check: boolean,
    private _status: TaskState,
    private _startDate: Date,
    private _endDate: Date,
    private _actualStartDate: Date,
    private _actualEndDate: Date,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get title() {
    return this._title;
  }

  get categoryId() {
    return this._categoryId;
  }

  get check() {
    return this._check;
  }

  get status() {
    return this._status;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get actualStartDate() {
    return this._actualStartDate;
  }

  get actualEndDate() {
    return this._actualEndDate;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static create(props: TaskProps): Task {
    const id = uuidv4();
    return new Task(
      id,
      props.title,
      props.categoryId,
      props.check,
      props.status,
      props.startDate,
      props.endDate,
      props.actualStartDate,
      props.actualEndDate,
      props.updatedAt,
      props.createdAt,
    );
  }
}
