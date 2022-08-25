create database myblog; /* 데이터베이스 기지 만들기*/
use myblog; /* 만든 거 쓰겠다*/

create table tb_user(
user_idx bigint auto_increment primary KEY,
user_name varchar(100) ,
  /* 용량이 100byte */
user_pw TEXT
);

select * from tb_user;
select user_idx, user_name from tb_user;
/*select는 테이블 조회(read). *표는 모든 필드를 가지고 옴. 그 외에는 필드명 쓰면 됨*/

insert into tb_user (user_name, user_pw) values ("김지현", "1234");
insert into tb_user (user_name, user_pw) values ("에디타", "1234");
/*insert는 데이터 삽입(create)*/

select * from tb_user where user_name = "에디타";
/*에디타만 가지고 옴
그래서 order 테이블에서 에디타가 주문한 모든 걸 가지고 올 수도 있다*/

/*컨트롤+엔터가 저장*/
