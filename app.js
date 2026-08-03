const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const departmentRoutes = require('./routes/department.routes');
const employeeRoutes = require('./routes/employee.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);
app.use('/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
