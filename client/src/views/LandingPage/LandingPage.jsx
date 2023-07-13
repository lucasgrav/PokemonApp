import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"
import imgPikachu from "./assets/images/pikachuLoader.gif"
const LandingPage = () => {
  return (
    <div className={style.containerLandingPage}>
      
      <div className={style.containerPikachu}>
      <img src={imgPikachu} alt="" />
      </div>
      <div className={style.containerButtonLanding}>
      <Link to="/home">
       <button className={style.buttonLandingPage}>Go to Pokedex</button>
      </Link>
      </div>
        
    </div>
  );
};

export default LandingPage;
