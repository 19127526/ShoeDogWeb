import CardComponent from "../../components/card/CardComponent";
import SlideComponent from "../../components/slide/SlideComponent";
import "./HomePage.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getListCategories} from "../../apis/categories/CategoriesApi";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import Notification from "../../components/notification/Notification";
import {getListProductsByCatId} from "../../apis/products/ProductsApi";
import LoadingComponent from "../../components/loading/LoadingComponent";

const HomePage = () => {
  const navigate = useNavigate();
  let resultsRef = useRef();
  const [loading,setLoading]=useState(false)
  const [productWithCatId, setProductWithCatId] = useState([{
    category: {
      CatId: null,
      CatName: null
    },
    productList: []
  }])

  useEffect(() => {
    const getListCategory = async () => {
      await getListCategories()
        .then(res => {
          if (res.data.status === 'success') {
            res.data.data.forEach(async index => {
              await getListProductsByCatId(index.CatId)
                .then(res => {
                  if (res.data.status === 'success') {
                    const newElement={
                      category: {...index},
                      productList: [...res.data.data]
                    }
                    setProductWithCatId(prevState => [...prevState,newElement]);

                  } else {
                    Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
                  }
                })
                .catch(err => {
                  Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
                })
            }
            )
            setLoading(true);
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
        })
    }
    getListCategory()

  }, [loading])
  if(loading===false){
    return <LoadingComponent/>
  }



  return (
    <>
    <div className="container" ref={resultsRef}>
      {productWithCatId.map(index =>
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
              {index.productList.map(u => (
                <div className="col-lg-4 col-md-6 ">
                  <CardComponent name={u.ProName}
                                 img={u.ImageMain}
                                 priceDiscount={u.Price} priceNonDiscount={u.Discount === 0 ? null : u.Discount}/>
                </div>
              ))}
            </div>
            {index.productList.length > 9 ?
              <div className="text-center" onClick={() => navigate(`/product/${index.category.CatName}`)}>
                <a className="btn-see-more text-uper">see more</a>
              </div>
              : ""
            }
          </div>
              </>
            ):""}
        </>
      )}
    </div>
    </>
  )
}

export default HomePage