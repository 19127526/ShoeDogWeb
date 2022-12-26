import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getListProductsByCatId} from "../../apis/products/ProductsApi";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import CardComponent from "../../components/card/CardComponent";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import "./ListProduct.css"
import {Pagination, Slider, Tag} from "antd";
import ErrorPage from "../error/ErrorPage";
import {convertArrayToOptions} from "../../utils/Utils";

const pageIndex = 6;

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

const minValue = (...args) => {
  const min = args.reduce((acc, val) => {
    return acc < val ? acc : val;
  });
  return min;
}

const maxValue = (...args) => {
  const max = args.reduce((acc, val) => {
    return acc > val ? acc : val;
  });
  return max;
}

const ListProduct = () => {
  const dispatch = useDispatch();
  const [filterButton, setFilterButton] = useState(false);
  const [sortButton, setSortButton] = useState(false);
  const [brandButton, setBrandButton] = useState(false);
  const [sizeButton, setSizeButton] = useState(false);
  const [priceButton, setPriceButton] = useState(false);

  const {product} = useParams();
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
  const [page, setPage] = useState(1);
  const currentIndexPage = pageIndex * page;
  const prevIndexPage = pageIndex * (page - 1);

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
  const navigate = useNavigate()
  useEffect(() => {
    setPage(1);
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

            const total = res.data.data.map(index => index.TotalPrice);
            setListPrice({min: minValue(...total), max: maxValue(...total)});
            setListPriceTemp({min: minValue(...total), max: maxValue(...total)});
            setListBrand(res.data.data.map(index => index.Brand).filter(onlyUnique));
            setItemInCategory(res.data.data);
            setItemTempInCategory(res.data.data);
            setLoading(true)

            if (res.data.Size !== null) {
              const a = res.data.data.map(index => {
                const temp = convertArrayToOptions(index.Size, ", ");
                const tempResult = temp.map(index => {
                  const Size = convertArrayToOptions(index, ": ");
                  return Size[0];
                })
                return tempResult;
              })
              const mySet = new Set()
              for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < a[i].length; j++) {
                  mySet.add(a[i][j])
                }
              }
              setListSize(Array.from(mySet))
            }
          } else {
            setLoading(false);
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
        })
        .finally(() => {
          dispatch(turnOffLoading())
        })
    }
    getListProductByCatId2()
  }, [product])
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
      const tempPriceSet = itemTempInCategory?.filter(index => (index?.TotalPrice <= listPrice.max && index?.TotalPrice >= listPrice.min));
      let tempPrice = itemTempInCategory?.filter(index => (index?.TotalPrice <= listPrice.max && index?.TotalPrice >= listPrice.min));
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
    let tempBrand = itemTempInCategory.filter(index => index.Brand === brandName);
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

    const tempBrandSet = itemTempInCategory.filter(index => index.Brand === brandName);
    if (isChooseAnother === true) {
      setItemInCategory(tempBrand)


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
        return temp[0]
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
    return <ErrorPage/>
  }

  const onChange = (value) => {
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
              <a>Brand <span className="toggleSub icon-add-2"></span></a>
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
              <a onClick={handleChangePrice}>Price <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix" style={{display: "flex", justifyContent: "center", overflowX: "hidden"}}>
                <li style={{width: "100%"}}>
                  <div>
                    <Slider range defaultValue={[listPrice.min, listPrice.max]} vertical={false} onChange={onChange}
                            onAfterChange={onAfterChange} min={listPriceTemp.min} max={listPriceTemp.max}/>
                  </div>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <input type="text" id="amount" readOnly=""
                           value={listPrice.min.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}
                           style={{border: 0, color: "#65a89a", fontWeight: "bold", width: "100%"}}/>
                    <input type="text" id="amount" readOnly=""
                           value={listPrice.max.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}
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
      <div className="row products">
        {itemInCategory.map((value, index) => {
          return prevIndexPage <= index && index < currentIndexPage ? (
            <div className="col-lg-4 col-md-6">
              <CardComponent name={value?.ProName}
                             img={value?.ImageMain}
                             proId={value?.ProId}
                             statusPro={value?.StatusPro}
                             priceDiscount={value?.TotalPrice}
                             priceNonDiscount={value.Discount === 0 ? null : value?.Price}/>
            </div>) : ""
        })}


      </div>
      {itemInCategory.length > pageIndex ?
        <div className="text-center" style={{padding: "10px 0 0 0"}}>
          <Pagination total={itemInCategory.length} current={page} defaultCurrent={1} pageSize={pageIndex}
                      showSizeChanger={false} onChange={(pageindex) => setPage(pageindex)}/>
        </div>
        : ""
      }
    </div>
  )
}

export default ListProduct