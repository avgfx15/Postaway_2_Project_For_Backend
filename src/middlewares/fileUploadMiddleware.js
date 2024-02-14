import multer from 'multer';


// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, './uploads');
//         // cb(null, path.join(__dirname, './uploads'));
//         console.log('Multer Middleware');
//     },
//     filename: (req, file, cb) => {
//         const filename = new Date().toISOString().replace(/:/g, '_') + file.originalname;
//         console.log(filename);
//         cb(null, filename)
//     }
// })

// const upload = multer({ storage: storage });

// export default upload;



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images');
    },
    filename: function (req, file, cb) {
        const filename = new Date().toISOString().replace(/:/g, '_') + file.originalname;
        cb(null, filename);
    }
});


const upload = multer({
    storage: storage,
    // fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}).fields([{ name: 'images', maxCount: 5 }, { name: 'documents', maxCount: 3 }]);

export default upload;