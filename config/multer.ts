import multer from "multer";
import path from "path";
import { Request } from "express";
// Common storeage config
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, path.join(process.cwd(), "public/uploads"));
  },
  filename: function (req: Request, file: any, cb: any) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// Common file filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image ,PDF and Word document files  are allowed!"),
      false
    );
  }
};

export const uploadFile = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file-size limit
  },
});
