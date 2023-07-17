import style from "./FooterComponent.module.css";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import logoHenry from "./logoHenry.png";

const FooterComponent = () => {
  return (
    <footer className={style.containerFooter}>
      <div className={style.containerLinksFooter}>
        <a
          href="https://www.linkedin.com/in/lucasgastoncorrea/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillLinkedin size={40} />
        </a>
        <a
          href="https://github.com/lucasgrav/PokemonApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub size={40} />
        </a>
      </div>
      <div className={style.containerHenry}>
        <a
          href="https://www.soyhenry.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img src={logoHenry} alt="Logo de Henry" />
        </a>

        <h5>Individual project for Henry!</h5>
      </div>
    </footer>
  );
};

export default FooterComponent;
