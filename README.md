# 🗂️ Todokkaebi

협업 기반 Task Management System - DDD와 CQRS 패턴을 적용한 TODO 관리 플랫폼

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/) [![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white)](https://graphql.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 특징](#-주요-특징)
- [기술 스택](#-기술-스택)
- [아키텍처](#-아키텍처)
- [시작하기](#-시작하기)
- [API 문서](#-api-문서)
- [프로젝트 구조](#-프로젝트-구조)
- [개발 가이드](#-개발-가이드)
- [테스트](#-테스트)
- [라이선스](#-라이선스)

## 🎯 프로젝트 개요

**Todokkaebi**는 팀 협업에 최적화된 Task Management System으로, 다음과 같은 계층 구조를 제공합니다:

```
프로젝트 (Project)
  └── 카테고리 (Category)
        └── 태스크 (Task)
```

🔗 **프로젝트 정보**: https://bside.best/projects/detail/P240926112258

## ✨ 주요 특징

### 🏗️ 아키텍처

- **DDD (Domain-Driven Design)** - 도메인 중심 설계로 비즈니스 로직 명확화
- **CQRS (Command Query Responsibility Segregation)** - 읽기/쓰기 책임 분리
- **Hexagonal Architecture** - 포트와 어댑터 패턴으로 의존성 역전
- **Layered Architecture** - Presentation → Application → Domain ← Infrastructure

### 🔐 인증 & 보안

- **JWT 기반 인증** (Access Token + Refresh Token)
- **카카오 OAuth 2.0** 소셜 로그인 지원
- **권한 기반 접근 제어** (RBAC)

### 🚀 성능 & 확장성

- **Redis 캐싱** - 빠른 응답 속도 보장
- **분산 락** - 동시성 제어
- **트랜잭션 관리** - 데이터 일관성 보장
- **속도 제한 (Rate Limiting)** - API 남용 방지

### 📊 데이터 구조

- **계층적 Task 관리** - Project > Category > Task 3단계 구조
- **실시간 진행률 추적** - 완료율 자동 계산
- **날짜 기반 일정 관리** - 시작일/종료일/실제 완료일 추적

## 🛠️ 기술 스택

### Backend Core

- **NestJS** - Node.js 프레임워크
- **TypeScript** - 타입 안전성
- **GraphQL** - API 쿼리 언어
- **Prisma** - ORM 및 타입 안전 쿼리

### Database & Cache

- **PostgreSQL** - 메인 데이터베이스
- **Redis** - 캐싱 및 세션 관리

### Architecture Patterns

- **CQRS** - `@nestjs/cqrs`
- **Event Sourcing** - 이벤트 기반 아키텍처
- **Repository Pattern** - 데이터 접근 추상화

### DevOps & Tools

- **Jest** - 단위/E2E 테스트
- **Winston** - 구조화된 로깅
- **ESLint/Prettier** - 코드 품질 관리

## 🏛️ 아키텍처

### 레이어 구조

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  (GraphQL Resolvers, DTOs)          │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│     Application Layer               │
│  (Use Cases, Handlers, Services)    │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│      Domain Layer                   │
│  (Entities, VOs, Policies)          │
└─────────────────────────────────────┘
              ▲
┌─────────────┴───────────────────────┐
│    Infrastructure Layer             │
│  (Repositories, Adapters, Mappers)  │
└─────────────────────────────────────┘
```

### 의존성 방향

```
Presentation  ──────►  Application  ──────►  Domain
                                               ▲
Infrastructure  ──────────────────────────────┘
```

> 💡 **핵심 원칙**: Domain 레이어는 다른 레이어에 의존하지 않습니다 (순수 비즈니스 로직)

### 주요 디자인 패턴

| 패턴               | 적용 위치                   | 목적                           |
| ------------------ | --------------------------- | ------------------------------ |
| **Factory Method** | Entity 생성                 | `create()` / `reconstitute()`  |
| **Repository**     | Infrastructure              | 데이터 접근 추상화             |
| **Policy**         | Domain Logic                | 복잡한 규칙 명시화             |
| **Mapper**         | Presentation/Infrastructure | 레이어 간 데이터 변환          |
| **Decorator**      | Application                 | `@Transactional()`, `@Cache()` |

자세한 아키텍처 설명은 [CLAUDE.md](./CLAUDE.md)를 참고하세요.

## 🚀 시작하기

### 사전 요구사항

- Node.js 20.x 이상
- PostgreSQL 14.x 이상
- Redis 6.x 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/todokkaebi.git
cd todokkaebi

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일을 열어 필요한 값들을 설정하세요
```

### 환경변수 설정

`.env` 파일에 다음 항목들을 설정해야 합니다:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/todokkaebi"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Kakao OAuth
KAKAO_CLIENT_ID=your-kakao-client-id
KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
```

### 데이터베이스 마이그레이션

```bash
# Prisma 마이그레이션 생성 및 적용
npx prisma migrate dev

# Prisma Client 생성
npx prisma generate
```

### 실행

```bash
# 개발 모드
npm run start:dev

# 디버그 모드
npm run start:debug

# 프로덕션 모드
npm run build
npm run start:prod
```

서버가 시작되면 다음 주소에서 접근할 수 있습니다:

- GraphQL Playground: http://localhost:3000/graphql

## 📚 API 문서

### GraphQL API

자세한 API 문서는 [docs/api.md](./docs/api.md)를 참고하세요.

#### 주요 엔드포인트

**인증**

- `createUser` - 회원가입
- `kakaoAuth` - 카카오 로그인
- `reissueAccessToken` - 토큰 갱신

**프로젝트 관리**

- `createProject` - 프로젝트 생성
- `getAllProjects` - 프로젝트 목록 조회
- `updateProject` - 프로젝트 수정

**카테고리 관리**

- `createCategory` - 카테고리 생성
- `getCategory` - 카테고리 조회
- `updateCategory` - 카테고리 수정

**태스크 관리**

- `createTask` - 태스크 생성
- `updateTask` - 태스크 수정 (상태, 체크박스 등)
- `getTasksWithCategoryId` - 카테고리별 태스크 목록

### GraphQL Playground 예시

```graphql
# 프로젝트 생성
mutation {
  createProject(input: { name: "새 프로젝트" }) {
    success
    project {
      id
      name
      totalTask
      completeTask
    }
  }
}

# 카테고리와 태스크 조회
query {
  getProject(input: { id: "project-id" }) {
    project {
      name
      categories {
        name
        tasks {
          title
          status
          check
        }
      }
    }
  }
}
```

## 📂 프로젝트 구조

```
src/
├── auth/                          # 인증 도메인
│   ├── application/              # Use Cases
│   │   ├── handler/             # Command/Query Handlers
│   │   ├── service/             # 도메인 서비스
│   │   └── port/                # 인터페이스 정의
│   ├── domain/                   # 비즈니스 로직
│   │   ├── entity/              # 도메인 엔티티
│   │   └── logic/               # 도메인 정책
│   ├── infrastructure/           # 외부 시스템 연동
│   │   ├── persistence/         # Repository 구현
│   │   └── adapter/             # 외부 서비스 어댑터
│   └── presentation/             # API 레이어
│       ├── resolver/            # GraphQL Resolvers
│       └── dto/                 # Input/Output DTOs
│
├── project/                      # 프로젝트 도메인
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   └── presentation/
│
├── user/                         # 사용자 도메인
│
└── shared/                       # 공통 모듈
    ├── decorator/               # 커스텀 데코레이터
    ├── exception/               # 예외 처리
    └── interceptor/             # 인터셉터
```

## 🧑‍💻 개발 가이드

### 새 기능 추가 워크플로우

1. **Domain 설계** - Entity, VO, Policy 클래스 작성
2. **Port 정의** - Command/Query, Repository Interface
3. **Application** - Handler, Service 구현
4. **Infrastructure** - Repository 구현체, Mapper
5. **Presentation** - Resolver, DTO, Mapper
6. **테스트** - 단위 테스트 → E2E 테스트

### 코딩 컨벤션

```typescript
// Command 네이밍
export class CreateProjectCommand {
  constructor(public readonly name: string) {}
}

// Handler 네이밍
@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler {
  // ...
}

// Entity Factory Method
export class Project extends BaseEntity<ProjectProps> {
  static create(props: CreateProjectProps): Project {
    // 새 엔티티 생성
  }

  static reconstitute(props: ProjectProps): Project {
    // DB에서 복원
  }
}
```

자세한 가이드는 [CLAUDE.md](./CLAUDE.md)의 코딩 컨벤션 섹션을 참고하세요.

### 주요 개발 명령어

```bash
# 코드 포맷팅
npm run format

# 린트 검사 및 자동 수정
npm run lint

# GraphQL 타입 생성
npm run generate:graphql

# Prisma Studio (데이터베이스 GUI)
npx prisma studio
```

## 🧪 테스트

### 테스트 실행

```bash
# 단위 테스트
npm run test:unit

# 단위 테스트 (watch 모드)
npm run test:watch

# 커버리지 리포트
npm run test:unit:cov

# E2E 테스트
npm run test:e2e

# 디버그 모드
npm run test:debug
```

### 테스트 전략

- **단위 테스트**: Domain, Service, Handler 레이어
- **E2E 테스트**: GraphQL API 전체 흐름
- **커버리지 목표**: 80% 이상

```bash
# 커버리지 확인
npm run test:unit:cov
```

## 📖 추가 문서

- [아키텍처 가이드](./CLAUDE.md) - 상세한 아키텍처 설명 및 개발 가이드
- [API 문서](./docs/api.md) - GraphQL API 명세
- [에러 처리 가이드](./docs/error-context-implementation-guide.md) - ErrorContext 구현 가이드
- [캐싱 전략](./docs/cache.md) - Redis 캐싱 및 성능 최적화

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.
