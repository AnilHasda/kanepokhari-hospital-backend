import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import TestRouter from "../routes/routes.js";
import errorHandler from "../helpers/errorHandler.helper.js";

import NoticeRouter from "../routes/notice.route.js";

const app = express();
app.use(cors());
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// PDF static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/v1/", TestRouter);
app.use("/api/v1/", NoticeRouter);

app.use(errorHandler);

export default app;
