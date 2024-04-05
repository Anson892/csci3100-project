const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  }
  else {
    cb("Uploaded file is not an image", false);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __imageDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-product-${file.originalname}`);
  },
});

const uploadFiles = multer({ 
  storage: storage,
  limit: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});


module.exports = uploadFiles;