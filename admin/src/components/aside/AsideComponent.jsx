import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { ORDER_PRODUCT, ORDER_SUCCESS_PRODUCT} from "../../configs/url";
import {useDispatch, useSelector} from "react-redux";
import {logoutAccount} from "../../pages/login/LoginPages.actions";
import {Dropdown, Tooltip} from "antd";
import {
    addParentCate,
    crudCate,
    crudParentCate,
    removeCate,
    removeParentCate, resetMainLayout, selectedCate
} from "../../layouts/mainlayout/MainLayout.actions";
import {getListParentCategory} from "../../layouts/mainlayout/MainLayout.thunk";
import {loginNormal} from "../../pages/login/LoginPage.thunk";


const AsideComponent = (props) => {
    const {loginNormal}=props
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {listParentCate, selectedCateAside: asideCurrent} = useSelector(state => state.mainReducer);
    useEffect(() => {
        if(listParentCate == null) {
            dispatch(getListParentCategory())
        }
    }, [listParentCate]);

    const handleLogout = () => {
        dispatch(resetMainLayout())
        dispatch(logoutAccount());
    }
    return (
        <>
            <header className="header">
                <div className="header-block header-block-collapse d-lg-none d-xl-none">
                    <button className="collapse-btn" id="sidebar-collapse-btn">
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
                <div className="header-block header-block-nav">
                    <ul className="nav-profile">

                        <li className="profile dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true"
                               aria-expanded="true">
                                <div className="img" style={{backgroundImage: ""}}></div>
                                <span className="name">Admin</span>
                            </a>
                            <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenu1"
                                 x-placement="bottom-start"
                                 style={{
                                     position: "absolute",
                                     transform: "translate3d(-72px, 30px, 0px)",
                                     top: "0px",
                                     left: "0px",
                                     willChange: "transform"
                                 }}>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={handleLogout}>
                                    <i className="fa fa-power-off icon"></i> Logout </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
            <aside className="sidebar">
                <div className="sidebar-container">
                    <div className="sidebar-header">
                        <div className="brand"
                             style={{
                                 backgroundColor: "green",
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center"
                             }}>
                            <div className="logo">
                                <span className="l l1"></span>
                                <span className="l l2"></span>
                                <span className="l l3"></span>
                                <span className="l l4"></span>
                                <span className="l l5"></span>
                            </div>
                            <a className="navbar-brand text-brand">Shoe<span className="color-b"> Dog</span></a>
                        </div>
                    </div>
                    <nav className="menu">
                        <ul className="sidebar-menu metismenu" id="sidebar-menu">
                            <li id="dashboard">
                                <a onClick={() => navigate('/admin')}>
                                    <i className="fa fa-home"></i> Thống kê </a>
                            </li>
                            <li id="nav-item">
                                <a>
                                   <Tooltip placement="bottom" title="Thêm mới danh mục cha">
                                       <i className="fa fa-pencil-square-o" onClick={() => {
                                           dispatch(addParentCate({
                                               isOpen: true,
                                           }))
                                       }}>
                                       </i>
                                   </Tooltip>
                                     Quản lí sản phẩm
                                    <i className="fa arrow"></i>
                                </a>
                                <ul className="sidebar-nav">
                                    {listParentCate?.map(index => {
                                        if (index?.ParentId != -1) {
                                            return (
                                                <li key={index?.ParentId} id="nav-item">
                                                    <a className="nav-link"
                                                       style={{display: "flex", justifyContent: "space-between"}}>
                                                        <span style={{paddingLeft: "5%"}}>{index?.ParentName}
                                                            <Dropdown
                                                                menu={{
                                                                    items: [
                                                                        {
                                                                            key: '-1',
                                                                            label: (
                                                                                <a onClick={() => {
                                                                                    dispatch(crudParentCate({
                                                                                        data: {
                                                                                            ...index,
                                                                                            type: -1
                                                                                        },
                                                                                        isOpen: true,
                                                                                    }))
                                                                                }}>
                                                                                    Thêm mới
                                                                                </a>
                                                                            ),
                                                                        },
                                                                        {
                                                                            key: '0',
                                                                            label: (
                                                                                <a onClick={() => {
                                                                                    dispatch(crudParentCate({
                                                                                        isOpen: true,
                                                                                        data: {
                                                                                            ...index,
                                                                                            type: 0
                                                                                        },
                                                                                    }))
                                                                                }}>
                                                                                    Chỉnh sửa
                                                                                </a>
                                                                            ),
                                                                        },
                                                                        {
                                                                            key: '1',
                                                                            label: (
                                                                                <a onClick={() => {
                                                                                    dispatch(removeParentCate({
                                                                                        isOpen: true,
                                                                                        data: index
                                                                                    }))
                                                                                }}
                                                                                >
                                                                                    Xóa
                                                                                </a>
                                                                            ),
                                                                        }
                                                                    ]
                                                                }}
                                                                placement="bottom"
                                                            >
                                                            <i className="right fas fa-pencil-square-o" style={{paddingLeft: "10px"}}></i>
                                                        </Dropdown>
                                                        </span>
                                                        <i className="fa arrow"></i>
                                                    </a>
                                                    {
                                                        index?.ListCategory?.map((cate, key) => {
                                                            return (
                                                                <ul className="nav-treeview">
                                                                    <li key={key} id="nav-item">
                                                                        <a style={{
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            background: asideCurrent != null && asideCurrent?.CatId === cate?.CatId ? "green" : ""
                                                                        }} className="nav-link" onClick={() => {
                                                                            dispatch(selectedCate(cate))
                                                                            navigate(`/admin/category/${cate?.CatId}`)
                                                                        }}>
                                                                            <span
                                                                                style={{paddingLeft: "15%"}}>{cate?.CatName}</span>
                                                                            <Dropdown
                                                                                menu={{
                                                                                    items: [
                                                                                        {
                                                                                            key: '0',
                                                                                            label: (
                                                                                                <a onClick={() => {
                                                                                                    dispatch(crudCate({
                                                                                                        data: {
                                                                                                            ...cate,
                                                                                                            ParentId: index?.ParentId,
                                                                                                            type: 0
                                                                                                        },
                                                                                                        isOpen: true,
                                                                                                    }))
                                                                                                }}>
                                                                                                    Chỉnh sửa
                                                                                                </a>
                                                                                            ),
                                                                                        },
                                                                                        {
                                                                                            key: '1',
                                                                                            label: (
                                                                                                <a onClick={() => {
                                                                                                    dispatch(removeCate({
                                                                                                        data: cate,
                                                                                                        isOpen: true
                                                                                                    }))
                                                                                                }}
                                                                                                >
                                                                                                    Xóa
                                                                                                </a>
                                                                                            ),
                                                                                        }
                                                                                    ]
                                                                                }}
                                                                                placement="bottom"
                                                                            >
                                                                                <i className="right fas fa-pencil-square-o"></i>
                                                                            </Dropdown>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            )
                                                        })
                                                    }
                                                </li>)
                                        }
                                    })}
                                </ul>
                            </li>


                            <li>
                                <a>
                                    <i className="fa fa-pencil-square-o"></i> Quản lí đơn
                                    <i className="fa arrow"></i>
                                </a>
                                <ul className="sidebar-nav">
                                    <li key={1} onClick={() => navigate(ORDER_PRODUCT)}>
                                        <a> Đơn hàng đang xử lý </a>
                                    </li>
                                    <li key={1} onClick={() => navigate(ORDER_SUCCESS_PRODUCT)}>
                                        <a> Đơn hàng đã xử lý </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <div className="modal fade" id="addCategory">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                <i className="fa fa-opera"></i> Thêm danh mục cha</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form-inline">
                                <div className="input-group">
                                    <input type="text" className="form-control boxed rounded-s" style={{width: "400px"}}
                                           placeholder="Tên danh mục..."/>
                                    <span className="input-group-btn align-content-center">
                <button className="btn btn-secondary  rounded-s" data-dismiss="modal" type="button">
                Hủy bỏ
                </button>
                <button className="btn btn-primary rounded-s" data-dismiss="modal" type="button">
                Thêm
                </button>
                </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AsideComponent