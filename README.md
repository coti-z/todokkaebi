# Todokkaebi

N명 규모 팀의 프로젝트 관리 효율성 개선을 위한 계층적 Task 관리 플랫폼

## 프로젝트 설명

협업 기반 Task Management System. Project > Category > Task 3단계 계층 구조로 복잡한 프로젝트를 체계적으로 관리하고, 실시간으로 진행률을 추적합니다.

**기술 스택**: NestJS, TypeScript, GraphQL, Prisma, PostgreSQL, Redis

## 주요 기능

- **GraphQL API** - Over-fetching 방지 및 네트워크 트래픽 절감
- **계층적 Task 관리** - 프로젝트/카테고리/태스크 3단계 구조
- **실시간 진행률 추적** - 하위 태스크 완료율 자동 계산
- **JWT 인증** - Access/Refresh Token 기반 인증
- **권한 관리** - RBAC 기반 접근 제어
- **Redis 캐싱** - 반복 조회 성능 최적화
- **분산 락** - 동시성 제어
- **80% 테스트 커버리지** - 단위/통합 테스트

## 아키텍처

### DDD + CQRS + Port-Adapter Pattern

```
Presentation Layer (GraphQL Resolvers)
       ↓
Application Layer (Use Cases, CQRS Handlers)
       ↓
Domain Layer (Entities, Policies, Business Logic)
       ↑
Infrastructure Layer (Repository, External Services)
```

**핵심 설계**

- Over-fetching 방지 및 네트워크 트래픽 절감을 위한 GraphQL 도입
- DDD + CQRS 패턴 기반 4-Layered 아키텍처로 도메인 로직 분리 및 확장성 확보
- Port-Adapter 패턴으로 기술 스택 독립성 확보 (Mock 테스트 용이성 + 높은 유지보수성)
- JWT 인증 + RBAC 기반 권한 관리 시스템 구축
- Redis 캐싱 구현으로 반복 조회 성능 향상
- 커스텀 데코레이터 설계 (@Transactional, @Cache, @Lock, @RateLimit)로 횡단 관심사 분리 및 보일러플레이트 코드 감소
- 실시간 Task 진행률 추적 및 계층적 데이터 관리로 협업 효율 개선
- 80% 테스트 커버리지 달성 (단위/통합 테스트)으로 배포 안정성 확보

## 실행 방법

```bash
# 설치
npm install
cp .env.example .env

# DB 마이그레이션
npx prisma migrate dev
npx prisma generate

# 실행
npm run start:dev
```

GraphQL Playground: http://localhost:3000/graphql

**요구사항**: Node.js 20+, PostgreSQL 14+, Redis 6+

---

**License**: MIT
