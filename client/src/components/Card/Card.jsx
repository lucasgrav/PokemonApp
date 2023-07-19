import style from "./Card.module.css";
import defaultImage from "./assets/defaultImage.png";
import { Link } from "react-router-dom";
import { handleDelete } from "./utils/handleDelete";
import { useDispatch } from "react-redux";
import { filterSearchDeleted } from "./utils/filterPokemonSearchDeleted";

const Card = ({
  imageUrl,
  name,
  id,
  types,
  attack,
  life,
  defense,
  pokemonsSearch,
  setPokemonsSearch,
}) => {
  const dispatch = useDispatch();
  //Esta funcion me sirve para cuando quiera eliminar un pokemon creado cuando lo busco y cuando esta en home
  const functionsFiltersDeleted = () => {
    handleDelete(id, dispatch);
    filterSearchDeleted(pokemonsSearch, setPokemonsSearch, id);
  };
  
  return (
    <div key={id} className={style.cardPokemon}>
      {/* IMAGEN CARD */}
      <Link to={`/detail/${id}`}>
        <div className={style.containerImgPokemon}>
          {imageUrl ? (
            <img
              className={style.imageCardPokemon}
              src={imageUrl}
              alt={`Image of ${name}`}
            />
          ) : (
            <img className={style.imageCardPokemon} src={defaultImage} />
          )}
        </div>
      </Link>

      {/* DETAILS CARD*/}
      <div className={style.containerDetailCard}>
        <div className={style.containerCreatedDelete}>
          {isNaN(Number(id)) && (
            <button
              className={style.buttonDeletePokemon}
              onClick={functionsFiltersDeleted}
            >
              X
            </button>
          )}{" "}
          <h2 className={style.nameCardPokemon}>{name?.toUpperCase()}</h2>
        </div>
        <div className={style.typesDetailCard}>
          {isNaN(Number(id)) && <p className={style.parrafCreated}>Created</p>}
          {types?.map((type) => (
            <p className={style[type.name]}key={type.name}>
              {type.name.replace(/^\w/, (c) => c.toUpperCase())}
            </p>
          ))}
        </div>

        {/* DETAIL LIFE*/}
        <p className={style.detailCard}>Life {life}</p>
        <div className={style.rangeLife} style={{ width: `${life}px` }}></div>

        {/* DETAIL DEFENSE*/}
        <p className={style.detailCard}>Defense {defense}</p>
        <div
          className={style.rangeDefense}
          style={{ width: `${defense}px` }}
        ></div>

        {/* DETAILS ATTACK*/}
        <p className={style.detailCard}>Attack {attack}</p>
        <div
          className={style.rangeAttack}
          style={{ width: `${attack}px` }}
        ></div>
      </div>
    </div>
  );
};

export default Card;
