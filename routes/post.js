import express from "express";
import { isLoggedin } from "../middleware/auth.js";
import PostService from "../service/post.js";

const router = express.Router();

router.post("/", isLoggedin, PostService.create);
router.get("/all", PostService.readAll);
router.get("/:postId", PostService.read);
router.put("/", isLoggedin, PostService.update);
router.delete("/:postId", isLoggedin, PostService.delete);

export default router;

//"https://Localhost:3000/post?idx=3000" => req.qurey.idx = 3000;
//"https://Localhost:3000/post/35" => req.params.postId = 35
