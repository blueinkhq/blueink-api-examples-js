const express = require('express');
const multer = require('multer');
const upload = multer();

const examples = require('../controller/example.controller');

const router = express.Router();

router.get('/upload', examples.fileUpload)
router.post('/upload', upload.single('file'), examples.fileUpload)
router.use('/template', examples.template);
router.use('/url', examples.url);
router.use('/b64', examples.b64);


module.exports = router;