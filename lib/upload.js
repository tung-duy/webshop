const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    const fullName = file.originalname;
    const extensionFile = path.extname(fullName);
    const baseName = path
      .basename(fullName, extensionFile)
      .trim()
      .replace(/ /g, "-");
    cb(null, baseName + "-" + Date.now() + extensionFile);
  }
});
module.exports = upload = multer({ storage: storage });
