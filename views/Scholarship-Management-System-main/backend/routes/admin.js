const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to handle admin updates
router.put('/update', adminController.update);

// Route to handle admin deletion
router.delete('/delete', adminController.delete);

// Route to handle admin view
router.get('/view', adminController.view);

module.exports = router;
