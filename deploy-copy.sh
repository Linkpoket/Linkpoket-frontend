#!/bin/bash
set -e

# 임시 디렉토리 준비
rm -rf ~/temp-dist && mkdir -p ~/temp-dist

# dist는 이미 runner에서 scp로 전송됨

# 기존 파일 삭제 후 복사
sudo rm -rf /home/ubuntu/linkrew/*
sudo cp -r ~/temp-dist/* /home/ubuntu/linkrew/

# 권한 설정
sudo chown -R ubuntu:ubuntu /home/ubuntu/linkrew/
sudo chmod -R 755 /home/ubuntu/linkrew/

# nginx 재시작
sudo systemctl reload nginx
