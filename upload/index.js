const express = require('express');
const multer = require('multer');

const app = express();

const uploadFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, './upload/file');
        },
        filename: function(req,file,cb){
            cb(null, file.fieldname +'_Aviral_' + Date.now() + ".jpg")
        }
    })
}).single("image_file")

app.post('/upload',uploadFile, (req,res)=> {
    console.log('File uploaded');
    res.status(200).send('File uploaded successfully');
})

app.listen(5000)