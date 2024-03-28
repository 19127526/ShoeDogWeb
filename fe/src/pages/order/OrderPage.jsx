import OrderProductComponent from "../../components/order/OrderProductComponent";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import {
  CLIENT_URL,
  GET_ALL_DISTRICTS_URL,
  GET_ALL_PROVINCES_URL,
  GET_ALL_WARDS_URL,
  ORDER_SUCCESS_ROUTE
} from "../../configs/url";
import {useNavigate} from "react-router-dom";
import {addOrderApi} from "../../apis/orders/OrderApi";
import {Input, message, Radio, Space} from "antd";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import Notification from "../../components/notification/Notification"
import * as containts from "../../components/notification/Notification.constraints"
import {Helmet} from "react-helmet";
import {getListDistricts, getListProvinces, getListWards} from "../../apis/provinces/ProvincesApi";
import {districs, provinces, wards} from "../../apis/provinces/Data";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataProduct = useSelector(state => state.cartReducer);
  const cartItem = dataProduct.cartItem;
  const [totalPrice, setTotalPrice] = useState(0);
  const [listProvinces, setListProvinces] = useState([{
    name: null,
    code: null
  }])
  const [listDistricts, setListDistricts] = useState([{
    name: null,
    code: null,
    provinceCode: null
  }])
  const [listWards, setListWards] = useState([{
    name: null,
    code: null,
    districtCode: null
  }]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState('Tỉnh/Thành phố');
  const [district, setDistrict] = useState('Quận/Huyện');
  const [ward, setWard] = useState('Phường/Xã');
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [isEmpty,setIsEmpty]=useState(false)
  useEffect(() => {
    const temp = cartItem.map(index => {
      return index?.aboutSize.price * index?.quantity
    })
    setTotalPrice(temp.reduce((previousScore, currentScore) => previousScore + currentScore, 0))
    if(cartItem.length==0){
      setIsEmpty(true)
    }
  }, [cartItem])
  useEffect(()=>{
    dispatch(turnOnLoading())
    if(cartItem.length==0){
      setIsEmpty(true)
    }
    dispatch(turnOffLoading())
  },[])

  useEffect(() => {
    const getListProvinces = async () => {
      const temp = provinces.map(index => {
        return {name: index.name, code: index.code}
      });
      setListProvinces(temp);
    }
    getListProvinces()
  }, []);


  const handleChangeFullName = (e) => {
    setFullName(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }


  const handleChangeListProvinces = async (e) => {
    const value = e.target.value;
    let index = e.nativeEvent.target.selectedIndex;
    setProvince(e.nativeEvent.target[index].text)
    setListDistricts([]);
    setListWards([])
    const temp = districs?.map(index => {
      return {
        name: index.name,
        code: index.code,
        provinceCode: index.province_code
      }
    }).filter(index => {
      if (index.provinceCode == value) {
        return index;
      }
    });
    setListDistricts(temp);
  }

  const handleChangeListDistricts = async (e) => {
    const value = e.target.value;
    let index = e.nativeEvent.target.selectedIndex;
    setDistrict(e.nativeEvent.target[index].text)
    setListWards([])
    const temp = wards?.map(index => {
      return {
        name: index.name,
        code: index.code,
        districtCode: index.district_code
      }
    }).filter(index => {
      if (index.districtCode == value) {
        return index;
      }
    });
    setListWards(temp);
  }

  const handleChangeListWards = async (event) => {
    let index = event.nativeEvent.target.selectedIndex;
    setWard(event.nativeEvent.target[index].text)
  }

  const handleChangeAddress = (e) => {
    setAddress(e.target.value)
  }


  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

  const handleChangeNote = (e) => {
    setNote(e.target.value)
  }

  const orderButton = async (event) => {
    event.preventDefault();
    if (fullName === "" || email === "" || province.includes("Tỉnh/Thành phố")
      || district.includes("Quận/Huyện") || ward.includes("Phường/Xã")
      || address === "" || phoneNumber === "" || methodPay === -1) {
      message.info('Vui lòng điền đầy đủ thông tin');
    } else {
      dispatch(turnOnLoading());
      const information = {
        fullName: fullName,
        email: email,
        province: province,
        district: district,
        ward: ward,
        address: address,
        phoneNumber: phoneNumber,
        note: note,
        methodPay: methodPay,
        total: totalPrice,
        url: window.location.origin
      }
      const item = cartItem.map(index => {
        return {
          proId: index.detailProduct.ProId,
          size: index.aboutSize.size,
          amount: index.quantity,
          price: Number(index.aboutSize.price) * Number(index.quantity),
        }
      });

      const totalPayload = {information, item}
      await addOrderApi(totalPayload)
        .then(res => {
          if (res.data.status === "success") {
            Notification("Thông báo đặt hàng", "Bạn đã đặt hàng thành công", containts.NOTIFICATION_SUCCESS)
            navigate(ORDER_SUCCESS_ROUTE, {state: res.data.data[0]})
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          dispatch(turnOffLoading());
        })
    }
  }

  const [methodPay, setMethodPay] = useState(-1)
  const onChangeMethodPay = (e) => {
    setMethodPay(e.target.value);
  }
  const tempTitle = cartItem.map(index => {
      return index.detailProduct?.ProName;
    }
  )
  return (
    <div id="container">
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{`ORDER SẢN PHẨM - ${tempTitle.toString()} - SHOEDOG - Shop giày uy tín nhất TP.HCM`}</title>
        <link
          rel="canonical"
          href={CLIENT_URL + `/order`}
          title={`order sản phẩm - ${tempTitle.toString()} - Shop giày uy tín nhất TP.HCM »`}
        />
        <meta
          name="description"
          content={`order sản phẩm ${tempTitle.toString()}. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
        />
      </Helmet>
      <div className="container detail wrap-checkout">
        <div className="checkout__inner clearfix">
          <div className="checkout__infor">
            <div className="checkout__infor__shipping step-checkout">
              <form onSubmit={orderButton}>
                <div className="checkout__infor__user__shipping">
                  <p className="font-700 mgB-20 fs-24 mgT-20">Thông tin đặt hàng</p>
                  <p className=" mgB-20 fs-18 mgT-20" hidden={!isEmpty}>Bạn chưa có sản phẩm nào, vui lòng chọn sản phẩm để thanh toán</p>
                  <div className="frm-item">
                    <Input name="shipping_name" placeholder="Họ Tên (*)" className="form-control" type="text"
                           onChange={handleChangeFullName} disabled={isEmpty}/>
                  </div>
                  <div className="frm-item">
                    <Input name="email" placeholder="Email" className="form-control" type="email"
                           onChange={handleChangeEmail} disabled={isEmpty}/>
                  </div>
                  <div className="frm-item">

                    <select  name="shipping_city"
                            onChange={handleChangeListProvinces} disabled={isEmpty}>
                      <option value="0">Tỉnh/Thành phố</option>
                      {
                        listProvinces.map(index =>
                          (<option value={index.code} key={index.code}>{index.name}</option>)
                        )
                      }
                    </select>
                  </div>
                  <div className="frm-item ">
                    <select  name="shipping_district"
                            onChange={handleChangeListDistricts} disabled={isEmpty}>
                      <option value="0">Quận/Huyện</option>
                      {
                        listDistricts.map(index =>
                          (<option value={index.code} key={index.code}>{index.name}</option>)
                        )
                      }
                    </select>
                  </div>
                  <div className="frm-item">
                    <select  name="shipping_ward" onChange={handleChangeListWards} disabled={isEmpty}>
                      <option value="0">Phường/Xã</option>
                      {
                        listWards.map(index =>
                          (<option value={index.code} key={index.code}>{index.name}</option>)
                        )
                      }
                    </select>
                  </div>
                  <div className="frm-item">
                    <Input name="shipping_address"
                           placeholder="Địa chỉ. Vui lòng điền CHÍNH XÁC 'tầng, số nhà, đường'.  (*)"
                           className="form-control" type="text" onChange={handleChangeAddress} disabled={isEmpty}/>
                  </div>
                  <div className="frm-item">
                    <Input name="shipping_phone" placeholder="Điện thoại  (*)" className="form-control" type="number"
                           onChange={handleChangePhoneNumber} disabled={isEmpty}/>
                  </div>
                  <div className="frm-item">
                    <textarea className="form-control" name="comment" placeholder="Lưu ý"
                              onChange={handleChangeNote}></textarea>
                  </div>

                </div>
                <div className="text-center mgT-30" >
                    <button  className="btn__conti--pay" type="submit" value="Submit" hidden={isEmpty}>ĐẶT HÀNG</button>
                  </div>

              </form>
            </div>
          </div>
          <div className="checkout__inforpro">
            <p className="font-700 mgB-30 text-center fs-17">GIỎ HÀNG CỦA BẠN</p>
            {cartItem.map(index =>
              (
                <OrderProductComponent size={index.aboutSize.size} name={index.detailProduct.ProName}
                                       totalPrice={Number(index.aboutSize.price) * Number(index.quantity)}
                                       quantity={index.quantity}
                                       sku={index.detailProduct.Inventory} discount={index.aboutSize.discount}
                                       index={index}/>
              )
            )}
            <div className="clearfix mgB-15 checkout__inforpro-detail">
              <p className="pull-right font-700 fs-17">{totalPrice.toLocaleString('it-IT', {
                style: 'currency',
                currency: "VND"
              })}</p>
              <p className="font-700 fs-17">Tổng Số Tiền</p>
            </div>

            <div className="clearfix mgB-40">

              <Radio.Group onChange={onChangeMethodPay}>
                <Space direction="vertical">
                  <Radio value={1}>Chuyển khoản ngân hàng
                    {methodPay === 1 ? (
                      <div className="font-600 fs-11 justifyAround mgB-5">
                        Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng
                        của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển. Moị thắc
                        mắc xin liên hệ trực tiếp hotline: 0865414134
                      </div>
                    ) : ""}
                  </Radio>
                  <Radio value={0}>Trả tiền mặt khi nhận hàng
                    {methodPay === 0 ? (
                      <div className="font-600 fs-11 justifyAround mgB-5">
                        Khách hàng trả tiền mặt khi giao hàng
                      </div>
                    ) : ""}
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
            <hr/>

            <div className="backLink">
              <a onClick={() => navigate("/")}><span className="icon-navigate_before"></span>QUAY LẠI TRANG
                CHỦ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderPage