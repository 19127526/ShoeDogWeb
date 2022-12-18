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

        if (products.length === 0) {
            return res.status(200).json({"status": "empty", "data": products});
        }
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
        console.log(result)
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
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

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
            Brand: productBody.brand,
            Des: productBody.des,
            ShortDes: productBody.shortDes,
            StatusPro: productBody.status,
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
        const imageId = [];
        for (let i = 0; i < arrayFile.length; i++) {
            const rs = await cloudinary.uploader.upload(arrayFile[i].path, {
                folder: `shoedog/${catName}`,
                public_id: `${arrayFile[i].originalname}_${arrayFile[i].filename}`,
                width: 500,
                height: 500,
                crop: "fill"
            })
            arrayImage.push(rs.secure_url)
            imageId.push(rs.public_id)
        }
        if (arrayImage.length > 0) {
            await product.updateImageMain(productId, arrayImage[0]);
            const productStr = arrayImage.join(", ");
            await product.updateArrayImage(productId, productStr);
            const imageIdStr = imageId.join(", ");
            await product.updateImageId(productId, imageIdStr);
        }

        return res.status(200).json({"status": "success", "data": productFinding});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.body.id;
        const result = await product.deleteProduct(id);
        return res.status(200).json({"status": "success", "data": result});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const products = req.body
        const ProductId = products.ProId;
        const initProduct = {
            ProName: products.name,
            Des: products.des,
            ShortDes: products.shortDes,
            StatusPro: products.status,
            Size: products.size,
            Color: products.color,
            Discount: products.discount,
            TotalPrice: products.total,
            Price: products.price,
            Brand: products.brand,
        }
        const updateProduct = await product.updateProduct(ProductId, initProduct)
        const productAfterUpdate = await product.getDetailProductsByProId(ProductId)
        if (productAfterUpdate.length <= 0) return res.status(200).json({"status": "empty", "data": productAfterUpdate});
        const catName = productAfterUpdate[0].CatName;
        const imageId = await product.getImageIdByProId(ProductId)
        if (imageId.length > 0) {
            const arrayImageId = imageId[0].ImageId.split(", ");
            for (let i = 0; i < arrayImageId.length; i++) {
                await cloudinary.uploader.destroy(arrayImageId[i])
            }
            const arrayFile = req.files;
            const arrayImage = [];
            const imageId_1 = [];
            for (let i = 0; i < arrayFile.length; i++) {
                const rs = await cloudinary.uploader.upload(arrayFile[i].path, {
                    folder: `shoedog/${catName}`,
                    public_id: `${arrayFile[i].originalname}_${arrayFile[i].filename}`,
                    width: 500,
                    height: 500,
                    crop: "fill"
                })
                arrayImage.push(rs.secure_url)
                imageId_1.push(rs.public_id)
            }
            if (arrayImage.length > 0) {
                await product.updateImageMain(ProductId, arrayImage[0]);
                const productStr = arrayImage.join(", ");
                await product.updateArrayImage(ProductId, productStr);
                const imageIdStr = imageId_1.join(", ");
                await product.updateImageId(ProductId, imageIdStr);
            }
            return res.status(200).json({"status": "success", "data": updateProduct});
        }else return res.status(500).json({"status": "error", "message": "Can not find user"});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getAllBrandsInProducts = async (req, res) => {
    try {
        const brands = await product.getAllBrands();
        return res.status(200).json({"status": "success", "data": brands});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.relatedProduct = async (req, res) => {
    try {
        const productBody = req.body;
        console.log(req.params)
        console.log("dsd")
        console.log(productBody)
        return res.status(200).json({"status": "success", "data": "sd"});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.searchProductByCatId = async (req, res) => {
    try {
        const productBody = req.body;
        const searchProduct = {
            proName: productBody.productName,
            catId: productBody.catId
        }
        console.log(searchProduct)
        const listProduct = await product.searchProductsByCatId(searchProduct)
        return res.status(200).json({"status": "success", "data": listProduct});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}



