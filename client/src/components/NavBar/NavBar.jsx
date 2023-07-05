import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className={style.containerNavBar}>
      <Link to="/home">HOME</Link>
      <Link to="/pokemonCreator">POKEMON CREATOR</Link>
    </div>
  );
};

export default NavBar
