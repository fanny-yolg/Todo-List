const router = require('express').Router();

const TodoController = require('../controllers/todo')
// const requireAuth = require("../middleware/requireAuth")

// router.use(requireAuth)

router.get('/', TodoController.getAll)
router.get('/:id', TodoController.getTodo)
router.post('/', TodoController.createTodo)
router.put('/:id', TodoController.updateTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router;