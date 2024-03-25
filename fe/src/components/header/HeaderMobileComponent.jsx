import {LIST_NEW_PRODUCT_ROUTE} from "../../configs/url";
import {useNavigate} from "react-router-dom";

const HeaderMobileComponent = (props) => {
    const {parentCate, setChangeSide} = props
    const navigate = useNavigate()
    return (

        <>
            <li onClick={() => {
                navigate("/");
                setChangeSide(false)
            }}>
                <a>Trang chủ</a>
            </li>
            {parentCate?.map((value, index) => {
                    if (value?.ParentId == -1) {
                        return (
                            <li key={value?.ParentId}>
                                <a onClick={() => {
                                    navigate(LIST_NEW_PRODUCT_ROUTE);
                                    setChangeSide(false)
                                }}>
                                    {value?.ParentName}
                                    <span className="icon-navigate_next"></span>
                                </a>
                            </li>
                        )
                    }
                return (
                    <li key={value?.ParentId}>
                        <a>
                            {value?.ParentName}
                            <span className="icon-navigate_next"></span>
                        </a>
                        {
                            value?.ListCategory?.map((cate, count) => {
                                return (
                                    <ul style={{marginBottom: "0px"}}>
                                        <li onClick={() => {
                                            navigate(`/product/${cate?.CatId}?page=1`);
                                            setChangeSide(false)
                                        }}>
                                            <a>{cate?.CatName}</a>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                        </li>
                    )
                }
            )}
        </>
    )
}


export default HeaderMobileComponent