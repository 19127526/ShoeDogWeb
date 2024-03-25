import imageClothing from "../../assets/img/box/clothing.jpg"
import imageSneaker from "../../assets/img/box/sneaker.jpg"
import imageAccessories from "../../assets/img/box/accessories.jpg"
import {useNavigate} from "react-router-dom";
import "./BoxCardComponent.css"
const BoxCardComponent = () => {
    const navigate = useNavigate()
    return (
        <div className="container slide_blockThree">


            <div className="row">
                <div className="col-sm-4 col-xs-12">
                    <div className="swiper-container swiper__group swiper-container-horizontal">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide wrap-img swiper-slide-active">
                                <img className="lazy" src={imageClothing}
                                     alt="Quần Áo" title="Quần Áo" style={{display: "inline-block"}}/>
                                <div className="desc">
                                    <h2><a onClick={() => navigate('/product/11?page=1')} className="btn btn-glab">Quần
                                        Áo</a></h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                    <div className="swiper-container swiper__group swiper-container-horizontal">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide wrap-img swiper-slide-active">
                                <img className="lazy" src={imageSneaker}
                                     alt="Giày Dép" title="Giày Dép" style={{display: "inline-block"}}/>
                                <div className="desc">
                                    <h2><a onClick={() => navigate('/product/6?page=1')} className="btn btn-glab">Giày
                                        Dép</a></h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                    <div className="swiper-container swiper__group swiper-container-horizontal">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide wrap-img swiper-slide-active">
                                <img className="lazy" src={imageAccessories}
                                     alt="Phụ Kiện" title="Phụ Kiện" style={{display: "inline-block"}}/>
                                <div className="desc">
                                    <h2><a onClick={() => navigate('/product/13?page=1')} className="btn btn-glab">Phụ
                                        Kiện</a></h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BoxCardComponent