const db = require('../utils/db');
exports.getParentCategory = ()=> {
    return db('parentcategories')
}

exports.addParentCategory=(parent)=>{
    return db('parentcategories')
        .insert(parent);
}

exports.removeParentCategory = async (id) => {
    const check2 = await db('parentcategories')
        .where('parentcategories.ParentId', id).del();
    return check2
}

exports.updateParentCategory = (id, parentCategory) => {
    return db('parentcategories').where('ParentId', id).update(parentCategory);
}