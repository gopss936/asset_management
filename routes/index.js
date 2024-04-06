
const express = require('express');
const router = express.Router();
const employeeRoutes = require('./employeeRoutes');
 const assetRoutes = require('./assetRoutes');


router.use('/employees', employeeRoutes);
router.use('/assets', assetRoutes);


module.exports = router;
