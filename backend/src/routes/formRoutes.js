
const express = require('express');
const router = express.Router();
const { submitFormData } = require('../controller/formController');
const { populatePDF } = require('../controller/formController')


router.post('/saveFormData', submitFormData);
router.get('/populatePDF', populatePDF)

module.exports = router;
