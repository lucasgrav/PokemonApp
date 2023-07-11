import Card from "../Card/Card";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPokemons } from "../../Redux/actions";
import style from "./CardsContainer.module.css";
import Filters from "../Filters/Filter";
import SearchBar from "../SearchBar/SearchBar";
import usePagination from "./customHook/usePagination";
import { Link } from "react-router-dom";
import loaderGif from "./assets/images/pikachuLoader.gif"
import loaderGifNotFound from "./assets/images/pokemonLoader.gif"

const CardsContainer = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    dispatch(getAllPokemons()).then(() => {
      setLoader(false);
    }); // CUANDO SE MONSTA EL COMPONENTE HAGO DISPATCH
  }, []);

  const {
    setPokemonsSearch,
    resetPageFilter,
    handleNext,
    handlePrev,
    pokemonsSliced,
    pokemonsSlicedSearch,
    pokemonsSearch,
    page,
    totalPages,
    pageSearched,
    totalPagesSearched,pageUlt
  } = usePagination();

  return (
    <div className={style.containerHome}>
      <div className={style.containerNavBarPokemons}>
        {/* INPUT DE BUSQUEDA */}
        <SearchBar setPokemonsSearch={setPokemonsSearch} />
        {/* FILTRADOS*/}
        <Filters resetPageFilter={resetPageFilter} />
      </div>

      {/* BUTTONS DEL PAGINADO */}
      {pokemonsSearch.length < 1 ? (
        <div className={style.buttonsPagesContainer}>
        <button onClick={resetPageFilter}>{"<"}</button>
          <button onClick={handlePrev}>{"<<"}</button>
           {(totalPages > 0) ? <h3>{page} ... {totalPages}</h3> : <h3>Pokemons not found</h3>}
          <button onClick={handleNext}>{">>"}</button>
          <button onClick={pageUlt}>{">"}</button>
        </div>
      ) : (
        <div className={style.buttonsPagesContainer}>
          <button onClick={handlePrev}>{"<<"}</button>
          <h3>
            {pageSearched} of {totalPagesSearched}
          </h3>
          <button onClick={handleNext}>{">>"}</button>
        </div>
      )}

      {/* CARDS RENDERIZANDO */}
      <div className={style.cardsContainer}>
        {loader ? (
          <img className={style.loaderGif}src={loaderGif}/>
        ) : pokemonsSearch.length < 1 ? (
          pokemonsSliced.length ? (
            pokemonsSliced.map(
              ({ image, name, id, types, attack, life, defense }) => (
                <Card
                  image={image}
                  name={name}
                  key={id}
                  types={types}
                  attack={attack}
                  id={id}
                  life={life}
                  defense={defense}
                />
              )
            )
          ) : (
            <div className={style.containerPokemonNotFound}>
              <img className={style.loaderGif}src={loaderGifNotFound}/>
              <h2>Pokemon not found with this charasteristic!</h2>
              <Link to="/pokemonCreator">
                <button>Create a pokemon!</button>
              </Link>
            </div>
          )
        ) : (
          pokemonsSlicedSearch.map(
            ({ image, name, id, types, attack, life, defense }) => (
              <Card
                image={image}
                name={name}
                key={id}
                types={types}
                attack={attack}
                life={life}
                defense={defense}
                id={id}
                pokemonsSearch={pokemonsSearch}
                setPokemonsSearch={setPokemonsSearch}
              />
            )
          )
        )}
      </div>

      {/* BUTTONS DEL PAGINADO */}
      {pokemonsSearch.length < 1 ? (
        <div className={style.buttonsPagesContainer}>
          <button onClick={resetPageFilter}>{"<"}</button>
          <button onClick={handlePrev}>{"<<"}</button>
          {(totalPages > 0) ? <h3>{page} ... {totalPages}</h3> : <h3>Pokemons not found</h3>}
          <button onClick={handleNext}>{">>"}</button>
          <button onClick={pageUlt}>{">"}</button>
        </div>
      ) : (
        <div className={style.buttonsPagesContainer}>
          <button onClick={handlePrev}>{"<<"}</button>
          <h3>
            {pageSearched} of {totalPagesSearched}
          </h3>
          <button onClick={handleNext}>{">>"}</button>
         
        </div>
      )}
    </div>
  );
};

export default CardsContainer;
