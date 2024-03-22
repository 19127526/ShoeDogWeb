import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {getListProductsByCatId} from "../../apis/products/ProductsApi";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import CardComponent from "../../components/card/CardComponent";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import "./ListProduct.css"
import {Pagination, Slider, Tag,Badge} from "antd";
import ErrorPage from "../error/ErrorPage";
import {convertArrayToOptions, convertArrayToQuantity, convertArrayToSize, maxValue, minValue} from "../../utils/Utils";
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";
import NothingProduct from "../nothingproduct/NothingProduct";
import {useOnLoadImages} from "../../customhooks/useOnLoadImages";

const pageIndex = 12;



const ListProduct = () => {
  const dispatch = useDispatch();
  const [filterButton, setFilterButton] = useState(false);
  const [sortButton, setSortButton] = useState(false);
  const [brandButton, setBrandButton] = useState(false);
  const [sizeButton, setSizeButton] = useState(false);
  const [priceButton, setPriceButton] = useState(false);

  const {product} = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const [itemInCategory, setItemInCategory] = useState([]);
  const [itemTempInCategory, setItemTempInCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [listPrice, setListPrice] = useState({
    min: null,
    max: null
  })
  const [listPriceTemp, setListPriceTemp] = useState({
    min: null,
    max: null
  })
  const [pageCurrent, setPageCurrent] = useState(1);
  const currentIndexPage = pageIndex * pageCurrent;
  const prevIndexPage = pageIndex * (pageCurrent - 1);

  const [stateFilter, setStateFilter] = useState([
    {
      name: "Brand",
      nameIndex: null,
      state: false,
      arr: []
    },
    {
      name: "Size",
      nameIndex: null,
      state: false,
      arr: []
    },
    {
      name: "Sort",
      nameIndex: null,
      state: false,
      arr: []
    },

    {
      name: "Price",
      state: false,
      arr: []
    },

  ])

  const [turnOnSliderPrice, setTurnOnSliderPrice] = useState(false);
  const [chooseAnotherFilter, setChooseAnotherFilter] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);

  useEffect(() => {
    if(listPriceTemp.max!=null) {
      setListPriceTemp({
        min: null,
        max: null
      })
      setListPrice({
        min: null,
        max: null
      })
    }
  }, [product])
  useEffect(() => {
    setSortButton(false)
    setStateFilter([
      {
        name: "Brand",
        nameIndex: null,
        state: false,
        arr: []
      },
      {
        name: "Size",
        nameIndex: null,
        state: false,
        arr: []
      },
      {
        name: "Sort",
        state: false,
        nameIndex: null,
        arr: []
      },
      {
        name: "Price",
        state: false,
        nameIndex: "Price",
        arr: []
      },
    ])
    const getListProductByCatId2 = async () => {
      dispatch(turnOnLoading())
      await getListProductsByCatId(product)
        .then(res => {
          if (res.data.status === 'success') {
            if (res.data.data.length != 0) {
              const total = res.data.data.map(index => index.TotalPrice);

              let temp=[]
              for(let i=0;i<total.length;i++){
                convertArrayToQuantity(total[i]).forEach(index=>{
                  temp.push(Number(index));
                })
              }
              setListPrice({min: minValue(...temp), max: maxValue(...temp)});
              setListPriceTemp({min: minValue(...temp), max: maxValue(...temp)});


              let tempBrand = new Set()
              for (let i = 0; i < res.data.data.length; i++) {
                const temp = convertArrayToOptions(res.data.data[i].Brand, ", ");
                for (let i = 0; i < temp.length; i++) {
                  tempBrand.add(temp[i]);
                }
              }

              const itemResult = res.data.data.reverse().map(index => {
                return{
                  ...index,
                  TotalPrice: convertArrayToSize(index?.TotalPrice).toString()
                }
              });

              setListBrand(Array.from(tempBrand));
              setItemInCategory(itemResult);
              setItemTempInCategory(itemResult);
              setLoading(true)

              if (res.data.Size !== null) {
                let sizeArr=new Set();
                res.data.data.map(index=>{
                  const temp=convertArrayToSize(index?.Size);
                  for(let i=0;i<temp.length;i++){
                    sizeArr.add(temp[i]);
                  }
                })
                setListSize(new Array(...sizeArr))
              }
            }
            else{
              setLoading(false);
            }
          }/* else {
            setLoading(false);
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }*/
        })
        .catch(err => {
          Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
        })
        .finally(() => {
          dispatch(turnOffLoading())
        })
    }
    getListProductByCatId2()
  }, [product]);
  useEffect(()=>{
    dispatch(turnOnLoading())
    const pageTemp = new URLSearchParams(location.search).get('page')
    if(pageTemp == undefined){
      setPageCurrent(1);
    }
    else{
      setPageCurrent(pageTemp);
    }
    dispatch(turnOffLoading())
  },[new URLSearchParams(location.search).get('page')])
  useEffect(() => {
    if (filterButton === true) {
      document.body.classList.add("filterActive")
    } else {
      document.body.classList.remove("filterActive")
    }
  }, [filterButton]);



  useEffect(() => {
    if (turnOnSliderPrice === false) {
      return;
    } else {
      dispatch(turnOnLoading());
      let isChooseAnother = false;
      const tempPriceSet = itemTempInCategory?.filter((value,index) => {
        const temp=convertArrayToOptions(value?.TotalPrice,",");
        for(let i=0;i<temp.length;i++){
          if(Number(temp[i]) <= Number(listPrice.max) && Number(temp[i]) >= Number(listPrice.min)){
            return( temp[i] <= listPrice.max && temp[i] >= listPrice.min)
          }
        }
      });
      let tempPrice = itemTempInCategory?.filter(value => {
        const temp=convertArrayToOptions(value?.TotalPrice,",");
        for(let i=0;i<temp.length;i++){
          if(Number(temp[i]) <= Number(listPrice.max) && Number(temp[i]) >= Number(listPrice.min)){
            return( temp[i] <= listPrice.max && temp[i] >= listPrice.min)
          }
        }
      });
      for (let i = 0; i < stateFilter.length; i++) {
        if (stateFilter[i].name !== "Price") {
          if (stateFilter[i].state === true) {
            isChooseAnother = true;
            const temp = tempPrice.map(index => {
              let isFlag = false;
              for (let j = 0; j < stateFilter[i].arr.length; j++) {
                if (stateFilter[i].arr[j].ProId === index.ProId) {
                  isFlag = true;
                  return index;
                }
              }
              if (isFlag === false) {
                return null
              }
            }).filter(index => index !== null)
            tempPrice = temp;
          }
        }
      }

      if (isChooseAnother === true) {
        setPageCurrent(1);
        setItemInCategory(tempPrice)
        const tempBrand2 = stateFilter.map(index => {
          if (index.name === "Price") {
            return {
              name: "Price",
              state: true,
              nameIndex: "Price",
              arr: tempPriceSet,
            }
          } else {
            return index
          }
        })
        setStateFilter(tempBrand2)
      } else if (isChooseAnother === false) {
        setPageCurrent(1);
        setItemInCategory(tempPrice)
        const tempBrand2 = stateFilter.map(index => {
          if (index.name === "Price") {
            return {
              name: "Price",
              state: true,
              nameIndex: "Price",
              arr: tempPrice,
            }
          } else {
            return index
          }
        })
        setStateFilter(tempBrand2)
      }
      dispatch(turnOffLoading())
    }

  }, [listPrice])


  const filterBrand = (brandName) => {

    dispatch(turnOnLoading());


    let isChooseAnother = false;
    let tempBrand = itemTempInCategory.filter(index => index.Brand.includes(brandName));
    for (let i = 0; i < stateFilter.length; i++) {
      if (stateFilter[i].name !== "Brand") {
        if (stateFilter[i].state === true) {
          isChooseAnother = true;
          const temp = tempBrand.map(index => {
            let isFlag = false;
            for (let j = 0; j < stateFilter[i].arr.length; j++) {
              if (stateFilter[i].arr[j].ProId === index.ProId) {
                isFlag = true;
                return index;
              }
            }
            if (isFlag === false) {
              return null
            }
          }).filter(index => index !== null)
          tempBrand = temp;
        }
      }
    }

    const tempBrandSet = itemTempInCategory.filter(index => index.Brand.includes(brandName));
    if (isChooseAnother === true) {
      setItemInCategory(tempBrand)
      setPageCurrent(1);
      const tempBrand2 = stateFilter.map(index => {
        if (index.name === "Brand") {
          return {
            name: "Brand",
            state: true,
            arr: tempBrandSet,
            nameIndex: brandName
          }
        } else {
          return index
        }
      })
      setStateFilter(tempBrand2)
    } else if (isChooseAnother === false) {
      setItemInCategory(tempBrand)
      setPageCurrent(1);
      const tempBrand2 = stateFilter.map(index => {
        if (index.name === "Brand") {
          return {
            name: "Brand",
            state: true,
            arr: tempBrandSet,
            nameIndex: brandName
          }
        } else {
          return index
        }
      })
      setStateFilter(tempBrand2)
    }
    setFilterButton(false);
    setChooseAnotherFilter(true)
    dispatch(turnOffLoading());
  }

  const filterSize = (sizeName) => {
    dispatch(turnOnLoading());
    let isChooseAnother = false;
    const sizeArr = itemTempInCategory.map(index => {
      const a = convertArrayToOptions(index.Size, ", ");
      const tempResult = a.map(index => {
        const temp = convertArrayToOptions(index, ": ");
        return temp[1]
      })
      return {value:index, size: tempResult};
    })
    let tempSize = sizeArr.filter(index=>{
      for(let i=0;i<index.size.length;i++){
        if(index.size[i]===(sizeName)){
          return true;
        }
      }
    }).map(index=>index.value);
    for (let i = 0; i < stateFilter.length; i++) {
      if (stateFilter[i].name !== "Size") {
        if (stateFilter[i].state === true) {
          isChooseAnother = true;
          const temp = tempSize.map(index => {
            let isFlag = false;
            for (let j = 0; j < stateFilter[i].arr.length; j++) {
              if (stateFilter[i].arr[j].ProId === index.ProId) {
                isFlag = true;
                return index;
              }
            }
            if (isFlag === false) {
              return null
            }
          }).filter(index => index !== null)
          tempSize = temp;
        }
      }
    }
    const tempSizeSet = sizeArr.filter(index=>{
      for(let i=0;i<index.size.length;i++){
        if(index.size[i]===(sizeName)){
          return true;
        }
      }
    }).map(index=>index.value);
    if (isChooseAnother === true) {
      setItemInCategory(tempSize)
      setPageCurrent(1);
      const tempBrand2 = stateFilter.map(index => {
        if (index.name === "Size") {
          return {
            name: "Size",
            state: true,
            arr: tempSizeSet,
            nameIndex: sizeName
          }
        } else {
          return index
        }
      })
      setStateFilter(tempBrand2)
    } else if (isChooseAnother === false) {
      setPageCurrent(1);
      setItemInCategory(tempSize)
      const tempBrand2 = stateFilter.map(index => {
        if (index.name === "Size") {
          return {
            name: "Size",
            state: true,
            arr: tempSizeSet,
            nameIndex: sizeName
          }
        } else {
          return index
        }
      })
      setStateFilter(tempBrand2)
    }
    setFilterButton(false);
    setChooseAnotherFilter(true)
    dispatch(turnOffLoading());
  }
  const handleChangeFilter = () => {
    setFilterButton(!filterButton);
  }


  const handleCloseFilter = () => {
    setFilterButton(false);
    setSortButton(false)
    setBrandButton(false)
    setSizeButton(false)
    setPriceButton(false)
  }
  const handleChangeBrand = (e) => {
    setSortButton(false)
    setBrandButton(!brandButton);
  }
  const handleChangeSize = () => {
    setSortButton(false)
    setSizeButton(!sizeButton);
  }
  const handleChangePrice = () => {
    setSortButton(false)
    setPriceButton(!priceButton);
  }
  const log = (e, name) => {
    e.preventDefault();
    let tempRemove = itemTempInCategory;
    for (let i = 0; i < stateFilter.length; i++) {
      if (stateFilter[i].name !== name) {
        if (stateFilter[i].state === true) {
          const temp = tempRemove.map(index => {
            let isFlag = false;
            for (let j = 0; j < stateFilter[i].arr.length; j++) {
              if (stateFilter[i].arr[j].ProId === index.ProId) {
                isFlag = true;
                return index;
              }
            }
            if (isFlag === false) {
              return null
            }
          }).filter(index => index !== null)
          tempRemove = temp;
        }
      }
    }
    setItemInCategory(tempRemove);

    setChooseAnotherFilter(false);
    const tempState = stateFilter.map(index => {
      if (index.name === name) {
        return {...index, state: false, arr: []}
      } else {
        return index
      }
    })
    setStateFilter(tempState);

  }

  if (loading === false) {
    return <NothingProduct/>
  }

  const onChangePrice = (value) => {
    if (value[0] === listPrice.min && value[1] === listPrice.max) {
      setTurnOnSliderPrice(false);
    } else {
      setTurnOnSliderPrice(true);
    }

    setListPrice({
      min: value[0],
      max: value[1]
    })
  };
  const onAfterChange = (value) => {
    if (value[0] === listPrice.min && value[1] === listPrice.max) {
      setTurnOnSliderPrice(false);
    } else {
      setTurnOnSliderPrice(true);
    }
    setListPrice({
      min: value[0],
      max: value[1]
    })
  };
  return (
    <div className="container container-list-product">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${itemInCategory[0]?.CatName} - SHOEDOG - Shop giày uy tín nhất TP.HCM`}</title>
        <link
          rel="canonical"
          href={CLIENT_URL+`/product/${product}?page=${new URLSearchParams(location.search).get('page')}`}
          title={`Danh sách danh mục - ${itemInCategory[0]?.CatName} - Shop giày uy tín nhất TP.HCM »`}
        />
        <meta
          name="description"
          content={`Danh sách danh mục ${itemInCategory[0]?.CatName}. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
        />
      </Helmet>
      <div className="text-center">
        <div className="typeProducts">
          <div className="row text-title" style={{width: "100%"}}>
            {itemInCategory[0]?.CatName === null ?
              <div className="col-xs-12"><h2 style={{textAlign: "center"}}>Nothing</h2></div>
              :
              <div className="col-xs-12">
                <h2 style={{textAlign: "center"}}>
                  {itemInCategory[0]?.CatName}
                </h2>
              </div>
            }

            <div className="col-xs-9 filter-screen">
              <div className="bootstrap-tagsinput">
                {
                  stateFilter.map(index => {
                    if (index.state === true) {
                      return (<Tag closable onClose={(e) => log(e, index?.name)}>{index?.nameIndex}</Tag>)
                    } else {
                      return ""
                    }
                  })
                }
                {/* {resultFilter.brand===null?"":(<Tag closable onClose={log} >{resultFilter.brand}</Tag>)}
                {resultFilter.size===null?"":(<Tag closable onClose={log}>{resultFilter.size}</Tag>)}
                {resultFilter.sort===null?"":(<Tag closable onClose={log}>{resultFilter.sort}</Tag>)}*/}
              </div>

            </div>
            <div className="col-xs-3">
              <div className="typeFilter text-left">
                <a className="filterToggle" onClick={handleChangeFilter}><span
                  className="icon-settings"></span>Filter</a>
              </div>
            </div>
          </div>

        </div>

        <div className="menuFilter">
          <a className="filterClose" onClick={handleCloseFilter}><span
            className="icon-meunu-close"></span></a>
          <div className="filterIcon"><span className="icon-settings"></span>Filter</div>
          <div className="filterItems">
            {/*<div className={sortButton === true ? "dropdown open" : "dropdown"}
                 onClick={() => setSortButton(!sortButton)}>
              <div className="btn btn-default btn-xs dropdown-toggle" type="button" id="sortUsers"
                   data-toggle="dropdown">
                Sort &nbsp;&nbsp;
                <span className="caret"></span>
              </div>
              <ul className="dropdown-menu" role="menu" aria-labelledby="sortUsers">
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=c.price_asc">Price: lowest
                  first <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></a></li>
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=c.price_desc">Price:
                  highest first <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></a></li>
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=a.created_at_desc">New to
                  Old <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></a></li>
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=a.created_at_asc">Old to
                  New <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></a></li>
              </ul>
            </div>*/}


            <div className={brandButton === true ? "filterItem active" : "filterItem"} onClick={handleChangeBrand}>
              <a>Thương hiệu <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                {listBrand.map(index => index === null ? "" : (
                  <li onClick={() => filterBrand(index)}><a>{index}</a></li>))}
              </ul>
            </div>


            <div className={sizeButton === true ? "filterItem active" : "filterItem"} onClick={handleChangeSize}>
              <a>Size <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                {listSize.map(index => index === null ? "" : (
                  <li onClick={() => filterSize(index)}><a>{index}</a></li>))}
              </ul>
            </div>


            <div className={priceButton === true ? "filterItem active" : "filterItem"}>
              <a onClick={handleChangePrice}>Giá tiền <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix" style={{display: "flex", justifyContent: "center", overflowX: "hidden"}}>
                <li style={{width: "100%"}}>
                  <div>
                    <Slider range defaultValue={[listPrice.min, listPrice.max]} vertical={false} onChange={onChangePrice}
                            onAfterChange={onAfterChange} min={listPriceTemp.min} max={listPriceTemp.max}/>
                  </div>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <input type="text" id="amount" readOnly=""
                           value={listPrice.min?.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}
                           style={{border: 0, color: "#65a89a", fontWeight: "bold", width: "100%"}}/>
                    <input type="text" id="amount" readOnly=""
                           value={listPrice.max?.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}
                           style={{
                             border: 0,
                             color: "#65a89a",
                             fontWeight: "bold",
                             width: "100%",
                             paddingLeft: "20%"
                           }}/>
                  </div>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row products app" ref={wrapperRef}>
        {itemInCategory.map((value, index) => {
          return prevIndexPage <= index && index < currentIndexPage ? (
            <div className="col-lg-4 col-md-6 col-xs-12" key={value?.ProId}>
              <CardComponent name={value?.ProName}
                             img={value?.ImageMain.toString().replace('public', 'private')}
                             proId={value?.ProId}
                             statusPro={value?.StatusPro}
                             priceDiscount={value?.TotalPrice}
                             discount={value?.Discount}
                             priceNonDiscount={value?.Price}/>
            </div>) : ""
        })}


      </div>
      {itemInCategory.length > pageIndex ?
        <div className="text-center" style={{padding: "10px 0 0 0"}}>
          <Pagination total={itemInCategory.length} current={Number(pageCurrent)} defaultCurrent={Number(pageCurrent)} pageSize={pageIndex}
                      showSizeChanger={false} onChange={(pageIndexTemp) => {
                         setPageCurrent(pageIndexTemp);
                        navigate(`/product/${product}?page=${pageIndexTemp}`)
                      }}/>
        </div>
        : ""
      }
    </div>
  )
}

export default ListProduct