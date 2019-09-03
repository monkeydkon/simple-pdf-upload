const express = require('express');

const pdfController = require('../controllers/pdf');

const router = express.Router();

router.post('/uploadpdf', pdfController.postPdf);

module.exports = router;