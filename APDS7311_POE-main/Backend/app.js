// Import the Express module
const express = require('express');

// Create an instance of Express
const app = express();

// Define a port for the server
const PORT = process.env.PORT || 3000;

// Create a basic route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to the Express server.');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let todolist = [];

// Get all todolist
app.get('/todolist', (req, res) => {
    res.json(todolist);
});

// Create a new todolist
app.post('/todolist', (req, res) => {
    const todolist = req.body;
    todolist.push(todolist);
    res.status(201).json(todolist);
});

// Update a todolist by ID
app.put('/todolist/:id', (req, res) => {
    const id = req.params.id;
    const index = todolist.findIndex(todolist => todolist.id === id);
    if (index !== -1) {
        todolist[index] = req.body;
        res.json(todolist[index]);
    } else {
        res.status(404).json({ message: "Todolist not found" });
    }
});

// Delete a todolist by ID
app.delete('/todolist/:id', (req, res) => {
    const id = req.params.id;
    todolist = todolist.filter(todolist => todolist.id !== id);
    res.status(204).send();
});
