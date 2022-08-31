//어떤 주소의 라우터들이 있는지만 확인할 수 있도록 로직 분리

import express from "express";
import UserService from "../service/userService.js";

const router = express.Router();

router.post("/signup", UserService.signUp);

export default router;
