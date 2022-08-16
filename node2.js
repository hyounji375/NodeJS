import fs from "fs";
//nodeJS의 기본 지원 라이브러리라서 따로 설치하지 않아도 된다.

const fsPromise = fs.promises;
//then과 catch를 사용할 수 있게 해준다.

const text = "nodeJS 공부 중";
const text2 = "두 번째 방식";
const text3 = "동기적 방식";
//비동기
fs.writeFile("./text1.txt", text, "utf-8", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("파일 저장 성공!");
  }
});
//nodeJS가 성공 여부를 판단해서 만약 에러가 났다면 err에 에러값을 준다.

fsPromise
  .writeFile("./text2.txt", text2, "utf-8")
  .then(() => {
    console.log("파일이 성공적으로 저장되었습니다.");
  })
  .catch((error) => {
    console.log(error);
  });
//writeFile("./text2.txt", text2, "utf-8")이 실행되었을 때 결과값이 성공했냐 실패했냐. 성공 -> then, 실패 -> catch

//동기
try {
  fs.writeFileSync("./text3.txt", text3, "utf-8");
  console.log("동기적 방식도 저장 성공!");
} catch (error) {
  console.log(error);
}
