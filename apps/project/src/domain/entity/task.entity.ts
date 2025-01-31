import { TaskState } from '@project/domain/value-objects/task-states.vo';
import { v4 as uuidv4 } from 'uuid';

type TaskImmutableProps = {
  readonly id: string;
  readonly createdAt: Date;
};

export type TaskMutableProps = {
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

/**
 * 영속화할 모든 Task 필드.
 * Immutable + Mutable
 */
type TaskProps = TaskMutableProps & TaskImmutableProps;

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
  | 'status'
  | 'check'
>;

export class Task {
  private constructor(private props: TaskProps) {}

  // ----- GETTERS -----
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
      status: defaultStatus,
      startDate: props.startDate,
      endDate: props.endDate,
      actualStartDate: props.startDate, // 실제 시작일이 곧 계획된 시작일과 동일하다는 가정
      actualEndDate: undefined,
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * 이미 존재하는 Task 엔티티를 복원한다(Reconstitution).
   * @param props TaskProps
   */
  static reconstitute(props: TaskProps): Task {
    // 복원 시에도 유효성 검증을 해주면 좋다.
    Task.validateDates(props.startDate, props.endDate);

    return new Task({ ...props });
  }

  // ----- UPDATE METHODS -----
  changeTitle(title: string) {
    if (!title) return; // 필요한 만큼 Validation 처리
    this.props.title = title;
  }

  changeStatus(status: TaskState) {
    this.props.status = status;
  }

  changeCheck(check: boolean) {
    this.props.check = check;
  }

  changeStartDate(date: Date) {
    this.props.startDate = date;
  }

  changeEndDate(date: Date) {
    this.props.endDate = date;
  }

  changeActualStartDate(date: Date) {
    this.props.actualStartDate = date;
  }

  changeActualEndDate(date: Date) {
    this.props.actualEndDate = date;
  }

  changeCategoryId(categoryId: string) {
    this.props.categoryId = categoryId;
  }

  partialUpdate(partial: Partial<TaskMutableProps>) {
    if (partial.title) {
      this.changeTitle(partial.title);
    }

    if (partial.categoryId) {
      this.changeCategoryId(partial.categoryId);
    }

    if (partial.check) {
      this.changeCheck(partial.check);
    }

    if (partial.status) {
      this.changeStatus(partial.status);
    }

    if (partial.startDate) {
      this.changeStartDate(partial.startDate);
    }

    if (partial.endDate) {
      this.changeEndDate(partial.endDate);
    }

    if (partial.actualStartDate) {
      this.changeActualStartDate(partial.actualStartDate);
    }

    if (partial.actualEndDate) {
      this.changeActualEndDate(partial.actualEndDate);
    }
    this.updateTimestamp();
  }

  // ----- PRIVATE METHODS -----
  /**
   * Task를 업데이트할 때마다 updatedAt을 갱신한다.
   */
  private updateTimestamp() {
    this.props.updatedAt = new Date();
  }

  /**
   * 간단한 예시 검증 로직
   * - 실제로 필요한 도메인 규칙과 예외 처리를 자유롭게 확장 가능
   */
  private static validateDates(start: Date, end: Date) {
    if (start > end) {
      throw new Error('시작일은 종료일보다 늦을 수 없습니다.');
    }
  }
}
