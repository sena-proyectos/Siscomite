import { Router } from "express";
import { createArticle, getArticle } from "../controller/article.controller.js";
import { checkArticleData } from './../middlewares/article.middlewares.js'

const router = Router();

router.get('/articles', getArticle);
router.post('/createArticle', checkArticleData, createArticle);

export default router
