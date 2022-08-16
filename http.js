import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  //콘텐츠가 어떤 타입인지 헤더에 객체 형태로 넣은 것.
  res.end(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTTP 모듈 테스트</title>
    </head>
    <body>
        <h2>HTTP 모듈 테스트</h2>
        <p>처음으로 실행하는 node.js http 서버</p>
    </body>
    </html>
`
  );
});
//req(받은 요청)와 res(보내줄 내용)의 순서는 바꾸면 안 된다.
//200은 http status code

//const server = http.createServer() 이것만 써도 서버는 실행된다.

server.listen(3000, () => {
  console.log("3000번 포트로 서버 실행 중입니다.");
});
//3000은 포트 번호.
