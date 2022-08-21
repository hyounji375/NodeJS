# NodeJS

0813 1일 차

[day01.txt](https://github.com/hyounji375/NodeJS/files/9333037/day01.txt)

0816 1일 차 복습

1. 터미널에서 콘솔로그 확인하는 방법
  - node 파일명
 
2. npm init
  - package.json을 만들어준다.
  - npm init 하고 쭉 엔터만 쳐주면 된다.
  - package.json에서 맨 마지막 줄에 "type": "module"을 추가해줘야 import가 사용 가능하다.
--------------------------------------------------------------------------------------------------------------------------------------

0814 2일 차

[day02.txt](https://github.com/hyounji375/NodeJS/files/9333039/day02.txt)

0817 2일 차 복습

1. express 

const app = express();
//express의 반환값

app.set("port", 3000);
//3000이라는 숫자를 port라는 이름으로 세팅함. 그러면 port 로직을 분리할 수 있다.

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 실행 중`);
});

=> 이게 express 모듈의 기본형

--------------------------------------------------------------------------------------------------------------------------------------

0820 3일 차

[day03.txt](https://github.com/hyounji375/NodeJS/files/9387283/day03.txt)

--------------------------------------------------------------------------------------------------------------------------------------

0821 4일 차

[day04.txt](https://github.com/hyounji375/NodeJS/files/9389179/day04.txt)

