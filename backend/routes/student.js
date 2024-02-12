const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes for student authentication, registration, and view specifications
router.post('/register', studentController.register);
router.get('/view-specifications', studentController.viewSpecifications);

module.exports = router;
