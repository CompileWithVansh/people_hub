const db = require('../config/db');

async function getDashboard(req, res) {
  try {
    const [[{ totalEmployees }]] = await db.query('SELECT COUNT(*) as totalEmployees FROM employees');
    const [[{ activeEmployees }]] = await db.query("SELECT COUNT(*) as activeEmployees FROM employees WHERE status = 'Active'");
    const [[{ inactiveEmployees }]] = await db.query("SELECT COUNT(*) as inactiveEmployees FROM employees WHERE status = 'Inactive'");
    const [[{ totalDepartments }]] = await db.query('SELECT COUNT(*) as totalDepartments FROM departments');

    const [employeesByDepartment] = await db.query(
      `SELECT d.departmentName, COUNT(e.id) as employeeCount 
       FROM departments d 
       LEFT JOIN employees e ON d.id = e.departmentId 
       GROUP BY d.id, d.departmentName`
    );

    res.json({
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalDepartments,
      employeesByDepartment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getDashboard };
