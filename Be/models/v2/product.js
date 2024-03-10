const db = require('../../utils/db');

//s
exports.getProductsByCatIdPagination = (catId, page = 1, limit = 6, isReverse) => {
  return db('products')
    .join('categories', 'products.CatId', 'categories.CatId')
    .where('products.CatId', catId)
    .orderBy('products.ProId', parseInt(isReverse) === 1 ? "asc" : "desc")
    .limit(limit)
    .offset((page - 1) * limit)
}


exports.getCountProductByCatId = (catId) => {
  return db('products')
    .join('categories', 'products.CatId', 'categories.CatId')
    .where('products.CatId', catId)
    .count('ProId as countProduct').first()
}