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
                    <CardComponent/>
                </div>
              ))}
          </div>
      </div>
    )
}

export default HomePage