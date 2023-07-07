import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"
const LandingPage = () => {
  return (
    <div className={style.containerLandingPage}>
      
      <Link to="/home">
       <button className={style.buttonLandingPage}>Go to Pokedex</button>
      </Link>
    </div>
  );
};

export default LandingPage;
