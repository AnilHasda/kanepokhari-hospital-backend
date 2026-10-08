import express from "express";
import upload from "../middlewares/pdfUpload.middleware.js";
const router = express.Router();

import {
  createNotice,
  getPublishedNotices,
  getNoticeById,
  deleteNotice,
} from "../controllers/notice.controller.js";

router.get("/", getPublishedNotices);

router.get("/:id", getNoticeById);

router.post("/", upload.single("pdf"), createNotice);

router.delete("/:id", deleteNotice);

export default router;
