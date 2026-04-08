const express = require('express');
require('./db');
const Task = require('./models/Task');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API is running' });
});

// List all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ id: 1 }).lean();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Create a task
app.post('/tasks', async (req, res) => {
    try {
        const { name, status } = req.body;
        const last = await Task.findOne().sort({ id: -1 }).lean();
        const nextId = last ? last.id + 1 : 1;
        const t = await Task.create({ id: nextId, name, status });
        res.status(201).json(t);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updated = await Task.findOneAndUpdate({ id }, req.body, { new: true }).lean();
        if (!updated) return res.status(404).json({ error: 'Task not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const removed = await Task.findOneAndDelete({ id }).lean();
        if (!removed) return res.status(404).json({ error: 'Task not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Seed initial tasks if empty
async function seed() {
    const count = await Task.countDocuments();
    if (count === 0) {
        const seedTasks = [
            { id: 1, name: 'Grocery Shopping', status: 'pending' },
            { id: 2, name: 'Clean the house', status: 'in-progress' },
            { id: 3, name: 'Pay bills', status: 'completed' },
            { id: 4, name: 'Walk the dog', status: 'pending' },
            { id: 5, name: 'Read a book', status: 'in-progress' },
            { id: 6, name: 'Exercise', status: 'pending' }
        ];
        await Task.insertMany(seedTasks);
        console.log('Seeded initial tasks');
    }
}

app.listen(port, async () => {
    await seed();
    console.log(`Task Manager app listening on port ${port}`);
});
