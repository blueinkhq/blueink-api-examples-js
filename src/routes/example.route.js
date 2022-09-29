const express = require('express');
const multer = require('multer');
const upload = multer();

const examples = require('../controller/example.controller');

const router = express.Router();

router.get('/upload', examples.fileUpload)
router.post('/upload', upload.single('file'), examples.fileUpload)

module.exports = router;