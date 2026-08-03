const Employee = require('../models/employee.model');
const Department = require('../models/department.model');

async function createEmployee(req, res) {
  try {
    const { employeeCode, email, departmentId } = req.body;

    if (employeeCode) {
      const codeExists = await Employee.findByCode(employeeCode);
      if (codeExists) {
        return res.status(400).json({ message: 'Employee code already exists' });
      }
    }

    if (email) {
      const emailExists = await Employee.findByEmail(email);
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    if (departmentId) {
      const dept = await Department.findById(departmentId);
      if (!dept) {
        return res.status(400).json({ message: 'Department does not exist' });
      }
    }

    const id = await Employee.create(req.body);
    res.status(201).json({ message: 'Employee created', id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getEmployees(req, res) {
  try {
    const { page = 1, limit = 10, search, departmentId, status } = req.query;

    const { rows, total } = await Employee.getAll({ page, limit, search, departmentId, status });

    res.json({
      data: rows,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getEmployeeById(req, res) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const { email, departmentId } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (email) {
      const emailExists = await Employee.findByEmail(email);
      if (emailExists && emailExists.id != id) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    if (departmentId) {
      const dept = await Department.findById(departmentId);
      if (!dept) {
        return res.status(400).json({ message: 'Department does not exist' });
      }
    }

    await Employee.update(id, req.body);
    res.json({ message: 'Employee updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteEmployee(req, res) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await Employee.remove(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Active or Inactive' });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await Employee.updateStatus(id, status);
    res.json({ message: `Employee status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function exportEmployees(req, res) {
  try {
    const employees = await Employee.getAllForExport();

    const headers = ['Employee Code', 'Full Name', 'Email', 'Mobile', 'Department', 'Designation', 'Salary', 'Status', 'Created At'];
    const rows = employees.map(e =>
      [e.employeeCode, e.fullName, e.email, e.mobile, e.departmentName, e.designation, e.salary, e.status, e.createdAt].join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=employees.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, updateStatus, exportEmployees };
