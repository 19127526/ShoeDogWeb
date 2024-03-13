const categoryModel = require('../models/category.js');
const productModel = require('../models/product.js');
exports.getAllCategories = async (req, res) => {
    try{
        const categories = await categoryModel.getCategory()
        return res.status(200).json({"status": "success", "data": categories});
    }catch (e) {
        console.log(e)
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.addCategory = async (req, res) => {
    try{
        const category = req.body;

        const data = {
            ParentId: category?.ParentId,
            CatName: category?.CatName
        }
        const result = await categoryModel.addCategory(data);
        return res.status(200).json({"status": "success", "data": result});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteCategory = async (req, res) => {
    try{
        const id = req.params.id;
        const removeCate = await categoryModel.deleteCategory(id);
        await productModel.deleteProductByCatId(id);
        return res.status(200).json({"status": "success", "data": removeCate});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateCategory = async (req, res) => {
    try{
        const id = req.params.id;
        const category = req.body;
        console.log(id, category)
        const result = await categoryModel.updateCategory(id, category);
        return res.status(200).json({"status": "success", "data": result});
    }catch (e) {
        console.log(e.message)
        return res.status(500).json({"status": "error", "message": e.message});
    }
}
