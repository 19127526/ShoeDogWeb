const db = require('../utils/db');
exports.getProducts = () => {
  return db('products');
}

exports.addProduct = (product) => {
  return db('products').insert(product);
}

exports.deleteProduct = (id) => {
  return db('products').where('id', id).del();
}

exports.updateProduct = (id, product) => {
  return db('products').where('id', id).update(product);
}

exports.getProductsByCatId = (id) => {
  return db('products')
    .join('categories','products.CatId','categories.CatId')
    .where('products.CatId',id)
}
