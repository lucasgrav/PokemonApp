import Card from "../Card/Card";
import { useDispatch} from "react-redux";
import { useEffect} from "react";
import { getAllPokemons } from "../../Redux/actions";
import style from "./CardsContainer.module.css";
import Filters from "../Filters/Filter";
import SearchBar from "../SearchBar/SearchBar";
import usePaginated from "./CustomsHooks/usePaginated";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const {
    pokemonsSearch,
    pokemonsSliced,
    pokemonsSlicedSearch,
    handleNext,
    handlePrev,
    resetPageFilter,
    setPokemonsSearch,
    page,
    totalPages,
    pageSearched,
    totalPagesSearched,
  } = usePaginated(); // CUSTOM HOOK CON LA LOGICA DEL PAGINADO

  useEffect(() => {
    dispatch(getAllPokemons()); // CUANDO SE MONSTA EL COMPONENTE HAGO DISPATCH 
  }, []);

  return (
    <div className={style.containerHome}>
      <div className={style.containerNavBarPokemons}>
        {/* INPUT DE BUSQUEDA */}
        <SearchBar setPokemonsSearch={setPokemonsSearch} />

        {/* FILTRADOS*/}
        <Filters resetPageFilter={resetPageFilter} />

        {/* BUTTONS DEL PAGINADO */}
        {pokemonsSearch.length < 1 ? (
          <div>
            <button onClick={handlePrev}>Prev</button>
            <h3>
              {page} of {totalPages}
            </h3>
            <button onClick={handleNext}>Next</button>
          </div>
        ) : (
          <div>
            <button onClick={handlePrev}>Prev</button>
            <h3>
              {pageSearched} of {totalPagesSearched}
            </h3>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
      </div>

      {/* CARDS RENDERIZANDO */}
      <div className={style.cardsContainer}>
        {pokemonsSearch.length < 1
          ? pokemonsSliced.map(({ image, name, id, types, attack }) => (
              <Card
                image={image}
                name={name}
                key={id}
                types={types}
                attack={attack}
                id={id}
              />
            ))
          : pokemonsSlicedSearch.map(({ image, name, id, types, attack }) => (
              <Card
                image={image}
                name={name}
                key={id}
                types={types}
                attack={attack}
                id={id}
                pokemonsSearch={pokemonsSearch}
                setPokemonsSearch={setPokemonsSearch}
              />
            ))}
      </div>
    </div>
  );
};

export default CardsContainer;
