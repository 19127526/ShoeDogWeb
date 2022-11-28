import OrderProductComponent from "../../components/order/OrderProductComponent";

const OrderPage = () => {
  return (
    <div id="container">
      <div className="container detail wrap-checkout">
        <div className="checkout__inner clearfix">
          <form action="https://www.glab.vn/order/checkout/step2" method="post">
            <input type="hidden" name="_token" value="cRIx55nnE35ibwxD1uhtjxuQPuSE1xMvPEiS3qCN"/>
            <div className="checkout__infor">
              <div className="checkout__infor__shipping step-checkout">
                <div className="checkout__infor__user__shipping">
                  <p className="font-700 mgB-20 fs-24 mgT-20">SHIPPING INFOMATION</p>
                  <div className="frm-item">
                    <input name="shipping_name" placeholder="Họ Tên (*)" className="form-control" type="text"
                           value=""/>
                  </div>
                  <div className="frm-item">
                    <input name="email" placeholder="Email" className="form-control" type="text"
                           value="phamtienquan2001@gmail.com"/>
                  </div>
                  <div className="frm-item same-city">
                    <select className="select-city" data-child="district" name="shipping_city_id">
                      <option value="0">Tỉnh/Thành phố</option>
                      <option value="1">Hồ Chí Minh</option>
                      <option value="2">Hà Nội</option>
                      <option value="3">Bình Dương</option>
                      <option value="4">Đà Nẵng</option>
                      <option value="5">Hải Phòng</option>
                      <option value="6">Long An</option>
                      <option value="7">Bà Rịa Vũng Tàu</option>
                      <option value="8">An Giang</option>
                      <option value="9">Bắc Giang</option>
                      <option value="10">Bắc Kạn</option>
                      <option value="11">Bạc Liêu</option>
                      <option value="12">Bắc Ninh</option>
                      <option value="13">Bến Tre</option>
                      <option value="14">Bình Định</option>
                      <option value="15">Bình Phước</option>
                      <option value="16">Bình Thuận</option>
                      <option value="17">Cà Mau</option>
                      <option value="18">Cần Thơ</option>
                      <option value="19">Cao Bằng</option>
                      <option value="20">Đắk Lắk</option>
                      <option value="21">Đắk Nông</option>
                      <option value="22">Điện Biên</option>
                      <option value="23">Đồng Nai</option>
                      <option value="24">Đồng Tháp</option>
                      <option value="25">Gia Lai</option>
                      <option value="26">Hà Giang</option>
                      <option value="27">Hà Nam</option>
                      <option value="28">Hà Tĩnh</option>
                      <option value="29">Hải Dương</option>
                      <option value="30">Hậu Giang</option>
                      <option value="31">Hòa Bình</option>
                      <option value="32">Hưng Yên</option>
                      <option value="33">Khánh Hòa</option>
                      <option value="34">Kiên Giang</option>
                      <option value="35">Kon Tum</option>
                      <option value="36">Lai Châu</option>
                      <option value="37">Lâm Đồng</option>
                      <option value="38">Lạng Sơn</option>
                      <option value="39">Lào Cai</option>
                      <option value="40">Nam Định</option>
                      <option value="41">Nghệ An</option>
                      <option value="42">Ninh Bình</option>
                      <option value="43">Ninh Thuận</option>
                      <option value="44">Phú Thọ</option>
                      <option value="45">Phú Yên</option>
                      <option value="46">Quảng Bình</option>
                      <option value="47">Quảng Nam</option>
                      <option value="48">Quảng Ngãi</option>
                      <option value="49">Quảng Ninh</option>
                      <option value="50">Quảng Trị</option>
                      <option value="51">Sóc Trăng</option>
                      <option value="52">Sơn La</option>
                      <option value="53">Tây Ninh</option>
                      <option value="54">Thái Bình</option>
                      <option value="55">Thái Nguyên</option>
                      <option value="56">Thanh Hóa</option>
                      <option value="57">Thừa Thiên Huế</option>
                      <option value="58">Tiền Giang</option>
                      <option value="59">Trà Vinh</option>
                      <option value="60">Tuyên Quang</option>
                      <option value="61">Vĩnh Long</option>
                      <option value="62">Vĩnh Phúc</option>
                      <option value="63">Yên Bái</option>
                    </select>
                  </div>
                  <div className="frm-item same-district">
                    <select className="select-district" data-child="ward" name="shipping_district_id">
                      <option value="0">Quận/Huyện</option>
                    </select>
                  </div>
                  <div className="frm-item same-ward">
                    <select className="select-ward" name="shipping_ward_id">
                      <option value="0">Phường/Xã</option>
                    </select>
                  </div>
                  <div className="frm-item">
                    <input name="shipping_address"
                           placeholder="Địa chỉ. Vui lòng điền CHÍNH XÁC 'tầng, số nhà, đường'.  (*)"
                           className="form-control" type="text" value=""/>
                  </div>
                  <div className="frm-item">
                    <input name="shipping_phone" placeholder="Điện thoại  (*)" className="form-control" type="number"
                           value=""/>
                  </div>
                  <div className="frm-item">
                    <textarea className="form-control" name="comment" placeholder="Lưu ý"></textarea>
                    <div className="error">abc</div>
                  </div>
                </div>

                <div className="checkout__infor__user__billing hide">
                  <p className="font-700 mgB-20 fs-24 mgT-40">BILLING INFORMATION</p>
                  <div className="row mgB-20">
                    <div className="col-sm-6">
                      <label htmlFor="" className="frm">
                        <input type="radio" name="chk-same-info" checked="" value="1"/>SAME AS SHIPPING
                      </label>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="" className="frm">
                        <input type="radio" name="chk-same-info" value="0"/>ENTER DIFFERENT BILLING ADDRESS
                      </label>
                    </div>
                  </div>
                  <div className="frm-item">
                    <input name="billing_name" placeholder="Họ Tên (*)" className="form-control" type="text"
                           value=""/>
                  </div>
                  <div className="frm-item">
                    <input name="billing_address"
                           placeholder="Địa chỉ. Vui lòng điền CHÍNH XÁC 'tầng, số nhà, đường'. (*)"
                           className="form-control" type="text" value=""/>
                  </div>
                  <div className="frm-item same-city">
                    <select className="select-city" data-child="district" name="billing_city_id">
                      <option value="0">Tỉnh/Thành phố</option>
                      <option value="1">Hồ Chí Minh</option>
                      <option value="2">Hà Nội</option>
                      <option value="3">Bình Dương</option>
                      <option value="4">Đà Nẵng</option>
                      <option value="5">Hải Phòng</option>
                      <option value="6">Long An</option>
                      <option value="7">Bà Rịa Vũng Tàu</option>
                      <option value="8">An Giang</option>
                      <option value="9">Bắc Giang</option>
                      <option value="10">Bắc Kạn</option>
                      <option value="11">Bạc Liêu</option>
                      <option value="12">Bắc Ninh</option>
                      <option value="13">Bến Tre</option>
                      <option value="14">Bình Định</option>
                      <option value="15">Bình Phước</option>
                      <option value="16">Bình Thuận</option>
                      <option value="17">Cà Mau</option>
                      <option value="18">Cần Thơ</option>
                      <option value="19">Cao Bằng</option>
                      <option value="20">Đắk Lắk</option>
                      <option value="21">Đắk Nông</option>
                      <option value="22">Điện Biên</option>
                      <option value="23">Đồng Nai</option>
                      <option value="24">Đồng Tháp</option>
                      <option value="25">Gia Lai</option>
                      <option value="26">Hà Giang</option>
                      <option value="27">Hà Nam</option>
                      <option value="28">Hà Tĩnh</option>
                      <option value="29">Hải Dương</option>
                      <option value="30">Hậu Giang</option>
                      <option value="31">Hòa Bình</option>
                      <option value="32">Hưng Yên</option>
                      <option value="33">Khánh Hòa</option>
                      <option value="34">Kiên Giang</option>
                      <option value="35">Kon Tum</option>
                      <option value="36">Lai Châu</option>
                      <option value="37">Lâm Đồng</option>
                      <option value="38">Lạng Sơn</option>
                      <option value="39">Lào Cai</option>
                      <option value="40">Nam Định</option>
                      <option value="41">Nghệ An</option>
                      <option value="42">Ninh Bình</option>
                      <option value="43">Ninh Thuận</option>
                      <option value="44">Phú Thọ</option>
                      <option value="45">Phú Yên</option>
                      <option value="46">Quảng Bình</option>
                      <option value="47">Quảng Nam</option>
                      <option value="48">Quảng Ngãi</option>
                      <option value="49">Quảng Ninh</option>
                      <option value="50">Quảng Trị</option>
                      <option value="51">Sóc Trăng</option>
                      <option value="52">Sơn La</option>
                      <option value="53">Tây Ninh</option>
                      <option value="54">Thái Bình</option>
                      <option value="55">Thái Nguyên</option>
                      <option value="56">Thanh Hóa</option>
                      <option value="57">Thừa Thiên Huế</option>
                      <option value="58">Tiền Giang</option>
                      <option value="59">Trà Vinh</option>
                      <option value="60">Tuyên Quang</option>
                      <option value="61">Vĩnh Long</option>
                      <option value="62">Vĩnh Phúc</option>
                      <option value="63">Yên Bái</option>
                    </select>
                  </div>
                  <div className="frm-item same-district">
                    <select className="select-district" data-child="ward" name="billing_district_id">
                      <option value="0">Quận/Huyện</option>
                    </select>
                  </div>
                  <div className="frm-item same-ward">
                    <select className="select-ward" name="billing_ward_id">
                      <option value="0">Phường/Xã</option>
                    </select>
                  </div>
                  <div className="frm-item">
                    <input name="billing_phone" placeholder="Điện thoại (*)" className="form-control" type="number"
                           value=""/>
                  </div>
                  <div className="frm-item">
                    <input name="billing_tax_code" placeholder="Mã số thuế" className="form-control" type="text"
                           value=""/>
                  </div>
                </div>
                <div className="text-center mgT-30">
                  <button className="btn__conti--pay">CONTINUE TO PAYMENT METHOD</button>
                </div>
              </div>
            </div>
            <div className="checkout__inforpro">
              <p className="font-700 mgB-30 text-center fs-17">YOUR CART</p>
              <OrderProductComponent size="4Y" name="Air Jordan 1 Low Taxi (GS)" price="2,900,000 đ" quantity={1} sku="553560-701"/>
              <OrderProductComponent size="4Y" name="Air Jordan 1 Low Taxi (GS)" price="2,900,000 đ" quantity={1} sku="553560-701"/>
              <div className="clearfix mgB-10">
                <p className="pull-right font-600 fs-12">47,900,000 đ</p>
                <p className="font-600 fs-12">Thành Tiền</p>
              </div>

              <div className="clearfix mgB-10">
                <p className="pull-right font-700 fs-12">0 đ</p>
                <p className="font-700 fs-12">Tiền Ship</p>
              </div>
              <div className="clearfix mgB-10">
                <p className="pull-right font-700 fs-12">0 đ</p>
                <p className="font-700 fs-12">Giảm Giá</p>
              </div>
              <div className="clearfix mgB-40">
                <p className="pull-right font-700 fs-17">47,900,000 đ</p>
                <p className="font-700 fs-17">Tổng Số Tiền</p>
              </div>
              <div className="backLink">
                <a href="https://www.glab.vn/product"><span className="icon-navigate_before"></span>RETURN TO STOCK
                  INFOMATION</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default OrderPage