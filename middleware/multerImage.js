const multer = require("multer");

const storage = multer.diskStorage({ // Storage for posters uploading
    destination: (req, file, cb) => {
      cb(null, "../uplaods/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|svg/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);

      if (mimeType && extName) {
        return cb(null, true);
      } else {
        cb("Error: You can Only Upload Images!!");
      }
    },
});

module.exports = { upload };