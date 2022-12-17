import {Route,Routes} from "react-router-dom";
import React from "react";
import Loading from "../components/loading/LoadingComponent";
import {
  DETAIL_PRODUCT_ROUTE,
  ERROR_ROUTE,
  HOME_ROUTE,
  LIST_PRODUCT_CATEGORYID_ROUTE,
  ORDER_PRODUCT_ROUTE, ORDER_SUCCESS_ROUTE
} from "../configs/url";


const HomePageLazy=React.lazy(()=>import("../pages/home/HomePage"))
const DetailPageLazy=React.lazy(()=>import("../pages/detail/DetailPage"))
const OrderPageLazy=React.lazy(()=>import("../pages/order/OrderPage"))
const CartPageLazy=React.lazy(()=>import("../pages/cart/CartPage"))
const ListProductLazy=React.lazy(()=>import("../pages/listproduct/ListProduct"))
const ErrorPageLazy=React.lazy(()=>import("../pages/error/ErrorPage"))
const OrderSuccessPageLazy=React.lazy(()=>import("../pages/order/OrderSuccessPage"))
const RoutesPage=()=>{
  return (
    <Routes>
     {/* <Route path="/home"  element={<React.Suspense fallback={<Loading/>} >  <DetailPageLazy/> </React.Suspense>}/>*/}
      <Route path={ERROR_ROUTE} element={<React.Suspense fallback={<Loading/>} >  <ErrorPageLazy/> </React.Suspense>}/>
      <Route path={HOME_ROUTE} element={<React.Suspense fallback={<Loading/>} >  <HomePageLazy/> </React.Suspense>}/>
      <Route path={DETAIL_PRODUCT_ROUTE}  element={<React.Suspense fallback={<Loading/>} >  <DetailPageLazy/> </React.Suspense>}/>
      <Route path={ORDER_PRODUCT_ROUTE} element={<React.Suspense fallback={<Loading/>} >  <OrderPageLazy/> </React.Suspense>}/>
      <Route path={ORDER_SUCCESS_ROUTE} element={<React.Suspense fallback={<Loading/>} >  <OrderSuccessPageLazy/> </React.Suspense>}/>
      <Route path={LIST_PRODUCT_CATEGORYID_ROUTE}  element={<React.Suspense fallback={<Loading/>} >  <ListProductLazy/> </React.Suspense>}/>
      <Route path="*" element={<React.Suspense fallback={<Loading/>} >  <ErrorPageLazy/> </React.Suspense>}/>
    </Routes>
  )
}

export default RoutesPage