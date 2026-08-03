# People Hub API

Backend assessment project. Node.js + Express + MySQL.

---

## Setup

1. Install packages
```
npm install
```

2. Run `people_hub.sql` in MySQL to create the database and tables

3. Fill in `.env`
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=people_hub
```

4. Start server
```
npm run dev
```

Runs on http://localhost:3000

---

## Endpoints

### Departments
- `POST /departments` — create department
- `GET /departments` — get all
- `PUT /departments/:id` — update name
- `DELETE /departments/:id` — delete (fails if employees exist)

### Employees
- `POST /employees` — add employee
- `GET /employees` — list with pagination, search, filters
- `GET /employees/:id` — get one employee (includes department name)
- `PUT /employees/:id` — update employee
- `DELETE /employees/:id` — delete
- `PATCH /employees/:id/status` — set Active or Inactive
- `GET /employees/export` — download CSV

### Dashboard
- `GET /dashboard` — total employees, active/inactive count, per department count

---

## Postman Collection

File: `people-hub.postman_collection.json` is included in the repo.

To use it:
1. Open Postman
2. Click **Import** (top left)
3. Select the file `people-hub.postman_collection.json`
4. All requests will load under a collection called **People Hub API**
5. The base URL is already set to `http://localhost:3000` — just start the server and hit Send

---

## Filters for GET /employees

```
/employees?page=1&limit=10&search=john&departmentId=2&status=Active
```

---

## Validations

- fullName is required
- email must be unique
- employeeCode must be unique
- mobile — digits only
- departmentId must exist
