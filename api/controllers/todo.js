const Todo = require('../models/TodoModel');
const mongoose = require('mongoose');

exports.getAll = async (req, res, next) => {
    try {
        const todos = await Todo.find({}).sort({createdAt: -1}).populate('categoryId');

        res.status(200).json({
          success: true,
          message: 'Successfully retrieve data!',
          data : todos,
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.getTodo = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such todo!"});
    }

    try {
        const todo = await Todo.findById(id);

        if(!todo) {
            return res.status(404).json({error : "No such todo!"});
        }
        res.status(200).json({
          success: true,
          message: 'Successfully retrieve data!',
          data: todo,
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.createTodo = async (req, res, next) => {
    const { title, categoryId, userId } = req.body

    try {
        const todo = await Todo.create({ title, categoryId, userId })
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.updateTodo = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such todo!"});
    }

    try {
        const todo = await Todo.findByIdAndUpdate({ _id: id},{
            ...req.body
        });
        if(!todo) {
            return res.status(404).json({error : "No such todo!"});
        }

        const newTodo = await Todo.findById(id);
        res.status(200).json({
            success: true,
            message: 'Successfully update todo!',
            data: newTodo
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.deleteTodo = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such todo!"});
    }

    try {
        const todo = await Todo.findOneAndDelete({ _id : id });
        if(!todo) {
            return res.statis(404).json({error : "No such todo!"});
        }

        res.status(200).json({
          success: true,
          message: 'Successfully deelete todo!',
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}