
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const hbs = require('hbs');
const logger = require('morgan');

const port =  process.env.PORT || 8080;

const app =  express();
app.use(bodyParser());
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views'); 
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.post('/upload', upload.single('myFile'), (req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }
    
    res.render('index.hbs', { status: uploadStatus, filename: `Name Of File: ${filename}` });
});

app.get('/temp', (req, res) => {
    res.render('temp.hbs');
});

app.listen(port, () => {
    console.log(`App is live on port ${port}`);
});