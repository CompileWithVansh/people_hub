const db = require('../config/db');

async function findByEmail(email) {
  const [rows] = await db.query('SELECT * FROM employees WHERE email = ?', [email]);
  return rows[0];
}

async function findByCode(code) {
  const [rows] = await db.query('SELECT * FROM employees WHERE employeeCode = ?', [code]);
  return rows[0];
}

async function findById(id) {
  const [rows] = await db.query(
    `SELECT e.*, d.departmentName 
     FROM employees e 
     LEFT JOIN departments d ON e.departmentId = d.id 
     WHERE e.id = ?`,
    [id]
  );
  return rows[0];
}

async function getAll({ page, limit, search, departmentId, status }) {
  const offset = (page - 1) * limit;
  const conditions = [];
  const values = [];

  if (search) {
    conditions.push('(e.fullName LIKE ? OR e.email LIKE ? OR e.employeeCode LIKE ?)');
    values.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (departmentId) {
    conditions.push('e.departmentId = ?');
    values.push(departmentId);
  }

  if (status) {
    conditions.push('e.status = ?');
    values.push(status);
  }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  const [countRows] = await db.query(
    `SELECT COUNT(*) as total FROM employees e ${where}`,
    values
  );
  const total = countRows[0].total;

  const [rows] = await db.query(
    `SELECT e.*, d.departmentName 
     FROM employees e 
     LEFT JOIN departments d ON e.departmentId = d.id 
     ${where} 
     ORDER BY e.createdAt DESC 
     LIMIT ? OFFSET ?`,
    [...values, Number(limit), Number(offset)]
  );

  return { rows, total };
}

async function create(data) {
  const { employeeCode, fullName, email, mobile, departmentId, designation, salary, status } = data;
  const [result] = await db.query(
    `INSERT INTO employees (employeeCode, fullName, email, mobile, departmentId, designation, salary, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [employeeCode, fullName, email, mobile, departmentId, designation, salary, status || 'Active']
  );
  return result.insertId;
}

async function update(id, data) {
  const { fullName, email, mobile, departmentId, designation, salary } = data;
  await db.query(
    `UPDATE employees SET fullName = ?, email = ?, mobile = ?, departmentId = ?, designation = ?, salary = ? 
     WHERE id = ?`,
    [fullName, email, mobile, departmentId, designation, salary, id]
  );
}

async function remove(id) {
  await db.query('DELETE FROM employees WHERE id = ?', [id]);
}

async function updateStatus(id, status) {
  await db.query('UPDATE employees SET status = ? WHERE id = ?', [status, id]);
}

async function getAllForExport() {
  const [rows] = await db.query(
    `SELECT e.employeeCode, e.fullName, e.email, e.mobile, d.departmentName, e.designation, e.salary, e.status, e.createdAt
     FROM employees e
     LEFT JOIN departments d ON e.departmentId = d.id
     ORDER BY e.createdAt DESC`
  );
  return rows;
}

module.exports = { findByEmail, findByCode, findById, getAll, create, update, remove, updateStatus, getAllForExport };
