import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logoPokemon from "./assets/image/logo-pokemon.webp";
import { CgPokemon } from "react-icons/cg";
import { BiHomeAlt2} from "react-icons/bi"
const NavBar = () => {
  
  return (
    <div className={style.containerNavBar}>
      <div className={style.containerAllLinks}>
      <Link to="/home">
      <div className={style.logoPokemon}>
        <img src={logoPokemon} />
      </div>
      </Link>
      <div className={style.containerLinks}>
      <Link to="/home">
        <div className={style.linkNav}>
            <h2><BiHomeAlt2/></h2>
            <h2>Home</h2>
        </div>
        </Link>
      <Link to="/pokemonCreator">
        <div className={style.linkNav}>
          <h2><CgPokemon /></h2>
          <h2>Create Pokemon</h2>
        </div>
      </Link>
      </div>
      </div>
    </div>
  );
};

export default NavBar;
