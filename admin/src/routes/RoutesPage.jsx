import {Route,Routes} from "react-router-dom";
import React from "react";
import Loading from "../components/loading/LoadingComponent";
import {ORDER_PRODUCT} from "../configs/url";


const HomePageLazy=React.lazy(()=>import("../pages/home/HomePage"))
const ChartPageLazy=React.lazy(()=>import("../pages/chart/ChartPage"))
const LoginPageLazy=React.lazy(()=>import("../pages/login/LoginPage"))
const ProDuctListItemPageLazy=React.lazy(()=>import("../pages/category/ProductListPage"))
const ProductItemDetailPageLazy=React.lazy(()=>import("../pages/category/ProductDetailPage"))
const AddItemProductPageLazy=React.lazy(()=>import("../pages/category/AddProductPage"))
const EditItemProductPageLazy=React.lazy(()=>import("../pages/category/EditProductPage"))
const OrderItemProductPageLazy=React.lazy(()=>import("../pages/order/OrderPage"))
const RoutesPage=()=>{
  return (
    <Routes>
     {/* <Route path="/home"  element={<React.Suspense fallback={<Loading/>} >  <DetailPageLazy/> </React.Suspense>}/>*/}
      <Route path="/"  element={<React.Suspense fallback={<Loading/>} >  <HomePageLazy/> </React.Suspense>}/>
      <Route path="/login"  element={<React.Suspense fallback={<Loading/>} >  <LoginPageLazy/> </React.Suspense>}/>
      <Route path="/chart"  element={<React.Suspense fallback={<Loading/>} >  <ChartPageLazy/> </React.Suspense>}/>
      <Route path="/admin/product/add"  element={<React.Suspense fallback={<Loading/>} > <AddItemProductPageLazy/> </React.Suspense>}/>
      <Route path="/admin/category/:catId"  element={<React.Suspense fallback={<Loading/>} > <ProDuctListItemPageLazy/> </React.Suspense>}/>
      <Route path="/admin/category/:catId/:proId"  element={<React.Suspense fallback={<Loading/>} > <ProductItemDetailPageLazy/> </React.Suspense>}/>
      <Route path="/admin/product/edit/:proId"  element={<React.Suspense fallback={<Loading/>} > <EditItemProductPageLazy/> </React.Suspense>}/>
      <Route path={ORDER_PRODUCT}  element={<React.Suspense fallback={<Loading/>} > <OrderItemProductPageLazy/> </React.Suspense>}/>
    </Routes>
  )
}

export default RoutesPage