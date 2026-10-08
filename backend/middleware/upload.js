const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../public/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
