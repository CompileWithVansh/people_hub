const Department = require('../models/department.model');

async function createDepartment(req, res) {
  try {
    const { departmentName } = req.body;

    if (!departmentName) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const existing = await Department.findByName(departmentName);
    if (existing) {
      return res.status(400).json({ message: 'Department already exists' });
    }

    const id = await Department.create(departmentName);
    res.status(201).json({ message: 'Department created', id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getDepartments(req, res) {
  try {
    const departments = await Department.getAll();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateDepartment(req, res) {
  try {
    const { id } = req.params;
    const { departmentName } = req.body;

    if (!departmentName) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const dept = await Department.findById(id);
    if (!dept) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const existing = await Department.findByName(departmentName);
    if (existing && existing.id != id) {
      return res.status(400).json({ message: 'Department name already taken' });
    }

    await Department.update(id, departmentName);
    res.json({ message: 'Department updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteDepartment(req, res) {
  try {
    const { id } = req.params;

    const dept = await Department.findById(id);
    if (!dept) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const hasEmployees = await Department.hasEmployees(id);
    if (hasEmployees) {
      return res.status(400).json({ message: 'Cannot delete department with existing employees' });
    }

    await Department.remove(id);
    res.json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createDepartment, getDepartments, updateDepartment, deleteDepartment };
