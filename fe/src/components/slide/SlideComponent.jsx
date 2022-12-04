import {Carousel} from "react-responsive-carousel";
import image from "../../assets/img/62dfdb668b98a.jpg";
import "./SlideComponent.css"
const SlideComponent = () => {

  return (
    <div className="main-slide" >
      <Carousel showArrows={true} showIndicators={false} infiniteLoop useKeyboardArrows autoPlay showThumbs={false}
                autoFocus={true} emulateTouch={true} >
        <div className="carousel-image">
          <img src={"https://shoedog.vn/wp-content/uploads/2021/06/150895135_2927326524259560_116442797262429480_n-2048x778.jpg"}/>
        </div>
        <div className="carousel-image">
          <img src={"https://bizweb.dktcdn.net/100/347/923/themes/742041/assets/slider_1.png?1647915056330"}/>
        </div>
        <div className="carousel-image">
          <img src={"https://shoedog.vn/wp-content/uploads/2021/06/150895135_2927326524259560_116442797262429480_n-2048x778.jpg"}/>
        </div>

        <div className="carousel-image">
          <img src={"https://bizweb.dktcdn.net/100/347/923/themes/742041/assets/slider_3.png?1647915056330  "}/>
        </div>
      </Carousel>
    </div>
 )
}

export default SlideComponent