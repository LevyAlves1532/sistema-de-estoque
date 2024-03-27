const { diskStorage } = require("multer");
const multer = require("multer");
const path = require("path");

const acceptUploadImages = ["image/png","image/jpg","image/jpeg"];

const storage = diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "..", "public", "assets", "uploads"));
  },
  filename: function(req, file, cb) {
    const extensionFile = file.originalname.split(".")[1];
    const newFileName = require("crypto").randomBytes(24).toString("hex");
    cb(null, `${newFileName}.${extensionFile}`);
  },
});

const uploads = multer({ 
  fileFilter: function(req, file, cb) {
    if (!acceptUploadImages.includes(file.mimetype)) {
      req.flash("errors", ["Tipo de arquivo não suportado (*.png, *.jpg)"]);
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
  storage 
});

module.exports = uploads;
