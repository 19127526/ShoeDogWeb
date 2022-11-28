import CardComponent from "../../components/card/CardComponent";


const HomePage = () => {

    const a = [];
    for (let i = 0; i < 10; i++) {
        a.push(CardComponent);
    }

    return (
      <div className="container">
          <h2 className="text-center title__type">Footwear</h2>
          <div className="row products">
              {a.map(u => (
                <div className="col-lg-4 col-md-6 ">
                    <CardComponent name={"New Balance 550 White Black"} img={"https://www.glab.vn/storage/products/2021/03/03/480x320/603f603c3cb03.jpg"} priceDiscount={"4,400,000"} priceNonDiscount={null}/>
                </div>
              ))}
          </div>
      </div>
    )
}

export default HomePage