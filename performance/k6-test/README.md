# K6 부하 테스트 가이드

## 사전 준비

### 1. K6 설치
```bash
# macOS
brew install k6

# Ubuntu/Debian
sudo apt update
sudo apt install k6

# CentOS/RHEL
sudo yum install k6
```

### 2. 테스트 계정 생성 (이미 완료됨)
```bash
cd performance/k6-test/tools/create-account
npm install
npm run create-accounts -- --count 1000 --concurrency 10
```

## 부하 테스트 실행

### 1. 기본 실행 (dev 환경)
```bash
cd performance/k6-test
k6 run scripts/main.test.js
```

### 2. 환경별 실행
```bash
# 개발 환경 (낮은 부하)
TEST_ENV=dev k6 run scripts/main.test.js

# 프로덕션 환경 (높은 부하)
TEST_ENV=production k6 run scripts/main.test.js
```

### 3. 실시간 모니터링과 함께 실행
```bash
k6 run --out csv=results.csv scripts/main.test.js
```

### 4. 상세 결과 출력
```bash
k6 run --summary-trend-stats="avg,min,med,max,p(95),p(99)" scripts/main.test.js
```

## 테스트 시나리오

K6의 시나리오 기능을 활용하여 4가지 동시 시나리오를 실행합니다:

### 1. **Project Listing Scenario** (0-3분)
- **목적**: 프로젝트 목록 조회 성능 테스트
- **부하**: 최대 300 동시 사용자
- **동작**: 각 사용자가 자신의 프로젝트 목록을 반복 조회

### 2. **Project Creation Scenario** (1-5분)
- **목적**: 프로젝트 생성 성능 테스트  
- **부하**: 최대 200 동시 사용자
- **동작**: 각 사용자가 새 프로젝트를 생성

### 3. **Full Workflow Scenario** (2-8분)
- **목적**: 전체 워크플로우 테스트
- **부하**: 최대 500 동시 사용자
- **동작**: 목록 조회 → 프로젝트 생성 → 상세 조회 순차 실행

### 4. **Peak Load Scenario** (4-8분)
- **목적**: 최대 부하 테스트
- **부하**: 최대 1000 동시 사용자  
- **동작**: 랜덤한 작업 수행 (목록 조회, 생성, 상세 조회)

## 부하 테스트 설정

### 기본 설정 (dev)
```javascript
stages: [
  { duration: '10s', target: 5 },   // 5명으로 시작
  { duration: '20s', target: 10 },  // 10명으로 증가
  { duration: '10s', target: 0 },   // 종료
]
```

### 고부하 설정 (production)
```javascript
stages: [
  { duration: '30s', target: 50 },    // 50명으로 워밍업
  { duration: '1m', target: 200 },    // 200명으로 증가
  { duration: '2m', target: 500 },    // 500명으로 증가
  { duration: '3m', target: 1000 },   // 1000명 최대 부하
  { duration: '2m', target: 500 },    // 500명으로 감소
  { duration: '1m', target: 0 },      // 완전 종료
]
```

## 성능 기준 (Thresholds)

- **응답시간**: 95%의 요청이 3초 이내 완료
- **실패율**: 5% 미만
- **체크 성공률**: 90% 이상

## 결과 해석

### 주요 메트릭
- `http_req_duration`: HTTP 요청 응답 시간
- `http_req_failed`: HTTP 요청 실패율
- `checks`: 체크 성공률
- `vus`: 동시 가상 사용자 수
- `vus_max`: 최대 가상 사용자 수

### 로그 해석
```
[VU:1] 1단계: 기존 프로젝트 목록 조회
[VU:1] ✓ 1단계 성공: 기존 프로젝트 3개 조회됨
[VU:1] 2단계: 새 프로젝트 생성
[VU:1] ✓ 2단계 성공: 프로젝트 생성됨 - LoadTest-1692345678-VU1-ITER1 (ID: abc123)
[VU:1] 3단계: 생성된 프로젝트 상세 조회
[VU:1] ✓ 3단계 성공: 프로젝트 상세 조회됨 - LoadTest-1692345678-VU1-ITER1
[VU:1] 시나리오 완료
```

## 트러블슈팅

### 일반적인 문제들

1. **"API 연결 테스트 실패"**
   - 백엔드 서버가 실행 중인지 확인
   - `lib/graphql-client.js`의 BASE_URL 확인

2. **"토큰 인증 실패"**
   - `tools/create-account/data/accounts.json`에 유효한 토큰이 있는지 확인
   - 토큰 만료 시간 확인 (기본 1시간)

3. **높은 실패율**
   - 동시 사용자 수를 줄여서 테스트
   - 데이터베이스 연결 풀 크기 확인
   - 서버 리소스(CPU, 메모리) 확인

### 디버그 모드
```bash
# 상세 로그와 함께 실행
k6 run --verbose scripts/main.test.js

# 특정 VU만 실행하여 디버그
k6 run --vus 1 --duration 30s scripts/main.test.js
```

## 추가 개선 사항

1. **더 많은 시나리오 추가**
   - 카테고리 생성/조회
   - 할일 생성/수정/삭제
   - 멤버 초대/관리

2. **성능 모니터링**
   - Grafana + InfluxDB 연동
   - 실시간 대시보드 구성

3. **환경별 설정**
   - 스테이징 환경 설정
   - 로컬 개발 환경 설정