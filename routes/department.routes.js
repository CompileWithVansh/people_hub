const express = require('express');
const router = express.Router();
const { createDepartment, getDepartments, updateDepartment, deleteDepartment } = require('../controllers/department.controller');
const { validateId } = require('../middlewares/validate');

router.post('/', createDepartment);
router.get('/', getDepartments);
router.put('/:id', validateId, updateDepartment);
router.delete('/:id', validateId, deleteDepartment);

module.exports = router;
