import Express from "express";

import { getPosts, createPosts } from "./controllers/posts.js"

const router = Express.Router();

router.get('/', getPosts);
router.post('/', createPosts);

export default router;