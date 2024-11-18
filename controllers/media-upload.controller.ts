import { Request, Response, NextFunction } from "express";
import { Media } from "../models/Media.model";
import successMiddleware from "../utils/success.response";
import { MediaType } from "../enum/media.enum";
import { AppError } from "../utils/error";

export const fileUploadHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) return next(new AppError("File not provided!", 400));
    const mediaEntries = [];
    const media = new Media();
    media.type = MediaType.IMAGE;
    media.url = `/public/uploads/${req.file.filename}`;

    await media.save();
    mediaEntries.push(media);

    successMiddleware(
      {
        message: "Media uploaded successfully!",
        data: mediaEntries,
      },
      res
    );
  } catch (error: unknown) {
    console.error("Error uploading media:", error);
    return next(error);
  }
};

export const uploadMultipleMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];

    // Check if files exist
    if (!files || files.length === 0) {
      return next(new AppError("File not provided!", 400));
    }

    const mediaEntries = [];

    for (const file of files) {
      const media = new Media();
      media.url = `/public/uploads/${file.filename}`;

      if (file.mimetype.startsWith("image/")) {
        media.type = MediaType.IMAGE;
      } else if (file.mimetype === "application/pdf") {
        media.type = MediaType.PDF;
      } else if (
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        media.type = MediaType.DOCUMENT;
      } else {
        return next(
          new AppError(
            "Unsupported file format! Only images, PDFs, and Word documents are allowed.",
            400
          )
        );
      }

      await media.save();
      mediaEntries.push(media);
    }
    successMiddleware(
      {
        message: "Media uploaded successfully!",
        data: mediaEntries,
      },
      res
    );
  } catch (error) {
    console.error("Error uploading media:", error);
    next(error);
  }
};
