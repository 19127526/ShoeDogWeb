import CardComponent from "../../components/card/CardComponent";
import SlideComponent from "../../components/slide/SlideComponent";
import "./HomePage.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {getListCategories} from "../../apis/categories/CategoriesApi";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import Notification from "../../components/notification/Notification";
import {getListProductsByCatId} from "../../apis/products/ProductsApi";
import LoadingComponent from "../../components/loading/LoadingComponent";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import {convertArrayToSize} from "../../utils/Utils";
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";

const HomePage = () => {
  const navigate = useNavigate();
  let resultsRef = useRef();
  const [productWithCatId, setProductWithCatId] = useState([{
    category: {
      CatId: null,
      CatName: null
    },
    productList: []
  }]);
  const dispatch=useDispatch();


  useEffect(() => {
    const getListCategory = async () => {
      dispatch((turnOnLoading()))
      await getListCategories()
        .then(res => {
          if (res.data.status === 'success') {

            const a=res.data.data.filter(index=>{
              if(index?.CatId ===11 || index?.CatId===4 ||index?.CatId===6){
                return index
              }
            })
            a.forEach(async index => {
                await getListProductsByCatId(index.CatId)
                  .then(res => {
                    if (res.data.status === 'success') {
                      const itemResult = res.data.data.map(index => {
                        return{
                          ...index,
                          TotalPrice: convertArrayToSize(index?.TotalPrice).toString()
                        }
                      });
                      const newElement={
                        category: {...index},
                        productList: [...itemResult]
                      }
                      setProductWithCatId(prevState => [...prevState,newElement]);

                    } else {
                     /* Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)*/
                    }
                  })
                  .catch(err => {
                    Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
                  })
              }
            )
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
        })
        .finally(()=>{
          dispatch(turnOffLoading())
        })
    }
    getListCategory()
  }, []);
  return (
    <>

      <div className="container" ref={resultsRef}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>TRANG CHỦ - SHOEDOG - Shop giày uy tín nhất TP.HCM</title>
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

        {productWithCatId.map(index =>
          <>
            {index.category.CatId == 6 || index.category.CatId == 11 || index.category.CatId == 4?
            <>
            {index.productList.length>0?
              (
              <>
              <div className="swiper-container slidehomepage slidehomepage-1 swiper-container-horizontal">
              <SlideComponent/>
              </div>
              <div className="container">
              <h2 className="text-center title__type">{index.category.CatName}</h2>
              <div className="row products">
            {index.productList.map((value,index) => (
              index<9?

              <div className="col-lg-4 col-md-6 ">
              <CardComponent name={value?.ProName}
              img={value?.ImageMain}
              proId={value?.ProId}
              statusPro={value?.StatusPro}
              priceDiscount={value?.TotalPrice}
              discount={value?.Discount}
              priceNonDiscount={value?.Price}/>
              </div>:""
              ))}
              </div>
            {index.productList.length > 9 ?
              <div className="text-center" onClick={() => navigate(`/product/${index.category.CatId}/page=1`)}>
              <a className="btn-see-more text-uper">Xem thêm</a>
              </div>
              : ""
            }
              </div>
              </>
              ):""}
              </>
              :""
            }
          </>
        )}

      </div>

    </>
  )
}

export default HomePage