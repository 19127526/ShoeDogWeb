import gif from "../../assets/themes/icons/loading.gif"
import {Alert, Image, Spin} from 'antd';
import styles from "./Loading.module.css"
const LoadingComponent=()=>{
  return (<div
    className={styles.loader}>
      <img src={gif}  preview={{ visible: false }} style={{maxWidth:"150%"}}></img>
      <p>Gâu gâu...</p>
  </div>
  )
}

export default LoadingComponent