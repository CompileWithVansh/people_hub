const db = require('../config/db');

async function findByName(name) {
  const [rows] = await db.query('SELECT * FROM departments WHERE departmentName = ?', [name]);
  return rows[0];
}

async function findById(id) {
  const [rows] = await db.query('SELECT * FROM departments WHERE id = ?', [id]);
  return rows[0];
}

async function getAll() {
  const [rows] = await db.query('SELECT * FROM departments ORDER BY createdAt DESC');
  return rows;
}

async function create(name) {
  const [result] = await db.query('INSERT INTO departments (departmentName) VALUES (?)', [name]);
  return result.insertId;
}

async function update(id, name) {
  await db.query('UPDATE departments SET departmentName = ? WHERE id = ?', [name, id]);
}

async function remove(id) {
  await db.query('DELETE FROM departments WHERE id = ?', [id]);
}

async function hasEmployees(id) {
  const [rows] = await db.query('SELECT COUNT(*) as count FROM employees WHERE departmentId = ?', [id]);
  return rows[0].count > 0;
}

module.exports = { findByName, findById, getAll, create, update, remove, hasEmployees };
