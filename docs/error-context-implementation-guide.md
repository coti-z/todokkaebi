# ErrorContext 구현 가이드

## 개요
예외 처리 시 풍부한 컨텍스트 정보를 수집하고 전달하기 위한 구현 가이드입니다.

## ErrorContext 인터페이스

```typescript
interface ErrorContext {
  // 필수 정보
  operation: string;         // "basicLogin", "createProject" 등
  
  // 선택 정보  
  userId?: string;           // 작업 실행자
  resourceId?: string;       // 대상 리소스 ID
  requestId?: string;        // 요청 추적 ID
  correlationId?: string;    // 분산 시스템 추적 ID
  
  // 메타데이터
  timestamp?: Date;
  userAgent?: string;
  ipAddress?: string;
  metadata?: Record<string, any>;
}
```

## basic login 기준 각 필드별 수집 방법

### 1. **operation: string** (필수)

**어디서:** Handler 내부에서 **하드코딩** 또는 **자동 생성**

```typescript
// 방법 A: 하드코딩 (현재 권장)
async execute(command: BasicLoginCommand): Promise<Token> {
  try {
    // 비즈니스 로직...
  } catch (error) {
    const context = {
      operation: 'basicLogin', // ← 하드코딩
      // ...
    };
    ErrorHandlingStrategy.handleError(error, context);
  }
}

// 방법 B: 클래스명에서 자동 추출
async execute(command: BasicLoginCommand): Promise<Token> {
  const operation = this.constructor.name.replace('Handler', ''); // "BasicLoginHandler" → "BasicLogin"
  // 또는
  const operation = command.constructor.name.replace('Command', ''); // "BasicLoginCommand" → "BasicLogin"
}
```

### 2. **userId?: string** (선택)

**어디서:** Command 파라미터에서 **추출** 또는 비즈니스 로직 **결과**

```typescript
async execute(command: BasicLoginCommand): Promise<Token> {
  let userId: string;
  
  try {
    // 로그인 시도 단계: 이메일을 임시 userId로 사용
    userId = command.email; // ← "user@example.com"
    
    const credential = await this.userAuthService.validatePassword({
      email: command.email,
      password: command.password,
    });
    
    // 로그인 성공 단계: 실제 userId로 업데이트
    userId = credential.userId; // ← "user-123"
    
  } catch (error) {
    const context = {
      userId: userId, // 시도한 이메일 또는 성공한 실제 userId
      // ...
    };
  }
}
```

### 3. **resourceId?: string** (선택)

**어디서:** Handler에서 **비즈니스 맥락에 따라 생성**

```typescript
async execute(command: BasicLoginCommand): Promise<Token> {
  try {
    const credential = await this.userAuthService.validatePassword({
      email: command.email,
      password: command.password,
    });
    
    // 성공 시: 실제 사용자 리소스 ID
    const resourceId = `user-${credential.userId}`;
    
  } catch (error) {
    // 실패 시: 로그인 시도 리소스 ID  
    const resourceId = `login-attempt-${command.email}`;
    // 또는 더 구체적으로
    const resourceId = `auth-session-${Date.now()}`;
    
    const context = {
      resourceId: resourceId, // ← Handler에서 생성
      // ...
    };
  }
}
```

### 4. **requestId?: string** (선택)

**어디서:** HTTP 헤더에서 **추출** 또는 시스템에서 **생성**

```typescript
// Resolver에서 수집
@Mutation(() => ApiResponseOfLoginOutput)
async basicLogin(
  @Args('input') input: LoginInput,
  @Context() gqlContext: any
) {
  const request = gqlContext.req;
  
  // 방법 A: 클라이언트가 제공한 경우
  const requestId = request.headers['x-request-id']; // ← "req-client-abc-123"
  
  // 방법 B: 서버에서 생성 (클라이언트가 없을 때)
  const requestId = request.headers['x-request-id'] || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // 방법 C: UUID 라이브러리 사용
  const requestId = request.headers['x-request-id'] || uuidv4();
  
  const command = new BasicLoginCommand(
    input.email,
    input.password,
    { requestId } // ← Command로 전달
  );
}
```

