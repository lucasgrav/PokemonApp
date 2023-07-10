import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logoPokemon from "./assets/image/logo-pokemon.png";
import { useLocation } from "react-router-dom";
import { CgPokemon } from "react-icons/cg";
const NavBar = () => {
  const location = useLocation();
  return (
    <div className={style.containerNavBar}>
      <div className={style.logoPokemon}>
        <img src={logoPokemon} />
      </div>
      {!(location.pathname === "/home") && (
        <div className={style.linkNav}>
          <Link to="/home">
            <h2>HOME</h2>
          </Link>
        </div>
      )}
      <Link to="/pokemonCreator">
        <div className={style.linkNav}>
          <h2><CgPokemon /></h2>
          <h2>Create Pokemon</h2>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
