const categoryModel = require('../models/category.js');
exports.getAllCategories = async (req, res) => {
    try{
        const categories = await categoryModel.getCategory()
        return res.status(200).json({"status": "success", "data": categories});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.addCategory = async (req, res) => {
    try{
        const category = req.body;
        const result = await categoryModel.addCategory(category);
        return res.status(200).json({"status": "success", "data": result});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteCategory = async (req, res) => {
    try{
        const id = req.body.id;
        const result = await categoryModel.deleteCategory(id);
        return res.status(200).json({"status": "success", "data": result});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateCategory = async (req, res) => {
    try{
        const id = req.body.id;
        const category = req.body;
        const result = await categoryModel.updateCategory(id, category);
        return res.status(200).json({"status": "success", "data": result});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}
