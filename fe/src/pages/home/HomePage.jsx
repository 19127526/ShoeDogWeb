import CardComponent from "../../components/card/CardComponent";
import SlideComponent from "../../components/slide/SlideComponent";
import "./HomePage.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {getListCategories} from "../../apis/categories/CategoriesApi";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import Notification from "../../components/notification/Notification";
import {getListProductsByCatId} from "../../apis/products/ProductsApi";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import {convertArrayToSize} from "../../utils/Utils";
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";
import BoxCardComponent from "../../components/box/BoxCardComponent";


let pageIndex = 12
const HomePage = () => {
  const navigate = useNavigate();
  const [productWithCatId, setProductWithCatId] = useState([{
    category: {
      CatId: null,
      CatName: null
    },
    productList: []
  }]);
  const dispatch = useDispatch();
  const ref = useRef(null);

  useLayoutEffect(
    () => {
      if (productWithCatId.filter(index => index.category.CatId != null).length > 0) {
        ref.current.scrollIntoView({behavior: 'auto', block: 'start'})
      }
    }, [productWithCatId]);


  useEffect(() => {
    const getListCategory = async () => {
      dispatch((turnOnLoading()))
      await getListCategories()
        .then(async res => {
          if (res.data.status === 'success') {
            const tempCategory = res.data.data.filter(index => {
              if (index?.CatId === 11 || index?.CatId === 13 || index?.CatId === 6) {
                return index;
              }
            })
            const [a1, a2, a3] = tempCategory;
            const tempCategoryAfterSort = [a1, a3, a2]
            for (let i = 0; i < tempCategoryAfterSort.length; i++) {
              await getListProductsByCatId(tempCategoryAfterSort[i].CatId)
                .then(res => {
                  if (res.data.status === 'success') {
                    const itemResult = res.data.data.map(index => {
                      return {
                        ...index,
                        TotalPrice: convertArrayToSize(index?.TotalPrice).toString()
                      }
                    });
                    const newElement = {
                      category: {...tempCategoryAfterSort[i]},
                      productList: [...itemResult].reverse()
                    }
                    setProductWithCatId(prevState => [...prevState, newElement]);

                  } else {
                    /* Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)*/
                  }
                })
                .catch(err => {
                  Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
                })

            }


          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
        })
        .finally(() => {
          dispatch(turnOffLoading())
        })
    }
    getListCategory()
  }, []);
  return (
    <>
      <div className="" ref={ref}>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>TRANG CHỦ - SHOEDOG - SHOP GIÀY UY TÍN NHẤT TP.HCM</title>
          <link
              rel="canonical"
              href={CLIENT_URL}
              title="Dòng thông tin SHOEDOG - Shop giày uy tín nhất TP.HCM »"
          />
          <meta
              name="description"
              content="Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1."
          />
        </Helmet>

        {productWithCatId.filter((index => index.category.CatId != null)).map(index =>
            <>
              <>
                {index.productList.length > 0 ?
                    (
                        <>
                          <div className="swiper-container slidehomepage slidehomepage-1 swiper-container-horizontal">
                            <SlideComponent/>
                          </div>
                          <div className="container">
                            <h2 className="text-center title__type">{index.category.CatName}</h2>
                            <div className="row products">
                              {index.productList.map((value, index) => (
                                  index < pageIndex ?
                                      <div className="col-lg-4 col-md-6 col-xs-12 col-sm-12">
                                        <CardComponent name={value?.ProName}
                                                       img={value?.ImageMain.toString().replace('public', 'private')}
                                                       proId={value?.ProId}
                                                       statusPro={value?.StatusPro}
                                                       priceDiscount={value?.TotalPrice}
                                                       discount={value?.Discount}
                                                       priceNonDiscount={value?.Price}/>
                                      </div> : ""
                              ))}
                            </div>
                            {index.productList.length > pageIndex ?
                                <div className="text-center"
                                     onClick={() => navigate(`/product/${index.category.CatId}?page=1`)}>
                                  <a className="btn-see-more text-uper">Xem thêm</a>
                                </div>
                                : ""
                            }
                          </div>
                        </>
                    )

                    : ""}
              </>
            </>
        )}
      </div>
    <BoxCardComponent/>
    </>
  )
}

export default HomePage