import dotenv from 'dotenv';
import express from 'express';
import Joi from 'joi';
import mongoose from 'mongoose';
import * as taskController from './controllers/task_controller.js';

dotenv.config();
//console.log(process.env); 
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const app = express();
app.use(express.json())
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));
let tasks = [
    { 
        title: "Oleg etogo daze ne yvidit,",
        description: "i zachem ya togda eto pishy?",
        status: 'completed',
        priority: 5, 
        dueDate: new Date('2025-12-15') 
    },
    { 
        title: "ya hotya bi ne delayu blok shemi kak on", 
        description: "",
        status: 'pending', 
        priority: 4, 
        dueDate: new Date('2025-12-08')
    },
    {
        title: "fotochka insertion",
        description: "Vstavit' kruto.jpg v footer proekta",
        dueDate: new Date('2025-12-20')
    }
];
//let nextId = 3;

const taskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)  
        .required(),
    description: Joi.string()
      .trim()
      .allow('')
      .optional(), 
    priority: Joi.number()
      .integer()
      .min(1).max(5)
      .optional(),
});

mongoose.connect(DB_URI)
  .then(() => console.log("✅ Підключено до MongoDB Atlas"))
  .catch(err => console.error("❌ Помилка підключення:", err));


const currentUser = await taskController.getUserInfo();
const tasksArray = await taskController.getAllTasks();
app.get("/tasks", async (req, res) => {
  res.render('tasks', { tasks: tasksArray, user: currentUser });
});
//getstatus
app.get("/api/tasks/status", async (req, res) => {
  try {
    tasks = await taskController.getTasksByStatus(req.query.status);
    res.json(tasks);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

//summary
app.get("/api/tasks/summary", async (req, res) => {
    try {
        const summary = await taskController.getTasksSummary(); 
        res.json(summary);
        
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});
//getus
app.get("/api/users", async (req, res) => {
  try {
    users = await taskController.getUserInfo();
    res.json(users);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

//getall
app.get("/api/tasks", async (req, res) => {
  //res.json(tasks);
  try {
    tasks = await taskController.getAllTasks();
    res.status(201).json(tasks);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

//getid
app.get("/api/tasks/:id", async (req, res) => {
  try {
    tasks = await taskController.getTaskById(req.params.id);
    res.json(tasks);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
});


//create
app.post("/api/tasks", async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }

  try {
    const newTask = await taskController.createTask(req.body);
    res.status(201).json(newTask);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).json({message: e.message})
    }
    res.status(500).json({message: 'Unknown error'})
  }
});

//updData
app.put('/api/tasks/:id', async (req, res) => {
    const id = req.params.id; 
    const updData = req.body; 
    try {
        const updatedTask = await taskController.updateTask(id, updData);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Can not find task' });
        }
        res.status(200).json(updatedTask);
        
    } catch (e) {
        if (e.name === 'ValidationError') {
            return res.status(400).json({ error: e.message });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

//updStatus
app.put('/api/tasks/:id', async (req, res) => {
    const id = req.params.id; 
    try {
        const updatedTask = await taskController.updateStatus(id);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Can not find task' });
        }
        res.status(200).json(updatedTask);
        
    } catch (e) {
        if (e.name === 'ValidationError') {
            return res.status(400).json({ error: e.message });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});


app.delete("/api/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedTask = await taskController.deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Can not find task' });
    }
    res.status(200).json()
  } catch (e) {
       if (e.name === 'ValidationError') {
          return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ message: 'Server Error' });
  }
});
app.listen(PORT, () => {
console.log(`Server is running at
http://localhost:${PORT}`);
});
