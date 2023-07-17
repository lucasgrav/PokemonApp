import style from "./PageNotFound.module.css";
import pokemonLoader from "./assets/image/pokemonLoader.gif";

const PageNotFound = () => {
  return (
    <div className={style.containerNotFound}>
      <div className={style.containerTitleNotFound}>
        <img src={pokemonLoader} alt="Pokemon Loader" />
        <h1>PAGE NOT FOUND!</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
