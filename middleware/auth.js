export const isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};
//req.user.id가 있으면 next로 넘기고 없으면 로그인이 필요하다고 해줌.

export const isNotLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};
//로그인이 되어 있지 않으면 next로, 아니면 로그인 필요하다고 해주기.

//next는 다음 미들웨어를 실행하라는 뜻.
