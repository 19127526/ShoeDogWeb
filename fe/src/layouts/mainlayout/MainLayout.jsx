import {Drawer, Layout} from 'antd';
import HeaderComponent from "../../components/header/HeaderComponent";

import {Row} from "react-bootstrap";
import {useState} from "react";
import AsideComponent from "../../components/aside/AsideComponent";
import FooterComponent from "../../components/footer/FooterComponent";
import HomePage from "../../pages/home/HomePage";
import CardComponent from "../../components/card/CardComponent";
import RoutesPage from "../../routes/RoutesPage";
import {getWindowHeight, getWindowWidth} from "../../utils/Utils";


const {Header, Footer, Sider, Content} = Layout;

const MainLayout = () => {

  const [closeAside, setCloseAside] = useState(false);
  const onclickCloseAside = () => {
    setCloseAside(!closeAside)
  };
  const onClose = () => {
    setCloseAside(false)
  };
  return (
      <Row xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
        <Layout >
          <body >
          <div id="wrapper">
            <HeaderComponent onClickAside={onclickCloseAside}/>
            <Content>
              <RoutesPage/>
            </Content>
            <FooterComponent/>
          </div>
          </body>
        </Layout>
      </Row>
  )
}


export default MainLayout