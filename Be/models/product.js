const db = require('../utils/db');
exports.getProducts = () => {
  return db('products');
}

exports.addProduct = (product) => {
  return db('products').insert(product);
}

exports.deleteProduct = async (id) => {
  const check=db('products').where('ProId', id).del();
  return check;
}

exports.updateProduct = (id, product) => {
  return db('products').where('id', id).update(product);
}

exports.updateImageMain = (id, image) => {
    return db('products').where('ProId', id).update({ImageMain: image});
}

exports.updateArrayImage = (id, image) => {
    return db('products').where('ProId', id).update({ImageArray: image});
}

exports.getProductsByCatId = (id) => {
  return db('products')
    .join('categories','products.CatId','categories.CatId')
    .where('products.CatId',id)
}

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
