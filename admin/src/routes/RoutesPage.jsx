import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Loading from "../components/loading/LoadingComponent";
import {DASHBOARD, DASHBOASH, ORDER_PRODUCT, ORDER_SUCCESS_PRODUCT, REGISTER} from "../configs/url";
import Authenticate from "../guards/AuthenticateRoutes";


const HomePageLazy=React.lazy(()=>import("../pages/home/HomePage"))
const LoginPageLazy=React.lazy(()=>import("../pages/login/LoginPage"))
const RegisterPageLazy=React.lazy(()=>import("../pages/register/RegisterPage"))
const ProDuctListItemPageLazy=React.lazy(()=>import("../pages/product/ListProductPage/ProductListPage"))
const ProductItemDetailPageLazy=React.lazy(()=>import("../pages/product/DetailProductPage/ProductDetailPage"))
const AddItemProductPageLazy=React.lazy(()=>import("../pages/product/AddProductPage/AddProductPage"))
const EditItemProductPageLazy=React.lazy(()=>import("../pages/product/EditProductPage/EditProductPage"))
const OrderItemProductPageLazy=React.lazy(()=>import("../pages/order/OrderProcessPage"))
const OrderItemProductSuccessPageLazy=React.lazy(()=>import("../pages/order/OrderSuccessPage"))
const ErrorPageLazy=React.lazy(()=>import("../pages/error/ErrorPage"))
const RoutesPage=()=>{
  return (
    <Routes>
      <Route index path={"/"}   element={<React.Suspense fallback={<Loading/>} > <Authenticate>
        <Navigate to={DASHBOARD} replace />
      </Authenticate>
      </React.Suspense>}
      />
     {/* <Route path="/home"  element={<React.Suspense fallback={<Loading/>} >  <DetailPageLazy/> </React.Suspense>}/>*/}
      <Route index path={DASHBOARD}   element={<React.Suspense fallback={<Loading/>} > <Authenticate>
        <HomePageLazy/>
      </Authenticate>
      </React.Suspense>}
      />
      <Route path="/login"  element={<React.Suspense fallback={<Loading/>} >  <LoginPageLazy/> </React.Suspense>}/>

      <Route path={REGISTER}  element={<React.Suspense fallback={<Loading/>} >  <RegisterPageLazy/> </React.Suspense>}/>
      <Route path="/admin/product/add"  element={<React.Suspense fallback={<Loading/>} > <Authenticate>
        <AddItemProductPageLazy/>
      </Authenticate>
      </React.Suspense>
      }
      />
      <Route path="/admin/category/:catId"  element={<React.Suspense fallback={<Loading/>} ><Authenticate>
        <ProDuctListItemPageLazy/>
        </Authenticate>
      </React.Suspense>
      }
      />
      <Route path="/admin/category/:catId/page=:pageindex"  element={<React.Suspense fallback={<Loading/>} ><Authenticate>
        <ProDuctListItemPageLazy/>
      </Authenticate>
      </React.Suspense>
      }
      />
      <Route path="/admin/category/:catId/:proId"  element={<React.Suspense fallback={<Loading/>} >  <Authenticate>
        <ProductItemDetailPageLazy/>
      </Authenticate>
      </React.Suspense>
      }
      />
      <Route path="/admin/product/edit/:proId"  element={<React.Suspense fallback={<Loading/>} >  <Authenticate>
        <EditItemProductPageLazy/>
      </Authenticate>
      </React.Suspense>
      }
      />
      <Route path={ORDER_PRODUCT}  element={<React.Suspense fallback={<Loading/>} >  <Authenticate>
        <OrderItemProductPageLazy/>
      </Authenticate>
      </React.Suspense>
      }
      />
      <Route path={ORDER_SUCCESS_PRODUCT}  element={<React.Suspense fallback={<Loading/>} >  <Authenticate>
        <OrderItemProductSuccessPageLazy/>
      </Authenticate>
      </React.Suspense>
      }
      />
      <Route path="*" element={<React.Suspense fallback={<Loading/>} >  <ErrorPageLazy/> </React.Suspense>}/>
    </Routes>
  )
}

export default RoutesPage