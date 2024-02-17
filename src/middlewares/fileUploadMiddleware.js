import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // console.log(file);
        if (file.fieldname === "images") {
            // else uploading image 
            cb(null, './uploads/images');
        } else if (file.fieldname === 'documents') {
            // if uploading resume
            cb(null, './uploads/documents');
        } else if (file.fieldname === 'profilepictures') {
            // if uploading resume
            cb(null, './uploads/profilepictures');
        } else {
            console.log('Please specified a file type images or documents');
        }
    },
    filename: function (req, file, cb) {
        const filename = new Date().toISOString().replace(/:/g, '_') + (file.originalname.split(" ").join(""));
        cb(null, filename);
    }
});


const fileFilter = (req, file, cb) => {

    if (file.fieldname === "documents") { // if uploading resume
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) { // check file type to be pdf, doc, or docx
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    } else { // else uploading image
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/webp' ||
            file.mimetype === 'image/gif'
        ) { // check file type to be png, jpeg, or jpg
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    }
};


const upload = multer({
    fileFilter: fileFilter,
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}).fields([{ name: 'images', maxCount: 5 }, { name: 'documents', maxCount: 3 }]);

export default upload;