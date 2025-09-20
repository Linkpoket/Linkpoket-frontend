#!/bin/bash

# 스크립트 실행 중 에러 발생 시 중단
set -e  

echo "🔨 빌드 시작..."
npm run build

echo "📂 서버에 임시 디렉토리 생성..."
ssh linkrew-web-dev "rm -rf ~/temp-dist && mkdir -p ~/temp-dist"

echo "📤 빌드 결과 서버에 업로드..."
scp -r dist/* linkrew-web-dev:~/temp-dist/

echo "서버 접속"
ssh linkrew-web-dev
