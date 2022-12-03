const product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try{
        const products = await product.getProducts();
        return res.status(200).json({"status": "success", "data": products});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.addProduct = async (req, res) => {
    try{
        const product = req.body;
        const result = await product.addProduct(product);
        return res.status(200).json({"status": "success", "data": result});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const id = req.body.id;
        const result = await product.deleteProduct(id);
        return res.status(200).json({"status": "success", "data": result});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateProduct = async (req, res) => {
    try{
        const id = req.body.id;
        const product = req.body;
        const result = await product.updateProduct(id, product);
        return res.status(200).json({"status": "success", "data": result});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}
