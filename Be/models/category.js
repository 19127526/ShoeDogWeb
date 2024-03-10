const db = require('../utils/db');
exports.getCategory = ()=> {
    return db('categories')
}

exports.addCategory = (category) => {
    return db('categories').insert(category);
}


exports.addRawCategory = (id, image) => {
    return db.raw(`UPDATE products
SET ImageMain = '${image}'
WHERE 'ProId='${id}`)
}
exports.deleteCategory = (id) => {
    return db('categories').where('CatId', id).del();
}

exports.updateCategory = (id, category) => {
    return db('categories').where('CatId', id).update({
        CatName: category?.CatName
    });
}

exports.getCategoryById = (category) => {
    return db('categories').where('CatName', category).select('CatId').first();
}
