const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateStatus,
  exportEmployees,
} = require('../controllers/employee.controller');
const { validateEmployee, validateId } = require('../middlewares/validate');

router.get('/export', exportEmployees);
router.post('/', validateEmployee, createEmployee);
router.get('/', getEmployees);
router.get('/:id', validateId, getEmployeeById);
router.put('/:id', validateId, validateEmployee, updateEmployee);
router.delete('/:id', validateId, deleteEmployee);
router.patch('/:id/status', validateId, updateStatus);

module.exports = router;
