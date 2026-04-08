const express = require('express');
const app = express();
const port = 3000;

// In-memory task list (will be replaced with database in Task 1)
let tasks = [
    { id: 1, name: 'Grocery Shopping', status: 'pending' },
    { id: 2, name: 'Clean the house', status: 'in-progress' },
    { id: 3, name: 'Pay bills', status: 'completed' },
    { id: 4, name: 'Walk the dog', status: 'pending' },
    { id: 5, name: 'Read a book', status: 'in-progress' },
    { id: 6, name: 'Exercise', status: 'pending' }
];

app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API is running' });
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.listen(port, () => {
    console.log(`Task Manager app listening on port ${port}`);
});
