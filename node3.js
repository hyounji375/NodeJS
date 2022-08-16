import fs from "fs";

let file = null;

const fsPromise = fs.promises;

//동기
try {
  file = fs.readFileSync("./text1.txt", "utf-8");
  console.log(file);
} catch (error) {
  console.log("파일 읽기 실패");
} finally {
  console.log("결과와 상관없이 실행");
}

//비동기
fs.readFile("./text2.txt", "utf-8", (err, data) => {
  if (data) {
    console.log(data);
  } else {
    console.log(err);
  }
});
//fs.readFile("./text2.txt", "utf-8") 이걸 실행한 결과값을 받아와서 err와 data에 담는 것.

fsPromise
  .readFile("./text3.txt", "utf-8")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