### 5. **correlationId?: string** (선택)

**어디서:** 분산 시스템 추적을 위해 **상위 서비스에서 전달** 또는 **생성**

```typescript
// Resolver에서 수집
async basicLogin(@Args('input') input: LoginInput, @Context() gqlContext: any) {
  const request = gqlContext.req;
  
  // 방법 A: 마이크로서비스 간 전파 (상위 서비스에서 전달)
  const correlationId = request.headers['x-correlation-id']; // ← "corr-service1-abc-def"
  
  // 방법 B: API 게이트웨이에서 생성된 경우
  const correlationId = request.headers['x-trace-id']; // ← API Gateway 추적 ID
  
  // 방법 C: 최상위 요청이면 새로 생성
  const correlationId = request.headers['x-correlation-id'] || `corr-${uuidv4()}`;
  
  const command = new BasicLoginCommand(
    input.email,
    input.password,
    { correlationId } // ← Command로 전달
  );
}
```

### 6. **timestamp?: Date** (메타데이터)

**어디서:** Handler 실행 시점에 **실시간 생성**

```typescript
async execute(command: BasicLoginCommand): Promise<Token> {
  const startTime = new Date(); // ← 처리 시작 시각
  
  try {
    // 비즈니스 로직...
  } catch (error) {
    const context = {
      timestamp: new Date(), // ← 에러 발생 시각 (실시간 생성)
      // 또는 시작 시각 사용
      timestamp: startTime,
      // ...
    };
  }
}
```

### 7. **userAgent?: string** (메타데이터)

**어디서:** HTTP 헤더에서 **직접 추출**

```typescript
// Resolver에서 수집
async basicLogin(@Args('input') input: LoginInput, @Context() gqlContext: any) {
  const request = gqlContext.req;
  
  const userAgent = request.headers['user-agent']; 
  // ← "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/98.0.4758.102"
  
  const command = new BasicLoginCommand(
    input.email,
    input.password,
    { userAgent } // ← Command로 전달
  );
}
```

### 8. **ipAddress?: string** (메타데이터)

**어디서:** HTTP 요청 소켓 정보에서 **추출**

```typescript
// Resolver에서 수집
async basicLogin(@Args('input') input: LoginInput, @Context() gqlContext: any) {
  const request = gqlContext.req;
  
  // 방법 A: Express의 req.ip (프록시 고려)
  const ipAddress = request.ip; // ← "192.168.1.100"
  
  // 방법 B: 직접 소켓에서
  const ipAddress = request.connection.remoteAddress; // ← "::ffff:192.168.1.100"
  
  // 방법 C: 프록시 헤더 고려 (Nginx, Cloudflare 등)
  const ipAddress = request.headers['x-forwarded-for'] || 
                   request.headers['x-real-ip'] || 
                   request.connection.remoteAddress;
  
  // 방법 D: IPv4 추출
  const ipAddress = (request.ip || request.connection.remoteAddress || '').replace('::ffff:', '');
  
  const command = new BasicLoginCommand(
    input.email,
    input.password,
    { ipAddress } // ← Command로 전달
  );
}
```

## 전체 구현 흐름

### 1. Command 인터페이스 확장

```typescript
// 공통 RequestContext 인터페이스
interface RequestContext {
  requestId?: string;
  correlationId?: string;
  userAgent?: string;
  ipAddress?: string;
  timestamp?: Date;
}

// BasicLoginCommand 수정
export class BasicLoginCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly requestContext?: RequestContext // 추가
  ) {}
}
```

### 2. Resolver에서 컨텍스트 수집

