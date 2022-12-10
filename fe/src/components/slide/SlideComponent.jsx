import {Carousel} from "react-responsive-carousel";
import image from "../../assets/img/62dfdb668b98a.jpg";
import "./SlideComponent.css"



const SlideComponent = () => {

  return (
    <div className="main-slide" >
      <Carousel showArrows={true} showIndicators={false} infiniteLoop useKeyboardArrows autoPlay showThumbs={false}
                autoFocus={true} emulateTouch={true} width="100%"

      >
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
          <img src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/315554054_3425105337815007_5859392592209140138_n.jpg?stp=dst-jpg_s526x296&_nc_cat=103&ccb=1-7&_nc_sid=dd9801&_nc_ohc=obpT6GRijnAAX-O99pM&_nc_ht=scontent.fsgn8-4.fna&edm=ADwHzz8EAAAA&oh=00_AfC_hnUERM--ddJbWKqwnz19kOYc2Au-HefXhArje3i3Ew&oe=63993686"/>
        </div>
        <div className="carousel-image">
          <img src={"https://bizweb.dktcdn.net/100/347/923/themes/742041/assets/slider_3.png?1647915056330  "}/>
        </div>
      </Carousel>
    </div>
 )
}

export default SlideComponent