import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getListProductsByCatId} from "../../apis/products/ProductsApi";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import CardComponent from "../../components/card/CardComponent";
import LoadingComponent from "../../components/loading/LoadingComponent";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";

const ListProduct = () => {
  const [filterButton, setFilterButton] = useState(false);
  const [dropdownButton, setDropdownButton] = useState(false);
  const {product} = useParams();
  const [loading,setLoading]=useState(false)
  const [itemInCategory, setItemInCategory] = useState([]);
  const dispatch=useDispatch();
  useEffect(() => {
    const getListProductByCatId2 = async () => {
      dispatch(turnOnLoading())
      await getListProductsByCatId(product)
        .then(res => {
          if (res.data.status === 'success') {
            console.log(res.data.data)
            setItemInCategory(res.data.data);
            setLoading(true)
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
        })
        .finally(()=>{
          dispatch(turnOffLoading())
        })
    }
    getListProductByCatId2()
  }, [product])
  useEffect(() => {
    if (filterButton === true) {
      document.body.classList.add("filterActive")
    } else {
      document.body.classList.remove("filterActive")
    }
  }, [filterButton])

  if(loading===false){
    return <LoadingComponent/>
  }
  return (
    <div className="container" style={{marginTop: "50px"}}>
      <div className="text-center">
        <div className="typeProducts">
          <div className="row" style={{width: "100%"}}>
            {itemInCategory[0]?.CatName===null?
              <div className="col-xs-12"><h2 style={{textAlign: "center"}}>Nothing</h2></div>
              :
              <div className="col-xs-12"><h2 style={{textAlign: "center"}}>{itemInCategory[0]?.CatName}</h2></div>
            }

            <div className="col-xs-9">
              <div className="bootstrap-tagsinput">
              </div>
            </div>
            <div className="col-xs-3">
              <div className="typeFilter text-left">
                <a className="filterToggle" onClick={() => setFilterButton(true)}><span
                  className="icon-settings"></span>Filter</a>
              </div>
            </div>
          </div>

        </div>

        <div className="menuFilter">
          <a className="filterClose" onClick={() => setFilterButton(false)}><span
            className="icon-meunu-close"></span></a>
          <div className="filterIcon"><span className="icon-settings"></span>Filter</div>
          <div className="filterItems">
            <div className={dropdownButton === true ? "dropdown open" : "dropdown"}
                 onClick={() => setDropdownButton(!dropdownButton)}>
              <div className="btn btn-default btn-xs dropdown-toggle" type="button" id="sortUsers"
                   data-toggle="dropdown">
                Sort &nbsp;&nbsp;
                <span className="caret"></span>
              </div>
              <ul className="dropdown-menu" role="menu" aria-labelledby="sortUsers">
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=c.price_asc">Price: lowest
                  first <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></a></li>
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=c.price_desc">Price:
                  highest first <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></a></li>
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=a.created_at_desc">New to
                  Old <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></a></li>
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=a.created_at_asc">Old to
                  New <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></a></li>
              </ul>
            </div>
            <div className="filterItem">
              <a href="">Brand <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                <li><a href="https://www.glab.vn/product/footwear?brand=adidas">adidas</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=air-jordan">Air Jordan</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=anti-social-social-club">Anti Social Social
                  Club</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=asics">Asics</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=bape">Bape</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=bearbrick">Bearbrick</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=billionaire-boys-club">Billionaire Boys Club</a>
                </li>
                <li><a href="https://www.glab.vn/product/footwear?brand=casio">CASIO</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=champion">Champion</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=chrome-hearts">Chrome Hearts</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=comme-des-garcons">Comme Des Garcons </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=conic">CONIC</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=converse">Converse</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=crep-protect">Crep Protect</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=drew-house">Drew House</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=fear-of-god">Fear Of God </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=front">FRONT</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=glab">GLAB</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=grateful-dead">Grateful Dead</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=huf">HUF</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=jason-mark">Jason Mark</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=loop-brand">Loop Brand</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=mlb">MLB</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=new-balance">New Balance</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=nike">Nike</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=off-white">Off-White </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=others">OTHERS</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=palace">Palace</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=puma">Puma</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=reebok">Reebok</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=reshoevn8r">Reshoevn8r</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=ripndip">RIPNDIP</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=shoex">ShoeX</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=stussy">Stussy</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=supreme">Supreme</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=the-collectors">The Collectors </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=undefeated">Undefeated</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=under-armour">Under Armour</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=uniqlo">Uniqlo </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=vans">Vans</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=vintage">Vintage</a></li>
              </ul>
            </div>
            <div className="filterItem">
              <a href="">Subcategory <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=newest-sneakers">Newest Sneakers</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=lifestyle">Lifestyle</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=running">Running</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=basketball">Basketball</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=gym-training">Gym &amp; Training</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=sandal">Sandal</a></li>
              </ul>
            </div>
            <div className="filterItem">
              <a href="">Sizes <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                <li><a href="https://www.glab.vn/product/footwear?size=149">6C</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=122">9CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=130">2Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=134">1.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=135">18.5 CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=150">5.5K</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=152">37</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=153">21CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=154">20CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=157">13 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=158">15 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=141">1Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=139">1 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=124">3 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=123">3.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=1">4 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=2">4.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=3">5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=4">5.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=5">6 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=6">6.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=7">7 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=8">7.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=9">8 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=10">8.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=11">9 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=12">9.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=13">10 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=128">13cm</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=14">10.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=15">11 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=16">11.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=17">12 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=18">12.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=60">13 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=113">13.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=101">14 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=27">3.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=28">4W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=29">4.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=30">5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=31">5.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=32">6W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=33">6.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=34">7W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=35">7.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=36">8W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=37">8.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=38">9W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=39">9.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=40">10W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=41">10.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=42">11W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=43">11.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=118">12.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=117">13.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=79">12W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=114">14W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=115">13W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=104">3Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=44">3.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=45">4Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=46">4.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=47">5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=48">5.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=49">6Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=50">6.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=51">7Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=94">32</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=110">35.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=95">33.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=100">36</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=109">37</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=102">34</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=108">36.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=76">38</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=75">39</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=52">40</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=78">41.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=53">41</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=54">42</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=55">43</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=58">44</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=112">29.5CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=111">37.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=87">12cm</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=106">17CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=105">18CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=88">14cm</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=89">16cm</a></li>
              </ul>
            </div>
            <div className="filterItem">
              <a href="">Price <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix" style={{padding: "0 0 20px 50px"}}>
                <li style={{width: "90%"}}>
                  <p>
                    <input type="text" id="amount" readOnly=""
                           style={{border: "0", color: "#f6931f", fontWeight: "bold", width: "100%"}}/>
                  </p>
                  <div id="slider-range"
                       className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                    <div className="ui-slider-range ui-corner-all ui-widget-header"
                         style={{left: "3.0303%", width: "16.1616%"}}></div>
                    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"
                          style={{left: "3.0303%"}}></span><span tabIndex="0"
                                                                 className="ui-slider-handle ui-corner-all ui-state-default"
                                                                 style={{left: "19.1919%"}}></span></div>
                </li>
              </ul>
            </div>
          </div>
        </div>


      </div>
      <div className="row products">
        {itemInCategory.map(index => (
          <div className="col-lg-4 col-md-6">
            <CardComponent name={index.ProName}
                           img={index.ImageMain}
                           priceDiscount={index.Price} priceNonDiscount={index.Discount === 0 ? null : index.Discount}/>
          </div>
        ))}
      </div>
      {itemInCategory.length > 9 ?
        <div className="text-center" onClick={() => navigate(`/product/${index.category.CatName}`)}>
          <a className="btn-see-more text-uper">see more</a>
        </div>
        : ""
      }

    </div>
  )
}

export default ListProduct