import {Route,Routes} from "react-router-dom";
import React from "react";
import Loading from "../components/loading/LoadingComponent";


const HomePageLazy=React.lazy(()=>import("../pages/home/HomePage"))
const DetailPageLazy=React.lazy(()=>import("../pages/detail/DetailPage"))
const OrderPageLazy=React.lazy(()=>import("../pages/order/OrderPage"))
const CartPageLazy=React.lazy(()=>import("../pages/cart/CartPage"))

const RoutesPage=()=>{
  return (
    <Routes>
     {/* <Route path="/home"  element={<React.Suspense fallback={<Loading/>} >  <DetailPageLazy/> </React.Suspense>}/>*/}
      <Route path="/"  element={<React.Suspense fallback={<Loading/>} >  <HomePageLazy/> </React.Suspense>}/>
      <Route path="/detail"  element={<React.Suspense fallback={<Loading/>} >  <DetailPageLazy/> </React.Suspense>}/>
      <Route path="/order"  element={<React.Suspense fallback={<Loading/>} >  <OrderPageLazy/> </React.Suspense>}/>
    </Routes>
  )
}

export default RoutesPage