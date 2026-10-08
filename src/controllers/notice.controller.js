import fs from "fs";
import path from "path";

const createNotice = async (req, res) => {
  try {
    const { title, category, description, publishedAt, status } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        category,
        description,
        pdfName: req.file.originalname,
        pdfUrl: `/uploads/notices/${req.file.filename}`,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        status: status || "DRAFT",
      },
    });

    res.status(201).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create notice",
    });
  }
};

const getPublishedNotices = async (req, res) => {
  try {
    const notices = await prisma.notice.findMany({
      where: {
        status: "PUBLISHED",
      },

      orderBy: {
        publishedAt: "desc",
      },
    });

    res.json({
      success: true,
      data: notices,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch notices",
    });
  }
};

const getNoticeById = async (req, res) => {
  try {
    const notice = await prisma.notice.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    res.json({
      success: true,
      data: notice,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notice",
    });
  }
};

module.exports = {
  createNotice,
  getPublishedNotices,
  getNoticeById,
  deleteNotice,
};
