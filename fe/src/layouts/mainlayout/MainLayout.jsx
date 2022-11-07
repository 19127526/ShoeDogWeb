import {Drawer, Layout} from 'antd';
import HeaderComponent from "../../components/header/HeaderComponent";

import {Row} from "react-bootstrap";
import {useState} from "react";
import AsideComponent from "../../components/aside/AsideComponent";
import FooterComponent from "../../components/footer/FooterComponent";


const {Header, Footer, Sider, Content} = Layout;

const MainLayout = () => {

  const [closeAside, setCloseAside] = useState(false);
  const onclickCloseAside = () => {
    setCloseAside(!closeAside)
  };
  const onClose = () => {
    setCloseAside(false)
  };
  console.log(closeAside)
  return (
    <div id="wrapper">
      <Row xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
        {/*<Layout style={{display: "flex", flex: 1, height: "auto"}}>
          <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            open={closeAside}
            width="300px"
          >
            <AsideComponent onClose={onClose}/>
          </Drawer>
        </Layout>*/}
        <Layout>
          <HeaderComponent onClickAside={onclickCloseAside}/>
          <Content style={{minHeight: "1500px"}}></Content>
          <FooterComponent/>
        </Layout>
      </Row>
    </div>
  )
}


export default MainLayout