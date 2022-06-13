// middleware de configuration de multer
// importation de multer
const multer = require('multer');
// création d'un dictionnaire de types de fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'jpg'
}
// création d'un objet de configuration pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    } 
});

// export du middleware
module.exports = multer({ storage }).single('image');