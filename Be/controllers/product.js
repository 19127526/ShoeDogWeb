const product = require('../models/product');
const fs = require('fs');
const category = require('../models/category');
const path = require('path');

const convertArrayToOptions = (arr, splitIndex) => {
    if (arr === null) {
        return null
    } else {
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
const multer = require("multer");
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
            Price: productBody.price,
            Discount: productBody.discount,
            TotalPrice: productBody.totalPrice,
            Color: productBody.color,
            DateStart: new Date(),
        }

        let productId = await product.addProduct(productAdd);
        if (productId.length <= 0) return res.status(200).json({"status": "empty", "message": "Product not found"});
        productId = productId[0];
        const productFinding = await product.getDetailProductsByProId(productId);
        const arrayFile = req.files;
        const arrayImage = [];
        const imageId = [];
        for (let i = 0; i < arrayFile.length; i++) {
            const rs = await cloudinary.uploader.upload(arrayFile[i].path, {
                folder: `shoedog/${catName}`,
                public_id: `${arrayFile[i].filename}`,
                crop: "fill",
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
        console.log(e.message)
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.addProductv2 = async (req, res) => {
    try {
        const productBody = req.body;
        const catName = req.body.category;
        const catId = await category.getCategoryById(catName);
        const random = generateString(6);
        const productAdd = {
            Inventory: productBody?.inventory && productBody?.inventory != "" ? productBody?.inventory : random,
            CatId: catId.CatId,
            ProName: productBody.name,
            Des: productBody.des,
            ShortDes: productBody.shortDes,
            StatusPro: productBody.status,
            Brand: productBody.brand,
            Size: productBody.size,
            Price: productBody.price,
            Discount: productBody.discount,
            TotalPrice: productBody.totalPrice,
            Color: productBody.color,
            DateStart: new Date(),
        }

        let productId = await product.addProduct(productAdd);
        if (productId.length <= 0) return res.status(200).json({"status": "empty", "message": "Product not found"});
        productId = productId[0];
        const FOLDER = `./public/image/${catId.CatId}/${productId}`;
        if (!fs.existsSync(FOLDER)) {
            fs.mkdirSync(FOLDER, {recursive: true});
        }
        const FOLDER_IMAGE = `./public/image/temp`;
        fs.readdir(FOLDER_IMAGE, async (err, files) => {
            if (err) throw err;
            // Move each file to folder B
            let i = 0
            let str = "";
            const FOLDER_STR = `/public/image/${catId.CatId}/${productId}`;
            for (const file of files) {
                if (i == 0) await product.updateImageMain(productId, process.env.BACKEND_URL + FOLDER_STR + "/" + file)
                str += process.env.BACKEND_URL + FOLDER_STR + "/" + file + ", ";
                i = i + 1
                const oldPath = path.join(FOLDER_IMAGE, file);
                const newPath = path.join(FOLDER, file);
                fs.rename(oldPath, newPath, err => {
                    if (err) throw err;
                    console.log(`${file} moved successfully!`);
                });
            }
            str = str.substring(0, str.length - 2);
            await product.updateArrayImage(productId, str);
        });
        return res.status(200).json({"status": "success", "data": "ok"});
    } catch (e) {
        console.log('ERRR', e)
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.body.id;
        const productFinding = await product.getProductById(id);

        if (productFinding.length <= 0) return res.status(200).json({
            "status": "empty",
            "message": "Product not found"
        });
        if (productFinding[0].ImageId != null) {
            const imageId = productFinding[0].ImageId.split(", ");
            for (let i = 0; i < imageId.length; i++) {
                await cloudinary.uploader.destroy(imageId[i]);
            }
        }
        const result = await product.deleteProduct(id);
        return res.status(200).json({"status": "success", "data": result});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}



exports.deleteProductv2 = async (req, res) => {
    try {
        const id = req.body.id;
        const productFinding = await product.getProductById(id);

        const FOLDER = `./public/image/${productFinding[0].CatId}/${id}`;

        if (fs.existsSync(FOLDER)) {
            fs.rmSync(FOLDER, { recursive: true, force: true });
            const result = await product.deleteProduct(id);
            return res.status(200).json({"status": "success", "data": result});
        }
        else{
            const result = await product.deleteProduct(id);
            return res.status(200).json({
                "status": "success",
                "message": "Folder  not found"
            });
        }

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
            CatId: catId.CatId,
            ProName: products.name,
            Des: products.des,
            ShortDes: products.shortDes,
            StatusPro: products.status,
            Brand: products.brand,
            Size: products.size,
            Price: products.price,
            Discount: products.discount,
            TotalPrice: products.totalPrice,
            Color: products.color,
        }
        const updateProduct = await product.updateProduct(ProductId, initProduct)
        const productAfterUpdate = await product.getDetailProductsByProId(ProductId)
        if (productAfterUpdate.length <= 0) return res.status(200).json({
            "status": "empty",
            "data": productAfterUpdate
        });
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
        } else return res.status(500).json({"status": "error", "message": "Can not find user"});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateProductv2 = async (req, res) => {
    try {
        const products = req.body
        const ProductId = products.ProId;
        const cateName = req.body.category;
        const catid_ = await category.getCategoryById(cateName);
        const random = generateString(6);
        const catId=catid_.CatId
        const initProduct = {
            Inventory: products?.inventory && products?.inventory != "" ? products?.inventory : random,
            CatId: catId.CatId,
            ProName: products.name,
            Des: products.des,
            ShortDes: products.shortDes,
            StatusPro: products.status,
            Brand: products.brand,
            Size: products.size,
            Price: products.price,
            Discount: products.discount,
            TotalPrice: products.totalPrice,
            Color: products.color,
        }
        const updateProduct = await product.updateProduct(ProductId, initProduct)
        const FOLDER = `./public/image/${catId}/${ProductId}`;
        console.log(FOLDER)
        if (fs.existsSync(FOLDER)) {
            fs.readdir(FOLDER, (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    const filePath = path.join(FOLDER, file);
                    fs.unlink(filePath, err => {
                        if (err) throw err;
                        console.log(`${filePath} was deleted`);
                    });
                }
            })
            const FOLDER_IMAGE = `./public/image/temp`;
            fs.readdir(FOLDER_IMAGE, async (err, files) => {
                if (err) throw err;
                // Move each file to folder B
                let i = 0
                let str = "";
                const FOLDER_STR = `/public/image/${catId}/${ProductId}`;
                console.log(files.length)
                for (const file of files) {
                    if (i == 0) await product.updateImageMain(ProductId, process.env.BACKEND_URL + FOLDER_STR + "/" + file)
                    str += process.env.BACKEND_URL + FOLDER_STR + "/" + file + ", ";
                    i = i + 1
                    const oldPath = path.join(FOLDER_IMAGE, file);
                    const newPath = path.join(FOLDER, file);
                    fs.rename(oldPath, newPath, err => {
                        if (err) throw err;
                        console.log(`${file} moved successfully!`);
                    });
                }
                str = str.substring(0, str.length - 2);
                await product.updateArrayImage(ProductId, str);
            });
            return res.status(200).json({"status": "success", "data": updateProduct});
        } else {
            return res.status(404).json({
                "status": "success",
                "message": "Folder  not found"
            });
        }
        return res.status(200).json({"status": "success", "data": updateProduct});
    } catch (e) {
        console.log(e)
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
        const tempProducts = await product.relatedProductByCatId(catId);

        const products = tempProducts.filter(index => index.ProId !== proId)

        return res.status(200).json({"status": "success", "data": products});
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
        const data = statistic[0][0].total_cost ? statistic[0][0].total_cost : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getStatisticMonth = async (req, res) => {
    try {
        const statistic = await product.getStatisticMonth();
        const data = statistic[0][0].total_cost ? statistic[0][0].total_cost : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getStatisticYear = async (req, res) => {
    try {
        const statistic = await product.getStatisticYear();
        const data = statistic[0][0].total_cost ? statistic[0][0].total_cost : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getMaxQuantityPurchaseDay = async (req, res) => {
    try {
        const limit = req.query.limit;
        const statistic = await product.getMaxQuantityPurchase(limit);
        const data = statistic[0] ? statistic[0] : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getMaxQuantityPurchaseMonth = async (req, res) => {
    try {
        const limit = req.query.limit;
        const statistic = await product.getMaxQuantityPurchaseMonth(limit);
        const data = statistic[0] ? statistic[0] : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getMaxQuantityPurchaseYear = async (req, res) => {
    try {
        const limit = req.query.limit;
        const statistic = await product.getMaxQuantityPurchaseYear(limit);
        const data = statistic[0] ? statistic[0] : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getMinQuantityPurchaseDay = async (req, res) => {
    try {
        const limit = req.query.limit;
        const statistic = await product.getMinQuantityPurchaseDay(limit);
        const data = statistic[0] ? statistic[0] : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}
exports.getMinQuantityPurchaseMonth = async (req, res) => {
    try {
        const limit = req.query.limit;
        const statistic = await product.getMinQuantityPurchaseMonth(limit);
        const data = statistic[0] ? statistic[0] : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}
exports.getMinQuantityPurchaseYear = async (req, res) => {
    try {
        const limit = req.query.limit;
        const statistic = await product.getMinQuantityPurchaseYear(limit);
        const data = statistic[0] ? statistic[0] : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getQuantityInDay = async (req, res) => {
    try {
        const phonenumber = req.query.phone;
        const statistic = await product.getQuantityOrderinDay(phonenumber)
        const data = statistic[0][0] ? statistic[0][0] : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getQuantityInMonth = async (req, res) => {
    try {
        const phonenumber = req.query.phone;
        const statistic = await product.getQuantityOrderinMonth(phonenumber)
        const data = statistic[0][0] ? statistic[0][0] : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getQuantityInYear = async (req, res) => {
    try {
        const phonenumber = req.query.phone;
        const statistic = await product.getQuantityOrderinYear(phonenumber)
        const data = statistic[0][0] ? statistic[0][0] : null
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}


exports.getTotalItemSold = async (req, res) => {
    try {
        const statistic = await product.getAllProductSoldout();
        return res.status(200).json({"status": "success", "data": statistic.length});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.test = async (req, res) => {
    try {
        const statistic = await category.addRawCategory(322, "dsdsdsewqeqweqweqw");
        return res.status(200).json({"status": "success", "data": statistic});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.test1 = async (req, res) => {
    try {
        const Cat = {
            CatName: "test123",
        }
        const statistic = await category.addCategory(Cat);
        return res.status(200).json({"status": "success", "data": statistic});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

async function traverseDirectory(dir) {
    for (const file of fs.readdirSync(dir)) {
        const filePathRoot = path.join(dir, file);
        const statsRoot = fs.statSync(filePathRoot);
        if (statsRoot.isDirectory()) {
            for (const subFile of fs.readdirSync(filePathRoot)) {
                const URL_FILE = filePathRoot + '/' + subFile;
                const productFind = await product.getProductById(subFile);
                let allFiles = ""
                for (const subFile1 of fs.readdirSync(URL_FILE)) {
                    const URL_FILE1 = URL_FILE + '/' + subFile1;
                    if (productFind.length <= 0) return;
                    // allFiles += process.env.BACKEND_URL + "/" + URL_FILE1 + ", ";

                    await product.updateImageMain(productFind[0].ProId, process.env.BACKEND_URL + "/" + URL_FILE1);
                    break;
                }
                // if (allFiles !== "") {
                //     await product.updateArrayImage(productFind[0].ProId, allFiles)
                // }
            }

        }
    }
}

exports.updateImage = async (req, res) => {
    try {
        const URL = './public/image';
        if (!fs.existsSync(URL)) return res.status(500).json({"status": "error", "message": "Folder not found"});
        await traverseDirectory(URL);
        return res.status(200).json({"status": "success", "data": "done"});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}
