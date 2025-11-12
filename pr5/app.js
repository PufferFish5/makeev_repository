import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
//console.log(process.env); 
const PORT = process.env.PORT;
const app = express();
app.use(express.json())
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));
let tasks = [{ id: 1, title: "Cool thing to do 1", completed: false },
             { id: 2, title: "Cool thing to do 2", completed: false }];
let nextId = 3;

app.get('/tasks', (req, res) => {
  res.render('tasks', { tasks });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required. Try to request in specified format: { 'title': 'taskName' }" });
  }
  const newTask = {
    id: nextId++,
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.completed = !task.completed;
  res.status(200).json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
console.log(`Server is running at
http://localhost:${PORT}`);
});