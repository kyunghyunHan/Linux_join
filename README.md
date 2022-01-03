# 개인프로젝트 (마리아디비+우분투+로그인,회원가입+게시판)

## 설명
- sns 구현
- 도커 우분투 서버에서의 개인 프로젝트 작성
- 마리아 디비연동 (rds+마리아디비)
- 로그인및 회원가입 구현
- 이미지 업로드 및 게시판 구현(SNS)

## 사용한 기술 
- 리눅스(도커,우분투) 
- nodejs,express
- passport
- nunjucks
- rds(mariadb)
- axios

## 발생한 이슈
### 🌱npm 다운로드
[상황] 리눅스 서버에서 npm install 을 통한 모듈 다운

[문제] bcrypt 다운 에러
```
node-pre-gyp WARN Using needle for node-pre-gyp https download 

node-pre-gyp WARN Tried to download(404): https://github.com/kelektiv/node.bcrypt.js/releases/download/v3.0.6/bcrypt_lib-v3.0.6-node-v72-win32-x64-unknown.tar.gz 
```

[해결] npm install bcrypt@3.0.6 --save 로 bcrypt 버전 다운그레이드

## 🌱MariaDB 설치 후 재시작 시 에러

[문제] System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
[시도]
- 삭제 후 재설치
```
1. sudo apt-get purge mariadb-*
2. sudo apt autoremove
3. dpkg -l | grep mysql
4. sudo apt-get purge mysql-common
5. apt -y install mariadb-server mariadb-client
6. systemctl restart/enable/status mariadb
```
-  그래도 안됨
[해결] systemctl 명령어는 VMware에 설치한 Ubuntu에서는 지원하지만
WSL은 systemctl 명령어를 지원하지 않는다.
systemctl 명령어 대신 sudo service mysql start 명령어를 통해 실행시킬 수 있었다.

## 🌱npx sequelize db:create 데이터베이스 생성시도
[문제] ERROR: Access denied for user ‘syusmm’@’localhost’ (using password: Yes)
![다운로드](https://user-images.githubusercontent.com/88940298/147200067-4a8f5078-db0a-4438-a90b-974dff7aa86d.png)

오류 발생 
[시도]
```
1. 비번 변경->아님 / 사용자 변경 -> 안됨
2. mariadb계정 권한설정 -> 안됨 / 우분투파일권한설정 -> 안됨
3. mariadb계정 플러그인 업데이트 -> 안됨  
4. Sudu mysql_secure_installation 시도-> 안됨->새 오류 등장
```
- ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2) sudo su-들어가서 service mysql start 실행하니 해결됨
하지만 여전히 db생성은 안됨

[해결] config에 mariadb포트 “port”:”3307” 넣고 실행, db생성됨
![다운로드 (1)](https://user-images.githubusercontent.com/88940298/147200157-621cb424-5451-425a-b275-23e05b7f56b9.png)


## 마리아 디비 연동
![스크린샷 2021-12-23 오후 2 16 24](https://user-images.githubusercontent.com/88940298/147191584-0f8723f3-6b4d-4747-995c-d30f4127c5ef.png)
- aws rds + 마리아 디비 인스턴스 생성 및 연결
- nodejs 및 시퀄라이즈 config파일 마리아 디비 연동
- 도커 +리눅스 우분투 서버 연동

## 로그인 회원가입
![로그인 회원가입](https://user-images.githubusercontent.com/88940298/147193381-45788792-1440-4881-90f8-d9a016cde552.gif)


- 해시값 sha256 을사용한 해시값 저장
```js
const sha256 = require('sha256');
  const hash = await sha256(password, 12);
    await User.create({
      email,
      password: hash,
      name,
      img:req.body.url,
    
     
    });

```
- 비밀번호 해시값 저장: ![스크린샷 2021-12-23 오후 3 43 03](https://user-images.githubusercontent.com/88940298/147199690-a110a986-26f8-4b83-becf-026f865aa41a.png)

## 게시물작성 
![포스트](https://user-images.githubusercontent.com/88940298/147194087-2c6420f2-2c15-4db5-9312-27075eaca262.gif)
![스크린샷 2021-12-23 오후 3 57 38](https://user-images.githubusercontent.com/88940298/147201289-d2b348bf-cf24-4504-a176-11db3b0e0bfa.png)



## 게시물삭제 
![게시물삭제](https://user-images.githubusercontent.com/88940298/147193988-b26505a5-9786-4798-8480-530ccc6c485f.gif)
