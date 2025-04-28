const Task = require('../models/task.model');

exports.getTasks = async (req, res) => {
  const { status } = req.query;
  try {
    let query = { userId: req.user};

    if (status === 'active') {
      query.status = 'incomplete'; 
    } else if (status === 'completed') {
      query.status = 'complete';
    } 

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  try {
    const task = await Task.create({
      userId: req.user,
      title,
      description,
      priority
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id, userId: req.user });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = task.status === 'incomplete' ? 'complete' : 'incomplete';
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user});
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