```typescript
@Mutation(() => ApiResponseOfLoginOutput)
async basicLogin(
  @Args('input') input: LoginInput,
  @Context() gqlContext: any
) {
  const request = gqlContext.req;
  
  // HTTP 요청 정보 수집
  const requestContext: RequestContext = {
    requestId: request.headers['x-request-id'] || generateRequestId(),
    correlationId: request.headers['x-correlation-id'] || generateCorrelationId(),
    userAgent: request.headers['user-agent'],
    ipAddress: this.extractIpAddress(request),
    timestamp: new Date()
  };

  const command = new BasicLoginCommand(
    input.email,
    input.password,
    requestContext
  );

  const result = await this.commandBus.execute(command);
  return ResponseManager.success(BasicAuthPresentationMapper.resultToLoginOutput(result));
}

private extractIpAddress(request: any): string {
  return request.headers['x-forwarded-for'] || 
         request.headers['x-real-ip'] || 
         request.ip || 
         request.connection.remoteAddress || 
         'unknown';
}
```

### 3. Handler에서 ErrorContext 구성

```typescript
@CommandHandler(BasicLoginCommand)
export class BasicLoginHandler implements ICommandHandler {
  async execute(command: BasicLoginCommand): Promise<Token> {
    try {
      const credential = await this.userAuthService.validatePassword({
        email: command.email,
        password: command.password,
      });

      // 성공 로그용 컨텍스트 (필요시)
      const successContext: ErrorContext = {
        operation: 'basicLogin',
        userId: credential.userId,
        resourceId: `user-${credential.userId}`,
        requestId: command.requestContext?.requestId,
        correlationId: command.requestContext?.correlationId,
        timestamp: new Date(),
        userAgent: command.requestContext?.userAgent,
        ipAddress: command.requestContext?.ipAddress
      };

      const pairToken = await this.tokenByJwtService.generatePairToken({
        userId: credential.userId,
      });

      return this.tokenService.storeToken({
        accessToken: pairToken.accessToken,
        refreshToken: pairToken.refreshToken,
        refreshTokenExpiresAt: pairToken.refreshTokenExpires,
        userId: credential.userId,
      });

    } catch (error) {
      // 실패 시 ErrorContext 구성
      const errorContext: ErrorContext = {
        operation: 'basicLogin',
        userId: command.email, // 시도한 이메일
        resourceId: `login-attempt-${command.email}`,
        requestId: command.requestContext?.requestId,
        correlationId: command.requestContext?.correlationId,
        timestamp: new Date(),
        userAgent: command.requestContext?.userAgent,
        ipAddress: command.requestContext?.ipAddress,
        metadata: {
          email: command.email,
          attemptTime: new Date().toISOString()
        }
      };

      ErrorHandlingStrategy.handleError(error, errorContext);
    }
  }
}
```

## 정보별 수집 위치 요약표

| 정보 | 수집 위치 | 방법 | 예시 값 |
|-----|----------|------|---------|
| **operation** | Handler | 하드코딩/자동생성 | `"basicLogin"` |
| **userId** | Handler | Command 파라미터/결과 | `"user@example.com"` → `"user123"` |
| **resourceId** | Handler | 비즈니스 로직 생성 | `"user-456"` 또는 `"login-attempt-user@test.com"` |
| **requestId** | Resolver | HTTP 헤더/생성 | `"req-abc-123"` |
| **correlationId** | Resolver | HTTP 헤더/생성 | `"corr-xyz-456"` |
| **timestamp** | Handler | 실시간 생성 | `2024-01-15T14:30:25.123Z` |
| **userAgent** | Resolver | HTTP 헤더 | `"Mozilla/5.0 Chrome/98.0"` |
| **ipAddress** | Resolver | HTTP 소켓/헤더 | `"192.168.1.100"` |

## 구현 우선순위

### Critical (즉시 구현)
1. **RequestContext 인터페이스** 정의
2. **Command 객체 확장** (requestContext 필드 추가)
3. **기본 ErrorContext 수집** (operation, userId, timestamp)

### Major (단계적 구현)
4. **HTTP 요청 정보 수집** (requestId, userAgent, ipAddress)
5. **리소스 ID 생성 로직** 구현
6. **분산 추적 ID** (correlationId) 연동

### Minor (향후 고도화)
7. **자동 operation 추출** 로직
8. **메타데이터 확장** 기능
9. **컨텍스트 기반 알림** 시스템

---

*이 문서는 현재 프로젝트 구조(NestJS + GraphQL + CQRS)에 맞춘 ErrorContext 구현 가이드입니다.*