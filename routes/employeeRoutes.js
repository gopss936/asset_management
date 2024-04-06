
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {updateEmployeeValidation,createEmployeeValidation}=require('../utills/validation');

router.get('/', employeeController.getAllEmployees);
router.post('/',createEmployeeValidation, employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', updateEmployeeValidation,employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
