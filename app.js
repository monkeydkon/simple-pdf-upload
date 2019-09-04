const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const pdfRoutes = require('./routes/pdf')
const upload = multer({dest: './uploads'});
const app = express();

const fileStorage = multer.diskStorage({                         // to store images
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json());
// app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('upload'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));     // finds absolute path to uploads directory




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//app.use('/pdf', pdfRoutes);

app.post('/upload',multer({storage: fileStorage, fileFilter: fileFilter}).single('upload'), (req, res, next) => {
    let filename;
    let uploadStatus;
    if(req.file){
        console.log('uploading...');
        filename = req.file.filename;
        uploadStatus = 'File Uploaded Successfully';
    }else{
        console.log('No File Uploaded');
        filename = 'File Not Uploaded';
        uploadStatus = 'File Upload Failed';
    }
    res.json({status:uploadStatus, filename: filename});
});

app.use((error, req, res, next) => {                      // general error handling middleware
    console.log(error);
    const status = error.statusCode || 500;        // if error doesnt have status code ->  500 will bne default
    const message = error.message;                 // message exists by default, I dont have to pass it
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(process.env.PORT || 3000);