const multer = require('multer');


//uploads prod img
const storageMulti = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname +'.png')
    }
})
const uploadMulti = multer({ storage: storageMulti }).fields([{ name: 'prodImgs', maxCount: 4 }])




module.exports = { uploadMulti }