const express = require('express');
const router = express.Router();
const { HandleGetTask,HandleAddTask,HandleDeleteTask,HandleUpdateTask} = require("../controllers/tasks.js");
const checkAllowance = require('../middleware/Auth/checkAllowance.js');
router.get('/tasks',HandleGetTask);
router.post('/tasks',HandleAddTask);
router.post('/tasks/delete',HandleDeleteTask);
router.get('/',checkAllowance,HandleGetTask);
module.exports = router;