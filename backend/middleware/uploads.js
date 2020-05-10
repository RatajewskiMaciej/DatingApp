const multer = require("multer")

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

let upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
}).single("avatar")

module.exports = upload