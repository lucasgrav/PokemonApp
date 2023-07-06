import style from "./Card.module.css";
import defaultImage from "./assets/defaultImage.jpg";
import { Link } from "react-router-dom";
import { handleDelete } from "./utils/handleDelete";
import { useDispatch} from "react-redux";
import{ filterSearchDeleted } from "./utils/filterPokemonSearchDeleted";


const Card = ({ image, name, id, types, attack, pokemonsSearch, setPokemonsSearch }) => {
const dispatch = useDispatch()

//Esta funcion me sirve para cuando quiera eliminar un pokemon creado cuando lo busco y cuando esta en home
const functionsFiltersDeleted = ()=>{
  handleDelete(id,dispatch)
  filterSearchDeleted(pokemonsSearch,setPokemonsSearch,id) 
}
  return (
    <div key={id} className={style.cardPokemon}>
      {/* IMAGEN CARD */}
      <div>
      {isNaN(Number(id)) && <button onClick={functionsFiltersDeleted}>X</button>}
      {image ? (
        <img className={style.imageCardPokemon}src={image} alt={`Image of ${name}`} />
      ) : (
        <img className={style.imageCardPokemon} src={defaultImage} />
      )}

      </div>
      {/* DETAILS CARD*/}
      <div className={style.containerDetailCard}>
      <Link to={`/detail/${id}`}>
        <h3>{name}</h3>
      </Link>
      {isNaN(Number(id)) && <h4>Created</h4>}
      <h4>Attack: {attack}</h4>
      {types.map((type) => (
        <p key={type.name}>{type.name}</p>
      ))}
      </div>
    </div>
  );
};

export default Card;
