const router = require('express').Router();

const CategoryController = require('../controllers/category')

router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getCategory)
router.post('/', CategoryController.createCategory)
router.put('/:id', CategoryController.updateCategory)
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router;