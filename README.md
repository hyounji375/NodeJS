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

0822 3일 차 내용 복습

1. 로그를 찍어주는 morgan 미들웨어
2. json 데이터 읽는 것을 허용해주는 express.json
3. url에 있는 정보를 어떤 툴을 사용해서 해석할 것인지 정하는 express.urlencoded({extended : false})
4. 정적인 파일에 접근할 수 있도록 해주는, 즉 사용자나 프론트엔드가 백엔드를 통하지 않고 바로 정적인 파일이 저장되어 있는 곳에 접근할 수 있게 해주는 express.static
5. API의 유지보수를 쉽게 해주는 router. 
   로직을 밖으로 따로 빼내는 점이 리액트의 react-router-dom이랑 비슷하다.
   
vs코드에서 js 파일을 만들어서 각 파일마다 서버를 실행하고 코드를 쓰면 그 코드는 해당 js 파일의 서버에서만 나타난다.
내가 express.js 파일에서 만든 코드를 보려면 nodemon express를 해줘야 나타나지 nodemon router 상태에서는 router의 서버가 실행 중인 거니까 볼 수 없다.

0823 3일 차 내용 복습

5. multer를 이용해서 파일 업로드 
  - 파일 하나만 올리는 single
  - 하나의 input을 이용해서 파일 여러 개 업로드, 여러 개의 input을 이용해서 파일 업로드할 수 있는 field
  - 파일을 여러 개 업로드할 때는 배열 형태로 쓰인다.
 
 0824 3일 + 4일 차 내용 복습
 
 6. multer를 설정해 주는 로직과 폴더를 자동으로 만들어 주는 로직을 리액트처럼 따로 빼내서 모듈화하기
 7. postman 통해서 파일 올려보기
  - nodemon 이용해서 서버 실행 중이어야 한다. 서버 실행 안 했더니 실패 뜸.
--------------------------------------------------------------------------------------------------------------------------------------

0821 4일 차

[day04.txt](https://github.com/hyounji375/NodeJS/files/9389179/day04.txt)

