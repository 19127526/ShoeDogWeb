import image from "../../assets/img/62dfdb668b98a.jpg"
const CardComponent=()=>{
  return (
    <div className="product__item">
      <div className="product__item--pic">
        <a href="/detail">
          <div className="product__img">
            <img className="lazy" src={image}
                 alt="adidas Aadilette 22 Slides Clear Grey" title="adidas Adilette 22 Slides Clear Grey"
                 style={{display:"inline-block"}}
                />
          </div>
        </a>
        <div className="product__item--infor">
          <div className="text-center mgB-5 hide">
            <div className="size-item">
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=4 US"
                 className="size">4 US</a>
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=5 US"
                 className="size">5 US</a>
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=7 US"
                 className="size">7 US</a>
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=8 US"
                 className="size">8 US</a>
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=10 US"
                 className="size">10 US</a>
            </div>
            <p className="text-uper">available size</p>
          </div>

          <div className="clearfix">
            <p className="product-name text-uper "><a
              href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey">adidas Adilette 22
              Slides Clear Grey</a>
            </p>
            <p className="product-price">
              <span className="price-decoration">đ 2,400,000</span><br/>
              <span>đ 2,200,000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent