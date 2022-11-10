const Category = require('../models/CategoryModel');
const mongoose = require('mongoose');

exports.getAll = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({createdAt: -1});
        res.status(200).json({
          success: true,
          message: 'Successfully retrieve data!',
          data: categories,
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.getCategory = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such category!"});
    }

    try {
        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({error : "No such category!"});
        }
        res.status(200).json({
          success: true,
          message: 'Successfully retrieve data!',
          data: category,
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.createCategory = async (req, res, next) => {
    const { name } = req.body;

    try {
        const category = await Category.create({ name });
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.updateCategory = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such category!"});
    }

    try {
        const category = await Category.findByIdAndUpdate({ _id: id},{
            ...req.body
        });
        if(!category) {
            return res.statis(404).json({error : "No such category!"});
        }

        res.status(200).json({
            success: true,
            message: 'Successfully update category!',
            category
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.deleteCategory = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such category!"});
    }

    try {
        const category = await Category.findOneAndDelete({ _id : id });
        if(!category) {
            return res.statis(404).json({error : "No such category!"});
        }

        res.status(200).json({
          success: true,
          message: 'Successfully deelete category!',
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}