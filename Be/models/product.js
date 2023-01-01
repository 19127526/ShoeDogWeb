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
   /* await db('ordersdetails')
      .where('ordersdetails.ProId', id).del();*/
    const check2 = await db('products')
      .where('products.ProId', id).del();
    return check2;
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
      .join('categories', 'products.CatId', 'categories.CatId')
      .where('products.CatId', id)
}


//s
exports.getDetailProductsByProId = (id) => {
    return db("products")
      .join('categories', 'products.CatId', 'categories.CatId')
      .where('products.ProId', id)
}

exports.searchProducts = async (product) => {
    const sql = `select a.*, b.*
                 FROM products as a
                          join categories as b on a.CatId = b.CatId
                 WHERE a.ProName like "%${product}%"
    `
    const raw_data = await db.raw(sql)
    return raw_data[0]
}
exports.getAllBrands = () => {
    return db("products")
      .distinct('Brand');
}

exports.searchProductsByCatId = async (product) => {
    const sql = `select a.*, b.*
                 FROM products as a
                          join categories as b on a.CatId = b.CatId
                 WHERE a.ProName like "%${product.proName}%"
                   AND a.CatId = ${product.catId}
    `
    const raw_data = await db.raw(sql)
    return raw_data[0]
}


exports.relatedProductByCatId = (catId) => {
    return db("products")
      .join('categories', 'categories.CatId', 'products.CatId')
      .where('products.CatId', catId)
      .orderByRaw('RAND()')
      .limit(9)
}

exports.updateSizeAndQuantityByProId = ({proId, size}) => {
    return db("products")
      .where('products.ProId', proId)
      .update({
          Size: size
      })
}

exports.changeStatusProDuctByProId = async (proId, statusPro) => {
    return db("products")
      .where('products.ProId', proId)
      .update({
          StatusPro: statusPro
      })
}

exports.getStatisticDay = () => {
    return db.raw('select sum(o.TotalCost) as total_cost\n' +
      'from ordersdetails od join orders o on (od.OrderId=o.OrderId)\n' +
      'where DATE(o.OrderDate) = DATE(NOW()) and o.StatusOrder = 1 \n')
}

exports.getStatisticMonth = () => {
    return db.raw('select sum(o.TotalCost) as total_cost\n' +
      'from ordersdetails od join orders o on (od.OrderId=o.OrderId)\n' +
      'where MONTH(o.OrderDate) = MONTH(NOW()) and o.StatusOrder = 1\n')
}

exports.getStatisticYear = () => {
    return db.raw('select sum(o.TotalCost) as total_cost\n' +
      'from ordersdetails od join orders o on (od.OrderId=o.OrderId)\n' +
      'where YEAR(o.OrderDate) = YEAR(NOW()) and o.StatusOrder = 1\n')
}

exports.getMaxQuantityPurchase = (limit) => {
    return db.raw('select p.*, count(*) as \'Amount\'\n' +
      'from products p join ordersdetails o on p.ProId = o.ProId\n' +
      'join orders o2 on o2.OrderId = o.OrderId\n' +
      'where DAY(o2.OrderDate) = DAY(NOW())\n' +
      'group by p.ProId\n' +
      'order by Amount desc\n' +
      `limit ${limit}\n`)
}

exports.getMaxQuantityPurchaseMonth = (limit) => {
    return db.raw('select p.*, count(*) as \'Amount\'\n' +
      'from products p join ordersdetails o on p.ProId = o.ProId\n' +
      'join orders o2 on o2.OrderId = o.OrderId\n' +
      'where MONTH(o2.OrderDate) = MONTH(NOW())\n' +
      'group by p.ProId\n' +
      'order by Amount desc\n' +
      `limit ${limit}\n`)
}

exports.getMaxQuantityPurchaseYear = (limit) => {
    return db.raw('select p.*, count(*) as \'Amount\'\n' +
      'from products p join ordersdetails o on p.ProId = o.ProId\n' +
      'join orders o2 on o2.OrderId = o.OrderId\n' +
      'where YEAR(o2.OrderDate) = YEAR(NOW())\n' +
      'group by p.ProId\n' +
      'order by Amount desc\n' +
      `limit ${limit}\n`)
}

exports.getMinQuantityPurchaseDay = (limit) => {
    return db.raw('select p.*, count(*) as \'Amount\'\n' +
      'from products p join ordersdetails o on p.ProId = o.ProId\n' +
      'join orders o2 on o2.OrderId = o.OrderId\n' +
      'where DAY(o2.OrderDate) = DAY(NOW())\n' +
      'group by p.ProId\n' +
      'order by Amount asc\n' +
      `limit ${limit}\n`)
}

exports.getMinQuantityPurchaseMonth = (limit) => {
    return db.raw('select p.*, count(*) as \'Amount\'\n' +
      'from products p join ordersdetails o on p.ProId = o.ProId\n' +
      'join orders o2 on o2.OrderId = o.OrderId\n' +
      'where MONTH(o2.OrderDate) = MONTH(NOW())\n' +
      'group by p.ProId\n' +
      'order by Amount asc\n' +
      `limit ${limit}\n`)
}

exports.getMinQuantityPurchaseYear = (limit) => {
    return db.raw('select p.*, count(*) as \'Amount\'\n' +
      'from products p join ordersdetails o on p.ProId = o.ProId\n' +
      'join orders o2 on o2.OrderId = o.OrderId\n' +
      'where YEAR(o2.OrderDate) = YEAR(NOW())\n' +
      'group by p.ProId\n' +
      'order by Amount asc\n' +
      `limit ${limit}\n`)
}

exports.getQuantityOrderinDay = (phonenumber) => {
    return db.raw('select count(*) as quantity\n' +
      'from orders o\n' +
      `where o.PhoneNumber like '${phonenumber}' and DAY(o.orderDate) = DAY(NOW())\n` +
      '\n')
}

exports.getQuantityOrderinMonth = (phonenumber) => {
    return db.raw('select count(*) as quantity\n' +
      'from orders o\n' +
      `where o.PhoneNumber like '${phonenumber}' and MONTH(o.orderDate) = MONTH(NOW())\n` +
      '\n')
}

exports.getQuantityOrderinYear = (phonenumber) => {
    return db.raw('select count(*) as quantity\n' +
      'from orders o\n' +
      `where o.PhoneNumber like '${phonenumber}' and YEAR(o.orderDate) = YEAR(NOW())\n` +
      '\n')
}


exports.getAllProductSoldout = () => {
    return db("products")
      .join('categories', 'products.CatId', 'categories.CatId')
      .where('products.StatusPro', 0)
}
