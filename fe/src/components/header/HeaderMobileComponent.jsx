import {LIST_NEW_PRODUCT_ROUTE} from "../../configs/url";

const HeaderMobileComponent = (parentCate) => {
    return (
        <>
            <li onClick={()=>{
                navigate("/");
                setChangeSide(false)
            }}>
                <a>Trang chủ</a>
            </li>

            <li onClick={()=>{
                navigate(LIST_NEW_PRODUCT_ROUTE);
                setChangeSide(false)
            }}>
                <a>Sản phẩm mới</a>
            </li>
            {/* <li>
                        <a>Sales</a>
                      </li>*/}
            <li>
                <a onClick={() => {navigate(`/product/6?page=1`); setChangeSide(false)}}>Giày chính hãng<span
                    className="icon-navigate_next"></span></a>
                <ul style={{marginBottom: "0px"}}>
                    <li onClick={() => {navigate(`/product/6?page=1`); setChangeSide(false)}}>
                        <a>Giày Mới</a>
                    </li>
                    <li onClick={() =>{navigate(`/product/7?page=1`); setChangeSide(false)}}>
                        <a >Giày Secondhand Nam</a>
                    </li>
                    <li onClick={() =>{navigate(`/product/19?page=1`); setChangeSide(false)}}>
                        <a >Giày Secondhand Nữ</a>
                    </li>
                    <li onClick={() => {navigate(`/product/8?page=1`); setChangeSide(false)}}>
                        <a >Giày trẻ em</a>
                    </li>
                </ul>
            </li>
            <li>
                <a onClick={() => {navigate(`/product/11?page=1`); setChangeSide(false)}}>Áo chính hãng<span
                    className="icon-navigate_next"></span></a>
                <ul style={{marginBottom: "0px"}}>
                    <li onClick={() => {navigate(`/product/11?page=1`); setChangeSide(false)}}>
                        <a >Áo Thun</a>
                    </li>
                    <li onClick={() => {navigate(`/product/12?page=1`); setChangeSide(false)}}>
                        <a>Áo Khoác</a>
                    </li>
                    <li onClick={() => {navigate(`/product/9?page=1`); setChangeSide(false)}}>
                        <a>Áo Hoodie</a>
                    </li>
                    <li onClick={() =>{navigate(`/product/10?page=1`); setChangeSide(false)}}>
                        <a>Áo Sweater</a>
                    </li>

                </ul>
            </li>
        </>
    )
}


export default HeaderMobileComponent