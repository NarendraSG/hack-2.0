const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({ origin: '*' })); // Allow requests from any origin

// In-memory storage for student records
let students = [];

// GET endpoint to retrieve all student records
app.get('/students', (req, res) => {
  res.json(students);
});

// POST endpoint to add a new student record
app.post('/students', (req, res) => {
  const { name, id, department } = req.body;

  if (!name || !id || !department) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newStudent = {
    name,
    id,
    department,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// PUT endpoint to update a student record by ID
app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, department } = req.body;

  const studentIndex = students.findIndex((student) => student.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  students[studentIndex] = {
    ...students[studentIndex],
    name: name || students[studentIndex].name,
    department: department || students[studentIndex].department,
  };

  res.json(students[studentIndex]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
