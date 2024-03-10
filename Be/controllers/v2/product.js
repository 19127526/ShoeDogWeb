const product = require('../../models/v2/product');
const category = require('../../models/category');

exports.getProductsByCatIdPagination = async (req, res) => {
  try {
    let {limit, page, isReverse} = req.query;
    limit = parseInt(limit) || 5;
    page = parseInt(page) || 1;
    const products = await product.getProductsByCatIdPagination(req.params.catId, page, limit, isReverse);
    const {countProduct} = await product.getCountProductByCatId(req.params.catId);
    return res.status(200).json({
      "status": "success",
      "products": products,
      "totalProduct": countProduct,
      "totalPage":  Math.ceil(countProduct / limit),
      "limit": products.length,
      "page": page
    })
  }
  catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}
