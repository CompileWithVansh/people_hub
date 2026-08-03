CREATE DATABASE IF NOT EXISTS people_hub;
USE people_hub;

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  departmentName VARCHAR(100) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeCode VARCHAR(20) UNIQUE,
  fullName VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  mobile VARCHAR(15),
  departmentId INT,
  designation VARCHAR(100),
  salary DECIMAL(10,2),
  status ENUM('Active', 'Inactive') DEFAULT 'Active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (departmentId) REFERENCES departments(id)
);
