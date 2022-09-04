import Post from "../models/post.js";
import User from "../models/user.js";

export default class PostService {
  static async create(req, res, next) {
    try {
      const post = await Post.create({
        content: req.body.content,
        userIdx: req.user.id,
        //로그인한 사람의 idx, 즉 프라이머리 키
        //받아온 콘텐츠 내용과 로그인한 사람의 정보를 db에 값을 넣겠다.
      });
      const fullPost = await Post.findOne({
        where: { id: post.id },
        //post.id랑 위의 post랑 같은 것. 내가 등록한 post의 id가 잘 등록되었는지 확인
        include: [
          //누가 게시글을 썼는지 가져오는 로직. include는 포함한다는 뜻
          {
            model: User,
            attributes: ["id", "email"],
            //어떤 컬럼을 가지고 올 것인지. useridx는 id와 email을 가지고 오겠다.
          },
        ],
      });
      //post의 content는 게시글의 내용이고 userIdx는 그 게시글을 쓴 사람의 id
      //findOne은 게시글들에서 post.id를 찾아오는 거고 include는 그 게시글을 쓴 사람의 id와 email을 가져오는 거
      res.status(200).json(fullPost);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async readAll(req, res, next) {
    try {
      const posts = await Post.findAll({
        where: { userIdx: req.user.id },
        //내가 쓴 글만 찾아오겠다
        order: [["createdAt", "DESC"]],
        //최근에 등록한 게 위로 오도록 정렬.
        //cretedAt 컬럼 기준으로 DESC(내림차순)하겠다.
        limit: 2,
        //게시글 페이지네이션. 한 화면에 보여줄 게시글 수
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
        //스케줄러 : 일주일 후에 글 삭제할 수 있는 그런 기능.
      });
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  //모든 게시글 조회

  static async read(req, res, next) {
    try {
      const postId = req.params.postId;
      //맨 뒤의 postId는 routes 의 post.js에 있는 /:postId와 같아야 한다.
      const fullPost = await Post.findOne({
        where: { id: postId },
        attributes: { exclude: "updatedAt" },
        //updatedAt 컬럼 제외하고 가져옴
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
      });
      res.status(200).json(fullPost);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  //해당 게시글 한 개 조회

  static async update(req, res, next) {
    try {
      const postId = req.qurey.postId;
      await Post.update(
        {
          content: req.body.content,
        },
        {
          where: {
            id: postId,
            userIdx: req.user.id,
            //내가 쓴 글 나만 수정할 수 있음
          },
        }
      );
      res.status(200).json({
        postId: postId,
        content: req.body.content,
        //수정된 내용만 보내주는 것.
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const postId = req.params.postId;
      //중복 사용되는 건 변수로 해준다.
      await Post.destroy({
        where: {
          id: postId,
          userIdx: req.user.id,
        },
      });
      res.status(200).json({ PostId: postId });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
