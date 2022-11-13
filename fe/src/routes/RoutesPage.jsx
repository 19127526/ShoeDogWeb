import {Route,Routes} from "react-router-dom";
import React from "react";
import Loading from "../components/loading/LoadingComponent";


const HomePageLazy=React.lazy(()=>import("../pages/home/HomePage"))
const DetailPageLazy=React.lazy(()=>import("../pages/detail/DetailPage"))
const DetailPageLazy2=React.lazy(()=>import("../components/loading/LoadingComponent"))

const RoutesPage=()=>{
  return (
    <Routes>
      <Route path="/home"  element={<React.Suspense fallback={<Loading/>} >  <DetailPageLazy2/> </React.Suspense>}/>
      <Route path="/"  element={<React.Suspense fallback={<Loading/>} >  <HomePageLazy/> </React.Suspense>}/>
      <Route path="/detail"  element={<React.Suspense fallback={<Loading/>} >  <DetailPageLazy/> </React.Suspense>}/>
    </Routes>
  )
}

export default RoutesPage