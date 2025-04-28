const express = require('express');
const { getTasks, createTask, updateTaskStatus, deleteTask } = require('../controllers/task.controller');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect)

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTaskStatus);
router.delete('/:id', deleteTask);

module.exports = router;
