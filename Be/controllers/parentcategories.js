const category = require('../models/category');
const parentCategory = require('../models/parentcategories');

exports.getParentCategory = async (req, res) => {
    try {
        let listParentCate = await parentCategory.getParentCategory();
        let listCate = await category.getCategory();
        console.log('listParentCate', listParentCate.length)
        for(let i = 0; i<listParentCate.length; i++) {
            let categoryTmp = []
            for(let j = 0; j < listCate.length; j++) {
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

exports.addParentCategory = async (req, res) => {
    try {
        const parentCate = req.body
        console.log(parentCate)
        let result = await parentCategory.addParentCategory(parentCate);
        return res.status(200).json({"status": "success", "data": result});
    } catch (e) {
        console.log(e)
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.removeParentCategory = async (req, res) => {
    try {
        const id = req.params.parentId;
        let listParentCate = await parentCategory.removeParentCategory(id);
        return res.status(200).json({"status": "success", "data": listParentCate});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.editParentCategory = async (req, res) => {
    try {
        const id = req.params.parentId;
        const parentCate = req.body
        let result = await parentCategory.updateParentCategory(id, parentCate);
        return res.status(200).json({"status": "success", "data": result});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}