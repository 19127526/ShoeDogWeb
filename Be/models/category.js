const db = require('../utils/db');
exports.getCategory = ()=> {
    return db('categories')
}

exports.addCategory = (category) => {
    return db('categories').insert(category);
}

exports.deleteCategory = (id) => {
    return db('categories').where('id', id).del();
}

exports.updateCategory = (id, category) => {
    return db('categories').where('id', id).update(category);
}
