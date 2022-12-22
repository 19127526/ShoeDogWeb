

const db = require('../utils/db');

//s
exports.getProducts = () => {
  return db('products')
}

exports.getProductById = (ProId) => {
    return db('products').where('ProId', ProId);
}

exports.addProduct = (product) => {
  return db('products').insert(product);
}


//s
exports.deleteProduct = async (id) => {
  const check=db('products').where('ProId', id).del();
  return check;
}

exports.updateProduct = (id, product) => {
 return db('products').where('ProId', id).update(product);
}

exports.getImageIdByProId = (id) => {
    return db('products').select('ImageId').where('ProId', id);
}

exports.updateImageMain = (id, image) => {
    return db('products').where('ProId', id).update({ImageMain: image});
}

exports.updateArrayImage = (id, image) => {
    return db('products').where('ProId', id).update({ImageArray: image});
}

exports.updateImageId = (id, image) => {
  return db('products').where('ProId', id).update({ImageId: image});
}


//s
exports.getProductsByCatId = (id) => {
  return db('products')
    .join('categories','products.CatId','categories.CatId')
    .where('products.CatId',id)
}


//s
exports.getDetailProductsByProId=(id)=>{
  return db("products")
    .join('categories','products.CatId','categories.CatId')
    .where('products.ProId',id)
}

exports.searchProducts=async (product) => {
  const sql = `select a.*,b.*
               FROM products as a
                        join categories as b on a.CatId = b.CatId
               WHERE a.ProName like "%${product}%"
  `
  const raw_data = await db.raw(sql)
  return raw_data[0]
}
exports.getAllBrands= ()=>{
  return db("products")
    .distinct('Brand');
}

exports.searchProductsByCatId=async (product) => {
  const sql = `select a.*,b.*
               FROM products as a
                        join categories as b on a.CatId = b.CatId
               WHERE a.ProName like "%${product.proName}%" AND a.CatId=${product.catId}
  `
  const raw_data = await db.raw(sql)
  return raw_data[0]
}


exports.relatedProductByCatId= (catId)=>{
  return db("products")
    .join('categories','categories.CatId','products.CatId')
    .where('products.CatId',catId)
    .orderByRaw('RAND()')
    .limit(9)
}

exports.updateSizeAndQuantityByProId=({proId,size})=>{
  return db("products")
    .where('products.ProId',proId)
    .update({
      Size:size
    })
}

exports.changeStatusProDuctByProId=async (proId,statusPro)=>{
  return db("products")
    .where('products.ProId',proId)
    .update({
      StatusPro:statusPro
    })
}
