import { TaskState } from '@project/domain/value-objects/task-states.vo';
import { v4 as uuidv4 } from 'uuid';
import { pickBy } from 'lodash';
import {
  BaseEntity,
  BaseEntityProps,
} from './abstract/base-entity.abstract.entity';

export type TaskMutableProps = {
  title: string;
  categoryId: string;
  check: boolean;
  taskStatus: TaskState;
  startDate: Date;
  endDate: Date;
  actualStartDate: Date;
  actualEndDate?: Date;
};

/**
 * 영속화할 모든 Task 필드.
 * Immutable + Mutable
 */
type TaskProps = BaseEntityProps & TaskMutableProps;

/**
 * 새 Task를 만들 때 필요한 필드. 기본값으로 처리되는 것은 제외.
 */
type CreateTaskProps = Omit<
  TaskProps,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'actualStartDate'
  | 'actualEndDate'
  | 'taskStatus'
  | 'check'
>;

export class Task extends BaseEntity<TaskProps> {
  private _title: string;
  private _categoryId: string;
  private _check: boolean;
  private _taskStatus: TaskState;
  private _startDate: Date;
  private _endDate: Date;
  private _actualStartDate: Date;
  private _actualEndDate: Date;

  // ----- GETTERS -----

  get title(): string {
    return this._title;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  get check(): boolean {
    return this._check;
  }

  get taskStatus(): TaskState {
    return this._taskStatus;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }

  get actualStartDate(): Date {
    return this._actualStartDate;
  }

  get actualEndDate(): Date | undefined {
    return this._actualEndDate;
  }

  // ----- FACTORY METHODS -----
  /**
   * 새로운 Task 엔티티를 생성한다.
   * @param props CreateTaskProps
   */
  static create(props: CreateTaskProps): Task {
    const now = new Date();
    const id = uuidv4();

    // 도메인 규칙에 따라 기본 상태 부여
    const defaultStatus = TaskState.PENDING;
    const defaultCheck = false;

    // 필요하다면, startDate/endDate Validation 등을 여기에 추가
    Task.validateDates(props.startDate, props.endDate);

    return new Task({
      id,
      title: props.title,
      categoryId: props.categoryId,
      check: defaultCheck,
      taskStatus: defaultStatus,
      startDate: props.startDate,
      endDate: props.endDate,
      actualStartDate: props.startDate, // 실제 시작일이 곧 계획된 시작일과 동일하다는 가정
      actualEndDate: undefined,
      createdAt: now,
      updatedAt: now,
    });
  }

  public update(props: Partial<TaskMutableProps>): void {
    if (props.categoryId) this._categoryId = props.categoryId;
    if (props.actualEndDate) this._actualEndDate = props.actualEndDate;
    if (props.actualStartDate) this._actualStartDate = props.actualStartDate;
    if (props.endDate) this._endDate = props.endDate;
    if (props.startDate) this._startDate = props.startDate;
    if (props.taskStatus) this._taskStatus = props.taskStatus;
    if (props.title) this._title = props.title;
    if (props.check) this._check = props.check;

    if (props.startDate || props.endDate) {
      Task.validateDates(this._startDate, this._endDate);
    }
    this.updateTimestamp();
  }

  /**
   * 이미 존재하는 Task 엔티티를 복원한다(Reconstitution).
   * @param props TaskProps
   */
  static reconstitute(props: TaskProps): Task {
    // 복원 시에도 유효성 검증을 해주면 좋다.
    Task.validateDates(props.startDate, props.endDate);

    return new Task({
      actualStartDate: props.actualStartDate,
      categoryId: props.categoryId,
      check: props.check,
      createdAt: props.createdAt,
      endDate: props.endDate,
      id: props.id,
      startDate: props.startDate,
      taskStatus: props.taskStatus,
      title: props.title,
      updatedAt: props.updatedAt,
      actualEndDate: props.actualEndDate,
    });
  }

  // ----- PRIVATE METHODS -----
  /**
   * 간단한 예시 검증 로직
   * - 실제로 필요한 도메인 규칙과 예외 처리를 자유롭게 확장 가능
   */
  static validateDates(start: Date, end: Date) {
    if (start > end) {
      throw new Error('시작일은 종료일보다 늦을 수 없습니다.');
    }
  }
}
