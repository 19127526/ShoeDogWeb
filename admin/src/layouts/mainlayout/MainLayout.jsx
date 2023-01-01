import {Spin} from 'antd';
import {useEffect, useState} from "react";
import RoutesPage from "../../routes/RoutesPage";
import AsideComponent from "../../components/aside/AsideComponent";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingComponent from "../../components/loading/LoadingComponent";
import {turnOffLoading} from "./MainLayout.actions";
import {REGISTER} from "../../configs/url";


const MainLayout = () => {

  const [closeAside, setCloseAside] = useState(false);
  const onclickCloseAside = () => {
    setCloseAside(!closeAside)
  };
  const loadingRedux = useSelector(state => state.mainReducer);
  const dispatch = useDispatch();
  const onClose = () => {
    setCloseAside(false)
  };
  useEffect(() => {
    dispatch(turnOffLoading())
  }, []);
  const location = useLocation();

  return (
    <>

      <div className="main-wrapper">
        <Spin size="large" direction="horizon" spinning={loadingRedux?.isLoading} indicator={<LoadingComponent/>}>
          <div className="app" id="app">
            {location.pathname.includes("login") ||location.pathname.includes(REGISTER)?
              <RoutesPage/> :
              <>
                <AsideComponent/>
                <div className="sidebar-overlay" id="sidebar-overlay"></div>
                <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div className="mobile-menu-handle"></div>
                <RoutesPage/>
              </>
            }
          </div>
        </Spin>
      </div>
    </>
  )
}


export default MainLayout