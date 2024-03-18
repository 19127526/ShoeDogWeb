import {Carousel} from "react-responsive-carousel";
import "./SlideComponent.css"
import banner from "../../assets/img/banner/banner.jpg"
import banner2 from "../../assets/img/banner/banner(2).jpg"



const SlideComponent = () => {
  /*<div className="carousel-image">
          <img src={"https://bizweb.dktcdn.net/100/347/923/themes/742041/assets/slider_1.png?1647915056330"}/>
        </div>
        <div className="carousel-image">
          <img src={"https://shoedog.vn/wp-content/uploads/2021/06/150895135_2927326524259560_116442797262429480_n-2048x778.jpg"}/>
        </div>

        <div className="carousel-image">
          <img src={"https://bizweb.dktcdn.net/100/347/923/themes/742041/assets/slider_3.png?1647915056330  "}/>
        </div>*/
  return (
    <div className="main-slide">
        <Carousel showIndicators={false}  useKeyboardArrows showThumbs={false}
                  showArrows={true}  width="100%" centerMode={false} autoPlay={true} infiniteLoop={true} autoFocus={true} interval={2000} showStatus={false}
        >
            <div className="carousel-image">
                <img src={banner}/>
            </div>
            <div className="carousel-image">
                <img src={banner2}/>
            </div>

        </Carousel>
    </div>
  )
}

export default SlideComponent