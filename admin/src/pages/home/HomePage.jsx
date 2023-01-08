import {useEffect, useState} from "react";
import {
  getListProducts,
  getListProductSoldOut,
  getMaxItemBuyStatisticDay, getMaxItemBuyStatisticMonth, getMaxItemBuyStatisticYear,
  getMinItemBuyStatisticDay, getMinItemBuyStatisticMonth, getMinItemBuyStatisticYear,
  getTotalPriceStatisticDay, getTotalPriceStatisticMonth, getTotalPriceStatisticYear
} from "../../apis/products/ProductsApi";
import CardRevenue from "../../components/card/CardRevenue";
import {Select} from "antd";
import {getAllOrders} from "../../apis/orders/OrdersApi";


const HomePage = () => {
  const [revenue,setRevenue]=useState(0);
  const [minItem,setMinItem]=useState([]);
  const [maxItem,setMaxItem]=useState([]);
  const [countProduct,setCountProduct]=useState(0);
  const [countOrder,setCountOrder]=useState({
    orderSuccess:0,
    orderProcess:0,
  })
  const [productsSold,setProductSold]=useState(0);
  const [filterRevenue,setFilterRevenue]=useState(1);
  const [filterMaxItem,setFilterMaxItem]=useState(1);
  const [filterMinItem,setFilterMinItem]=useState(1);


  useEffect(()=>{
    const getListProductSold=async ()=>{
      await getListProductSoldOut()
        .then(res=>{
          if(res.data.status=="success"){
            setProductSold(res.data.data);
          }
        })
    }

    const countProduct=async ()=>{
      await getListProducts()
        .then(res=>{
          if(res.data.status=="success"){
            setCountProduct(res.data.data.length)
          }
        })
    }

    const countOrder=async ()=>{
      await getAllOrders()
        .then(res=>{
          if(res.data.status=="success"){
            setCountOrder({
              orderSuccess: res.data.data.filter(index=>index.StatusOrder==1).length,
              orderProcess:res.data.data.filter(index=>index.StatusOrder==0).length
            })
          }
        })
    }
    countProduct();
    getListProductSold();
    countOrder();
  },[]);



  useEffect(()=>{
    //day
    if(filterRevenue==0){
      const getRevenueDay=async ()=>{
        await getTotalPriceStatisticDay()
          .then(res=>{
            if(res.data.status=="success"){
              if(res.data.data==null){
                setRevenue(0)
              }
              else{
                setRevenue(res.data.data);
              }
            }
          })
      }
      getRevenueDay();
    }
    else if(filterRevenue==1){ //month

      const getRevenueMonth=async ()=>{
        await getTotalPriceStatisticMonth()
          .then(res=>{
            if(res.data.status=="success"){
              if(res.data.data==null){
                setRevenue(0)
              }
              else{
                setRevenue(res.data.data);
              }
            }
          })
      }
      getRevenueMonth();

    }
    else if(filterRevenue==2){ //year

      const getRevenueYear=async ()=>{
        await getTotalPriceStatisticYear()
          .then(res=>{
            if(res.data.status=="success"){
              if(res.data.data==null){
                setRevenue(0)
              }
              else{
                setRevenue(res.data.data);
              }
            }
          })
      }
      getRevenueYear();
    }
  },[filterRevenue]);

  useEffect(()=>{
    //day
    if(filterMinItem==0) {
      const getMinItemDayList = async () => {
        await getMinItemBuyStatisticDay({limit: 6})
          .then(res => {
            if (res.data.status == "success") {
              setMinItem(res.data.data)
            }
          })
      }
      getMinItemDayList();
    }
    else if(filterMinItem==1) {
      const getMinItemMonthList = async () => {
        await getMinItemBuyStatisticMonth({limit: 6})
          .then(res => {
            if (res.data.status == "success") {
              setMinItem(res.data.data)
            }
          })
      }
      getMinItemMonthList();
    }
    else if(filterMinItem==2){
      const getMinItemYearList=async ()=>{
        await getMinItemBuyStatisticYear({limit:6})
          .then(res=>{
            if(res.data.status=="success"){
              setMinItem(res.data.data)
            }
          })
      }
      getMinItemYearList();
    }
  },[filterMinItem])

  useEffect(()=>{
    //day
    if(filterMaxItem==0) {
      const getMaxItemDayList = async () => {
        await getMaxItemBuyStatisticDay({limit: 6})
          .then(res => {
            if (res.data.status == "success") {
              setMaxItem(res.data.data)
            }
          })
      }
      getMaxItemDayList();
    }
    else if(filterMaxItem==1) {
      const getMaxItemMonthList = async () => {
        await getMaxItemBuyStatisticMonth({limit: 6})
          .then(res => {
            if (res.data.status == "success") {
              setMaxItem(res.data.data)
            }
          })
      }
      getMaxItemMonthList();
    }
    else if(filterMaxItem==2) {
      const getMaxItemYearList=async ()=>{
        await getMaxItemBuyStatisticYear({limit:6})
          .then(res=>{
            if(res.data.status=="success"){
              setMaxItem(res.data.data)
            }
          })
      }
      getMaxItemYearList();
    }
  },[filterMaxItem])

  const handleMaxItem=(e)=>{
    setFilterMaxItem(e);
  }

  const handleMinItem=(e)=>{
    setFilterMinItem(e);
  }
  const handleRevenue=(e)=>{
    setFilterRevenue(e);
  }
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className="row sameheight-container">
          <div className="col col-12 col-sm-12 col-md-6 col-xl-5 stats-col">
            <div className="card sameheight-item stats" data-exclude="xs" style={{height: "250px"}}>
              <div className="card-block">
                <div className="title-block">
                  <div style={{display:"flex",justifyContent:"space-between"}}> <h4>Thống kê doanh thu</h4>
                    <Select
                      defaultValue={filterRevenue}
                      style={{
                        width: 100,
                        alignItems:"center",
                        textAlign:"center"
                      }}
                      onChange={handleRevenue}
                      options={[
                        {
                          value: 0,
                          label: 'Ngày',
                        },
                        {
                          value: 1,
                          label: 'Tháng',
                        },
                        {
                          value: 2,
                          label: 'Năm',
                        },
                      ]}
                    />

                  </div>

                  <p className="title-description">
                    Thống kê doanh thu cửa hàng
                  </p>
                </div>
                <div className="row row-sm stats-container">


                  <div className="col-12 col-sm-6  stat-col">
                    <div className="stat-icon">
                      <i className="fa fa-dollar"></i>
                    </div>
                    <div className="stat">
                      <div className="value">{Number(revenue).toLocaleString('it-IT', {style: 'currency', currency: 'VND'})}</div>
                      <div className="name"> Doanh thu</div>
                    </div>
                    <div className="progress stat-progress">
                      <div className="progress-bar" style={{width: "100%"}}></div>
                    </div>
                  </div>
                  {/* <div className="col-12 col-sm-6 stat-col">
                      <div className="stat-icon">
                        <i className="fa fa-rocket"></i>
                      </div>
                      <div className="stat">
                        <div className="value"> {productsSold}</div>
                        <div className="name">Số lượng sản phẩm sold out</div>
                      </div>
                      <div className="progress stat-progress">
                        <div className="progress-bar" style={{width: "100%"}}></div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 stat-col">
                      <div className="stat-icon">
                        <i className="fa fa-shopping-cart"></i>
                      </div>
                      <div className="stat">
                        <div className="value"> {countProduct}</div>
                        <div className="name"> Số lượng sản phẩm</div>
                      </div>
                      <div className="progress stat-progress">
                        <div className="progress-bar" style={{width: "100%"}}></div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6  stat-col">
                      <div className="stat-icon">
                        <i className="fa fa-users"></i>
                      </div>
                      <div className="stat">
                        <div className="value"> 359</div>
                        <div className="name"> Total users</div>
                      </div>
                      <div className="progress stat-progress">
                        <div className="progress-bar" style={{width: "100%"}}></div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6  stat-col">
                      <div className="stat-icon">
                        <i className="fa fa-list-alt"></i>
                      </div>
                      <div className="stat">
                        <div className="value"> 59</div>
                        <div className="name"> Tickets closed</div>
                      </div>
                      <div className="progress stat-progress">
                        <div className="progress-bar" style={{width: "100%"}}></div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 stat-col">
                      <div className="stat-icon">
                        <i className="fa fa-dollar"></i>
                      </div>
                      <div className="stat">
                        <div className="value"> $780.064</div>
                        <div className="name"> Total income</div>
                      </div>
                      <div className="progress stat-progress">
                        <div className="progress-bar" style={{width: "100%"}}></div>
                      </div>
                    </div>*/}
                </div>
              </div>
            </div>
          </div>


          <div className="col col-12 col-sm-12 col-md-6 col-xl-7 history-col">
            <div className="card sameheight-item stats" data-exclude="xs" style={{height: "250px"}}>
              <div className="card-block">
                <div className="title-block">
                  <div style={{display:"flex",justifyContent:"space-between"}}> <h4>Thống kê sản phẩm</h4>
                  </div>

                  <p className="title-description">
                    Thống kê sản phẩm của cửa hàng
                  </p>
                </div>
                <div className="row row-sm stats-container">

                  <div className="col-12 col-sm-6 stat-col">
                    <div className="stat-icon">
                      <i className="fa fa-window-close-o" ></i>
                    </div>
                    <div className="stat">
                      <div className="name">Số lượng sản phẩm sold out</div>
                      <div className="value"> {productsSold}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div className="progress-bar" style={{width: "100%"}}></div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6  stat-col">
                    <div className="stat-icon">
                      <i className="fa fa-list-alt"></i>
                    </div>
                    <div className="stat">
                      <div className="name"> Số lượng order đang xử lý</div>
                      <div className="value"> {countOrder?.orderProcess}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div className="progress-bar" style={{width: "100%"}}></div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 stat-col">
                    <div className="stat-icon">
                      <i className="fa fa-shopping-cart"></i>
                    </div>
                    <div className="stat">
                      <div className="name"> Số lượng sản phẩm</div>
                      <div className="value"> {countProduct}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div className="progress-bar" style={{width: "100%"}}></div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6  stat-col">
                    <div className="stat-icon">
                      <i className="fa fa-list-alt"></i>
                    </div>
                    <div className="stat">
                      <div className="name"> Số lượng order đã hoàn thành</div>
                      <div className="value"> {countOrder?.orderSuccess}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div className="progress-bar" style={{width: "100%"}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="section">
        <div className="row sameheight-container">
          <div className="col-xl-12">
            <div className="card sameheight-item items" data-exclude="xs,sm,lg" style={{height: "400.2px"}}>
              <div className="card-header bordered">
                <div className="header-block">
                  <h3 className="title">Top sản phẩm bán chạy</h3>
                </div>
                <div className="header-block pull-right">
                  <div className="header-block pull-right">
                    <Select
                      defaultValue={filterMaxItem}
                      style={{
                        width: 100,
                        alignItems:"center",
                        textAlign:"center"
                      }}
                      onChange={handleMaxItem}
                      options={[
                        {
                          value: 0,
                          label: 'Ngày',
                        },
                        {
                          value: 1,
                          label: 'Tháng',
                        },
                        {
                          value: 2,
                          label: 'Năm',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <ul className="item-list striped">
                <li className="item item-list-header">
                  <div className="item-row">
                    <div className="item-col item-col-header fixed item-col-img xs"></div>
                    <div className="item-col item-col-header item-col-title">
                      <div>
                        <span>Tên sản phẩm</span>
                      </div>
                    </div>
                    <div className="item-col item-col-header item-col-sales">
                      <div>
                        <span>Đã bán</span>
                      </div>
                    </div>

                    <div className="item-col item-col-header item-col-stats">
                      <div className="no-overflow">
                        <span>Doanh thu</span>
                      </div>
                    </div>
                    <div className="item-col item-col-header item-col-date">
                      <div>
                        <span>Tình trạng</span>
                      </div>
                    </div>
                  </div>
                </li>
                {
                  maxItem.map(index=>(
                    <CardRevenue items={index}/>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </section>




      <section className="section">
        <div className="row sameheight-container">
          <div className="col-xl-12">
            <div className="card sameheight-item items" data-exclude="xs,sm,lg" style={{height: "400.2px"}}>
              <div className="card-header bordered">
                <div className="header-block">
                  <h3 className="title">Top sản phẩm bán chậm</h3>
                </div>
                <div className="header-block pull-right">
                  <Select
                    defaultValue={filterMinItem}
                    style={{
                      width: 100,
                      alignItems:"center",
                      textAlign:"center"
                    }}
                    onChange={handleMinItem}
                    options={[
                      {
                        value: 0,
                        label: 'Ngày',
                      },
                      {
                        value: 1,
                        label: 'Tháng',
                      },
                      {
                        value: 2,
                        label: 'Năm',
                      },
                    ]}
                  />
                </div>
              </div>
              <ul className="item-list striped">
                <li className="item item-list-header">
                  <div className="item-row">
                    <div className="item-col item-col-header fixed item-col-img xs"></div>
                    <div className="item-col item-col-header item-col-title">
                      <div>
                        <span>Tên sản phẩm</span>
                      </div>
                    </div>
                    <div className="item-col item-col-header item-col-sales">
                      <div>
                        <span>Đã bán</span>
                      </div>
                    </div>

                    <div className="item-col item-col-header item-col-stats">
                      <div className="no-overflow">
                        <span>Doanh thu</span>
                      </div>
                    </div>
                    <div className="item-col item-col-header item-col-date">
                      <div>
                        <span>Tình trạng</span>
                      </div>
                    </div>
                  </div>
                </li>
                {
                  minItem.map(index=>(
                    <CardRevenue items={index}/>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default HomePage