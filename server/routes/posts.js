import Express from "express";

import { getPosts, createPosts, updatePost, deletePost } from "./controllers/posts.js"

const router = Express.Router();

router.get('/', getPosts);
router.post('/', createPosts);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost)

export default router;