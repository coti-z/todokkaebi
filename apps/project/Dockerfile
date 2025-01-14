FROM node:18 AS development

# 작업 디렉토리
WORKDIR /usr/src/app

# 기본 설정 파일 및 패키지 파일 가져오기
COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/scripts ./apps/scripts
COPY proto ./proto


# 패키지 설치
RUN npm install


CMD ["npm", "run", "start:project:dev"]

# TODO: production 환경 도커 파일 작성
