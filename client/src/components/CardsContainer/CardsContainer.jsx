import Card from "../Card/Card";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPokemons } from "../../Redux/actions";
import style from "./CardsContainer.module.css";
import Filters from "../Filters/Filter";
import SearchBar from "../SearchBar/SearchBar";
import usePagination from "./customHook/usePagination";
import { Link } from "react-router-dom";
import loaderGif from "./assets/images/pikachuLoader.gif";
import loaderGifNotFound from "./assets/images/pokemonLoader.gif";
import { useSelector } from "react-redux";
import imgAshAux from "./assets/images/ashPika.png";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const pokemonAux = useSelector((state) => state.pokemonsAux);

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
    totalPagesSearched,
    pageUlt,
  } = usePagination();

  useEffect(() => {
    dispatch(getAllPokemons()).then(() => {
      setLoader(false);
    });
  }, []);

  return (
    <div className={style.containerHome}>
      <div className={style.containerNavBarPokemons}>
        {/* INPUT DE BUSQUEDA */}
        <SearchBar setPokemonsSearch={setPokemonsSearch} />
        {/* FILTRADOS*/}
        {pokemonsSearch.length < 1 ? (
          <Filters resetPageFilter={resetPageFilter} />
        ) : (
          <div className={style.divAuxSearch}>
            <img src={imgAshAux} />
          </div>
        )}
      </div>

      {/* BUTTONS DEL PAGINADO */}
      {pokemonsSearch.length < 1 ? (
        <div className={style.buttonsPagesContainer}>
          <button onClick={resetPageFilter}>{"<"}</button>
          <button onClick={handlePrev}>{"<<"}</button>
          {totalPages > 0 ? (
            <h3>
              {page} ... {totalPages}
            </h3>
          ) : (
            <h3>Pokemons not found</h3>
          )}
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
          <img className={style.loaderGif} src={loaderGif} />
        ) : pokemonsSearch.length < 1 ? (
          pokemonsSliced.length ? (
            pokemonsSliced.map(
              ({ imageUrl, name, id, types, attack, life, defense }) => (
                <Card
                  imageUrl={imageUrl}
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
              <img className={style.loaderGif} src={loaderGifNotFound} />
              <h2>Pokemon not found with this charasteristic!</h2>
              <Link to="/pokemonCreator">
                <button>Create a pokemon!</button>
              </Link>
            </div>
          )
        ) : (
          pokemonsSlicedSearch.map(
            ({ imageUrl, name, id, types, attack, life, defense }) => (
              <Card
                imageUrl={imageUrl}
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
          {totalPages > 0 ? (
            <h3>
              {page} ... {totalPages}
            </h3>
          ) : (
            <h3>Pokemons not found</h3>
          )}
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
