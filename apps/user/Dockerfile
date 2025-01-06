# Node.js 런타임을 베이스 이미지로 사용
FROM node:18 AS development

# 작업 디렉토리
WORKDIR /usr/src/app


# 기본 설정 파일 및 패키지 파일 가져오기
COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json


# 패키지 설치
RUN npm install

## 서비스 소스코드(메인 서비스, 라이브러리)
COPY apps/user apps/user
COPY libs libs

CMD ["npm", "run", "start:user:dev"]

# TODO: production 환경 도커 파일 작성