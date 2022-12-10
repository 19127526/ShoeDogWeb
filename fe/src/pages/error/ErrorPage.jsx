import "./ErrorPage.css"
import {useNavigate} from "react-router-dom";
const ErrorPage=()=>{
  const navigate=useNavigate()
  return(
      <section className="wrapper-error" style={{overflowY:"hidden"}}>

        <div className="container-error">

          <div id="scene" className="scene" data-hover-only="false">




            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <p className="p404" data-depth="0.50">404</p>
            <p className="p404" data-depth="0.10">404</p>

          </div>

          <div className="text">
            <article>
              <p>Uh oh! Looks like you got lost. <br/>Please go back to the homepage !!</p>
              <button className="button-error" onClick={()=>navigate("/")}>Go home</button>
            </article>
          </div>
        </div>
      </section>
  )
}

export default ErrorPage