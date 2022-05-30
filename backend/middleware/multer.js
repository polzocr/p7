const express = require('express');
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif':'gif'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename:(req,file,callback) => {
        if(Object.keys(MIME_TYPES).includes(file.mimetype)){
            const name = file.originalname.split('.')[0].split(' ').join('_'); //file.originalname.split('.')[0].split(' ').join('_');
            const extension = MIME_TYPES[file.mimetype];
            return callback(null, name + Date.now() + '.' + extension);
        } else {
            const error = new Error('Wrong file type')
            error.code = "FILE_TYPE"
            return callback(error , false)
        }
    }
});



module.exports = multer({storage}).single('image');