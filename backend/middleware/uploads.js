const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

let uploads = multer({
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

module.exports = uploads