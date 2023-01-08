const order = require("../models/order");
const product = require("../models/product");
const emailjs = require('@emailjs/nodejs');
const {convertArrayToQuantity} = require("../service/service");

// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const convertArrayToOptions = (arr, splitIndex) => {
    return arr.split(splitIndex)
}



const urlClient="http://localhost:3000/detail/"
exports.addOrder = async (req, res) => {
  try {
    const orderInformationBody = req.body.information;
    const orderItem = req.body.item;
    const orderAdd = {
      FullName: orderInformationBody.fullName,
      Email: orderInformationBody.email,
      Address: orderInformationBody.address + ", " + orderInformationBody.ward + ", " + orderInformationBody.district + ", " + orderInformationBody.province,
      PhoneNumber: orderInformationBody.phoneNumber,
      Note: orderInformationBody.note,
      InventoryOrder: generateString(10),
      MethodPay: orderInformationBody.methodPay,
      TotalCost: orderInformationBody.total
    }
    const orderId = await order.addOrder(orderAdd);

    const listProductAfterAdd = [];
    for (let i = 0; i < orderItem.length; i++) {
      const orderDetailAdd = {
        ProId: orderItem[i].proId,
        Amount: orderItem[i].amount,
        Size: orderItem[i].size,
        OrderId: orderId[0],
      }

      const orderDetailAddAfterAdd = {
        ProId: orderItem[i].proId,
        Amount: orderItem[i].amount,
        Size: orderItem[i].size,
        OrderId: orderId[0],
        Price:orderItem[i].price,
      }

      await order.addDetailOrder(orderDetailAdd);
      //Lấy chi tiết sản phẩm theo pro id
      const tempProduct = await product.getProductById(orderItem[i].proId);
      listProductAfterAdd.push({detailProduct:tempProduct[0],order:orderDetailAddAfterAdd})
      const tempSize=convertArrayToQuantity(tempProduct[0]?.Size);
      const tempQuantity=convertArrayToQuantity(tempProduct[0]?.Quantity);
      let isProductSoldOutArr=[];
      let tempQuantityArr="";
      for(let i=0;i<tempSize.length;i++){
        const temp=`${i}: ${tempQuantity[i]}`
        if(i==0){
          if(tempSize[i]==orderDetailAdd.Size){
            const tempQuantityAfterOrder=`${i}: ${Number(tempQuantity[i])-Number(orderDetailAdd.Amount)}`;
            tempQuantityArr+=tempQuantityAfterOrder;
            isProductSoldOutArr.push(Number(tempQuantity[i])-Number(orderDetailAdd.Amount))
          }
          else{
            tempQuantityArr+=temp;
            isProductSoldOutArr.push(tempQuantity[i]);
          }
        }
        else{
          if(tempSize[i]==orderDetailAdd.Size){
              const tempQuantityAfterOrder=`${i}: ${Number(tempQuantity[i])-Number(orderDetailAdd.Amount)}`;
            tempQuantityArr+=`, ${tempQuantityAfterOrder}`;
            isProductSoldOutArr.push(Number(tempQuantity[i])-Number(orderDetailAdd.Amount));
          }
          else{
            tempQuantityArr+=`, ${temp}`
            isProductSoldOutArr.push(tempQuantity[i]);
          }
        }
      }
      await product.updateProduct(orderDetailAdd.ProId,{Quantity:tempQuantityArr})
      let flag=false;
      for(let i=0;i<isProductSoldOutArr.length;i++){
        if(isProductSoldOutArr[i]!=0){
          flag=true;
        }
      }
      if(flag==false){
        await product.updateProduct(orderDetailAdd.ProId,{StatusPro:0})
      }
    }


    const listProductEmail=listProductAfterAdd.map(index=>{
      return{
        detail: index.detailProduct,
        size2Quantity: {
          size: index.order.Size,
          amount: index.order.Amount,
          total: (Number(index.order.Price) * Number(index.order.Amount))
            .toLocaleString('it-IT', {
            style: 'currency',
            currency: "VND"
          }),
          urlClient: urlClient +  index.order.ProId,
        }
      }
    })

    const templateCredit = {
      name: orderAdd.FullName,
      notes: 'Check this out!',
      address:orderAdd.Address,
      inventoryorder:orderAdd.InventoryOrder,
      to_mail: orderAdd.Email,
      date:new Date().toISOString().slice(0, 10).split('-').reverse().join('/'),
      productList:listProductEmail,
      totalPrice:orderAdd.TotalCost,
    };
    const templateCash = {
      name: orderAdd.FullName,
      notes: 'Check this out!',
      address:orderAdd.Address,
      inventoryorder:orderAdd.InventoryOrder,
      to_mail: orderAdd.Email,
      date:new Date().toISOString().slice(0, 10).split('-').reverse().join('/'),
      productList:listProductEmail,
      totalPrice:orderAdd.TotalCost,
    }
     if (orderInformationBody.methodPay === 0) {
       emailjs
         .send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_CASH_ID, templateCash, {
           publicKey: process.env.EMAILJS_PUBLIC_KEY,
           privateKey: process.env.EMAILJS_PRIVATE_KEY, // optional, highly recommended for security reasons
         })
         .then(
           (response) => {
             console.log('SUCCESS!', response.status, response.text);
           },
           (err) => {
             console.log('FAILED...', err);
           },
         );
     } else if (orderInformationBody.methodPay === 1) {
       emailjs
         .send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_CASH_ID, templateCash, {
           publicKey: process.env.EMAILJS_PUBLIC_KEY,
           privateKey: process.env.EMAILJS_PRIVATE_KEY, // optional, highly recommended for security reasons
         })
         .then(
           (response) => {
             console.log('SUCCESS!', response.status, response.text);
           },
           (err) => {
             console.log('FAILED...', err);
           },
         );
     }
    return res.status(200).json({"status": "success", "data": listProductEmail});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.getAllOrders = async (req, res) => {
    try {
        const getAllOrders = await order.getAllOrders();
        const getAllDetailOrders = await order.getAllDetailOrders();
        for (let i = 0; i < getAllOrders.length; i++) {
            const temp = []
            for (let j = 0; j < getAllDetailOrders.length; j++) {
                if (getAllOrders[i].OrderId === getAllDetailOrders[j].OrderId) {
                    temp.push(getAllDetailOrders[j])
                }
            }
            getAllOrders[i].items = temp;
        }

        return res.status(200).json({"status": "success", "data": getAllOrders});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteOrderByOrderId = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        console.log(orderId)
        const resultDeteleOrderDetail = await order.deleteOrderDetail(orderId);
        const result = await order.deleteOrder(orderId);
        return res.status(200).json({"status": "success", "data": result});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.completeOrderByOrderId = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const result = await order.acceptOrder(orderId);
        const orderList= await order.getAllDetailOrdersByStatusOrder(0);
        return res.status(200).json({"status": "success", "data": orderList});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

