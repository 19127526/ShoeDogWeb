const product = require('../models/product');
const category = require('../models/category');
exports.getAllProducts = async (req, res) => {
    try {
        const products = await product.getProducts();
        return res.status(200).json({"status": "success", "data": products});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}


exports.getProductsById = async (req, res) => {
    try {
        const catId = req.params.id;
        const products = await product.getProductsByCatId(catId);
        console.log(products)
        return res.status(200).json({"status": "success", "data": products});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.searchProduct = async (req, res) => {
    try {
        const products = await product.searchProducts(req.body.productName);
        return res.status(200).json({"status": "success", "data": products});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getDetailProductByProId = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await product.getDetailProductsByProId(id);
        if (result.length == 0) {
            return res.status(200).json({"status": "empty", "message": result});
        } else {
            return res.status(200).json({"status": "success", "data": result});
        }
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }

}

const cloudinary = require("../utils/imageUpload");
// program to generate random strings

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
console.log(generateString(6));

exports.addProduct = async (req, res) => {
    try {
        const productBody = req.body;
        const catName = req.body.category;
        const catId = await category.getCategoryById(catName);
        const random = generateString(6);
        const productAdd = {
            Inventory: random,
            ProName: productBody.name,
            Price: productBody.price,
            Des: productBody.des,
            ShortDes: productBody.shortDes,
            StatusPro: productBody.status,
            Quantity: productBody.quantity,
            Size: productBody.size,
            Color: productBody.color,
            Discount: productBody.discount,
            DateStart: new Date(),
            TotalPrice: productBody.total,
            CatId: catId.CatId
        }
        const productId = await product.addProduct(productAdd);
        const productFinding = await product.getDetailProductsByProId(productId);
        const arrayFile = req.files;
        const arrayImage = [];
        for (let i = 0; i < arrayFile.length; i++) {
            const rs = await cloudinary.uploader.upload(arrayFile[i].path, {
                folder: `shoedog/${catName}`,
                public_id: `${arrayFile[i].originalName}_${arrayFile[i].filename}`,
                width: 500,
                height: 500,
                crop: "fill"
            })
            arrayImage.push(rs.secure_url)
        }
        if (arrayImage.length > 0) {
            await product.updateImageMain(productId, arrayImage[0]);
        }
        const productStr = arrayImage.join(", ");
        await product.updateArrayImage(productId, productStr);
        return res.status(200).json({"status": "success", "data": productFinding});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.body.id;
        console.log(req.body.id)
        const result = await product.deleteProduct(id);
        return res.status(200).json({"status": "success", "data": result});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.body.id;
        const product = req.body;
        const result = await product.updateProduct(id, product);
        return res.status(200).json({"status": "success", "data": result});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}
