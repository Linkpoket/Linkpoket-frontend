#!/bin/bash
set -e  # 에러 발생 시 즉시 중단

SERVER="linkrew-web-dev"
APP_DIR="/home/ubuntu/linkrew"
TEMP_DIR="/home/ubuntu/temp-dist"

echo "🔨 로컬 빌드 시작..."
npm run build

echo "📂 서버 임시 디렉토리 초기화..."
ssh $SERVER "rm -rf $TEMP_DIR && mkdir -p $TEMP_DIR"

echo "📤 빌드 결과 서버로 전송..."
scp -r dist/* $SERVER:$TEMP_DIR/

echo "🚀 서버에 배포 시작..."
ssh $SERVER << EOF
  echo "📦 업로드 파일 확인"
  ls -la $TEMP_DIR/

  echo "🧹 기존 앱 파일 삭제"
  sudo /bin/rm -rf $APP_DIR/*

  echo "📥 새 파일 복사"
  sudo /bin/cp -r $TEMP_DIR/* $APP_DIR/

  echo "🔑 권한 설정"
  sudo /bin/chown -R ubuntu:ubuntu $APP_DIR/
  sudo /bin/chmod -R 755 $APP_DIR/

  echo "📦 배포된 파일 확인"
  ls -la $APP_DIR/

  echo "🔄 Nginx 재시작"
  sudo /usr/bin/systemctl reload nginx

  echo "✅ 배포 완료!"
EOF
