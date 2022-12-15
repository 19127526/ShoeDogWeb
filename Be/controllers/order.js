const order = require("../models/order");

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

exports.addOrder = async (req, res) => {
  try {
    const orderInformationBody = req.body.information;
    const orderItem=req.body.item;
    const orderAdd={
      FullName:orderInformationBody.fullName,
      Email:orderInformationBody.email,
      Address: orderInformationBody.address+", "+orderInformationBody.ward+", " +orderInformationBody.district+", "+orderInformationBody.province,
      PhoneNumber:orderInformationBody.phoneNumber,
      Note: orderInformationBody.note,
      InventoryOrder:generateString(7),
      MethodPay:orderInformationBody.methodPay
    }
    const orderId = await order.addOrder(orderAdd);
    for(let i=0;i<orderItem.length;i++){
      const orderDetailAdd={
        ProId:orderItem[i].proId,
        Amount:orderItem[i].amount,
        Size:orderItem[i].size,
        OrderId:orderId[0]
      }
      await order.addDetailOrder(orderDetailAdd)
    }
    const orderFinding = await order.getDetailOrderByOrderId(orderId[0]);
    return res.status(200).json({"status": "success", "data": orderFinding});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

