const category = require('../models/category');
const parentCategory = require('../models/parentcategories');

exports.getParentCategory = async (req, res) => {
    try {
        let listParentCate = await parentCategory.getParentCategory();
        let listCate = await category.getCategory();
        for(let i = 0; i<listParentCate.length(); i++) {
            let categoryTmp = []
            for(let j = 0; j < listCate.length(); j++) {
                if(listParentCate[i]?.ParentId === listCate[j]?.ParentId) {
                    categoryTmp.push(listCate[j])
                }
            }
            listParentCate[i] = {
                ...listParentCate[i],
                ListCategory: categoryTmp,
            }
        }
        return res.status(200).json({"status": "success", "data": listParentCate});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}