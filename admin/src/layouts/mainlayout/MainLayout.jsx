import {Layout} from 'antd';
import {useEffect, useState} from "react";
import RoutesPage from "../../routes/RoutesPage";
import AsideComponent from "../../components/aside/AsideComponent";
import {useLocation} from "react-router-dom";

const {Header, Footer, Sider, Content} = Layout;

const MainLayout = () => {

  const [closeAside, setCloseAside] = useState(false);
  const onclickCloseAside = () => {
    setCloseAside(!closeAside)
  };
  const onClose = () => {
    setCloseAside(false)
  };
  useEffect(() => {
  }, []);
  const location = useLocation();

  return (
    <div className="main-wrapper">
      <div className="app" id="app">
        {location.pathname.includes("login") ?
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
    </div>
  )
}


export default MainLayout