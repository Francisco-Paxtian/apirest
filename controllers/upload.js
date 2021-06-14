const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
});

const upload = multer({ storage: storage });

exports.upload = upload.single('file');
exports.uploadFile = (req, res) => {
    res.send({ data: 'hola '});    
}