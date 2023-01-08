const product = require('../models/product');


const category = require('../models/category');


const convertArrayToOptions=(arr,splitIndex)=>{
    if(arr===null){
        return null
    }
    else{
        return arr.split(splitIndex)
    }
}
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
            CatId: catId.CatId,
            ProName: productBody.name,
            Des: productBody.des,
            ShortDes: productBody.shortDes,
            StatusPro: productBody.status,
            Brand: productBody.brand,
            Size: productBody.size,
            Quantity: productBody.quantity,
            Price: productBody.price,
            Discount: productBody.discount,
            TotalPrice: productBody.totalPrice,
            Color: productBody.color,
            DateStart: new Date(),
        }

        const productId = await product.addProduct(productAdd);
        const productFinding = await product.getDetailProductsByProId(productId);
        const arrayFile = req.files;
        const arrayImage = [];
        const imageId = [];
        for (let i = 0; i < arrayFile.length; i++) {
            const rs = await cloudinary.uploader.upload(arrayFile[i].path, {
                folder: `shoedog/${catName}`,
                public_id: `${arrayFile[i].filename}`,
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
        const productFinding = await product.getProductById(id);
        if (productFinding.length <= 0) return res.status(200).json({"status": "empty", "message": "Product not found"});
        const imageId = productFinding[0].ImageId.split(", ");
        for (let i = 0; i < imageId.length; i++) {
            await cloudinary.uploader.destroy(imageId[i]);
        }
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
        const cateName = req.body.category;

        const catId = await category.getCategoryById(cateName);
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
            CatId: catId.CatId,
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
        const catId = req.body.catId;
        const proId = req.body.proId;
        const tempProducts=await product.relatedProductByCatId(catId);

        const products=tempProducts.filter(index=>index.ProId!==proId)

        return res.status(200).json({"status": "success", "data":products});
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
        const listProduct = await product.searchProductsByCatId(searchProduct)
        return res.status(200).json({"status": "success", "data": listProduct});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getStatisticDay = async (req, res) => {
    try {
        const statistic = await product.getStatisticDay();
        const data = statistic[0][0].total_cost?statistic[0][0].total_cost:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getStatisticMonth = async (req, res) => {
    try {
        const statistic = await product.getStatisticMonth();
        const data = statistic[0][0].total_cost?statistic[0][0].total_cost:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getStatisticYear = async (req, res) => {
    try {
        const statistic = await product.getStatisticYear();
        const data = statistic[0][0].total_cost?statistic[0][0].total_cost:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getMaxQuantityPurchaseDay = async (req, res) => {
    try {
        const limit= req.query.limit;
        const statistic = await product.getMaxQuantityPurchase(limit);
        const data = statistic[0]?statistic[0]:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getMaxQuantityPurchaseMonth = async (req, res) => {
    try {
        const limit= req.query.limit;
        const statistic = await product.getMaxQuantityPurchaseMonth(limit);
        const data = statistic[0]?statistic[0]:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getMaxQuantityPurchaseYear = async (req, res) => {
    try {
        const limit= req.query.limit;
        const statistic = await product.getMaxQuantityPurchaseYear(limit);
        const data = statistic[0]?statistic[0]:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getMinQuantityPurchaseDay = async (req, res) => {
    try {
        const limit= req.query.limit;
        const statistic = await product.getMinQuantityPurchaseDay(limit);
        const data = statistic[0]?statistic[0]:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}
exports.getMinQuantityPurchaseMonth = async (req, res) => {
    try {
        const limit= req.query.limit;
        const statistic = await product.getMinQuantityPurchaseMonth(limit);
        const data = statistic[0]?statistic[0]:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}
exports.getMinQuantityPurchaseYear = async (req, res) => {
    try {
        const limit= req.query.limit;
        const statistic = await product.getMinQuantityPurchaseYear(limit);
        const data = statistic[0]?statistic[0]:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getQuantityInDay = async (req, res) => {
    try {
        const phonenumber= req.query.phone;
        const statistic = await product.getQuantityOrderinDay(phonenumber)
        const data = statistic[0][0]?statistic[0][0]:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getQuantityInMonth = async (req, res) => {
    try {
        const phonenumber= req.query.phone;
        const statistic = await product.getQuantityOrderinMonth(phonenumber)
        const data = statistic[0][0]?statistic[0][0]:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getQuantityInYear = async (req, res) => {
    try {
        const phonenumber= req.query.phone;
        const statistic = await product.getQuantityOrderinYear(phonenumber)
        const data = statistic[0][0]?statistic[0][0]:null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}


exports.getTotalItemSold=async (req,res)=>{
    try {
        const statistic = await product.getAllProductSoldout();
        return res.status(200).json({"status": "success", "data": statistic.length});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

