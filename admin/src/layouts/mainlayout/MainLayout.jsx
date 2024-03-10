import {Spin} from 'antd';
import {useEffect, useState} from "react";
import RoutesPage from "../../routes/RoutesPage";
import AsideComponent from "../../components/aside/AsideComponent";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingComponent from "../../components/loading/LoadingComponent";
import {turnOffLoading} from "./MainLayout.actions";
import {REGISTER} from "../../configs/url";
import RemoveParentDialog from "../../components/dialog/parent/RemoveParentDialog";
import CrudParentDialog from "../../components/dialog/parent/CrudParentDialog";
import RemoveCateDialog from "../../components/dialog/category/RemoveCateDialog";
import CrudCateDialog from "../../components/dialog/category/CrudCateDialog";
import AddParentDialog from "../../components/dialog/parent/AddParentDialog";


const MainLayout = () => {

  const [closeAside, setCloseAside] = useState(false);
  const onclickCloseAside = () => {
    setCloseAside(!closeAside)
  };
  const {isLoading,dialogRemoveParent, dialogAddParent, dialogEditParent, dialogRemoveCate, dialogEditCate } = useSelector(state => state.mainReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken"): null
  const location = useLocation();
  const onClose = () => {
    setCloseAside(false)
  };
  useEffect(() => {
    dispatch(turnOffLoading())
  }, []);

  useEffect(() => {
    if(accessToken == null) {
      navigate("/login")
    }
  },[accessToken])

  return (
    <>

      <div className="main-wrapper">
        <Spin size="large" direction="horizon" spinning={isLoading} indicator={<LoadingComponent/>}>
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
            {dialogAddParent &&<AddParentDialog/>}
            {dialogRemoveParent && <RemoveParentDialog/>}
            {dialogEditParent && <CrudParentDialog/>}
            {dialogRemoveCate && <RemoveCateDialog/>}
            {dialogEditCate && <CrudCateDialog/>}
          </div>
        </Spin>
      </div>
    </>
  )
}


export default MainLayout