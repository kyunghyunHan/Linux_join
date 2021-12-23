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

## 발생한 이슈
- npm 다운로드
[상황] 리눅스 서버에서 npm install 을 통한 모듈 다운

[문제] bcrypt 다운 에러
```
node-pre-gyp WARN Using needle for node-pre-gyp https download 

node-pre-gyp WARN Tried to download(404): https://github.com/kelektiv/node.bcrypt.js/releases/download/v3.0.6/bcrypt_lib-v3.0.6-node-v72-win32-x64-unknown.tar.gz 
```

[해결] npm install bcrypt@3.0.6 --save 로 bcrypt 버전 다운그레이드


## 마리아 디비 연동
![스크린샷 2021-12-23 오후 2 16 24](https://user-images.githubusercontent.com/88940298/147191584-0f8723f3-6b4d-4747-995c-d30f4127c5ef.png)
- aws rds + 마리아 디비 인스턴스 생성 및 연결
- nodejs 및 시퀄라이즈 config파일 마리아 디비 연동
- 도커 +리눅스 우분투 서버 연동

## 로그인 회원가입
![로그인 회원가입](https://user-images.githubusercontent.com/88940298/147193381-45788792-1440-4881-90f8-d9a016cde552.gif)


## 게시물작성 
![포스트](https://user-images.githubusercontent.com/88940298/147194087-2c6420f2-2c15-4db5-9312-27075eaca262.gif)



## 게시물삭제 
![게시물삭제](https://user-images.githubusercontent.com/88940298/147193988-b26505a5-9786-4798-8480-530ccc6c485f.gif)
