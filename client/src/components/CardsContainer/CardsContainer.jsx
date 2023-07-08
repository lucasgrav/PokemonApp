import Card from "../Card/Card";
import { useDispatch} from "react-redux";
import { useEffect, useState} from "react";
import { getAllPokemons } from "../../Redux/actions";
import style from "./CardsContainer.module.css";
import Filters from "../Filters/Filter";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    dispatch(getAllPokemons()).then(()=>{setLoader(false)}); // CUANDO SE MONSTA EL COMPONENTE HAGO DISPATCH 
  }, []);

   //ESTADOS Y VARIABLES DEL PAGINADO
   let allPokemons = useSelector(({ allPokemons }) => allPokemons); //Accedo al estado global de Redux y me lo traigo
   const totalPages = Math.ceil(allPokemons.length / 12); //Divido para saber cuantas pages serian en total | Debo mostrar 12 por pagina
   const [next, setNext] = useState(12); //Estado local para utilizar en el slice | PAGINADO
   const [prev, setPrev] = useState(0); //Estado local para utilizar en el slice | PAGINADO
   const [page, setPage] = useState(1); // Pagina actual en la que me encontraria | PAGINADO
   let pokemonsSliced = allPokemons.slice(prev, next); // Voy trayendo de a 12 pokemones del estado global
 
   //ESTADOS DE POKEMONS POR BUSQUEDA
   const [pokemonsSearch, setPokemonsSearch] = useState([]); // Estado local para guardar el personaje encontrado en la busqueda
   const totalPagesSearched = Math.ceil(pokemonsSearch.length / 12); // Me fijo cuantas pages hay en total en los buscados
   const [nextSearched, setNextSearched] = useState(12); //Estado local para utilizar en el slice | PAGINADO
   const [prevSearched, setPrevSearched] = useState(0); //Estado local para utilizar en el slice | PAGINADO
   const [pageSearched, setPageSearched] = useState(1); // Pagina actual en la que me encontraria | PAGINADO
   const pokemonsSlicedSearch = pokemonsSearch.slice(prevSearched, nextSearched); // Voy trayendo de a 12 pokemones de los que encuentro en la busqueda
 
   //FUNCIONES DEL PAGINADO
   const handleNext = () => {
     // Funcion para avanzar a la siguiente pag | PAGINADO
     if (pokemonsSearch.length > 0) {
       if (pageSearched < totalPagesSearched) {
         setNextSearched(nextSearched + 12);
         setPrevSearched(prevSearched + 12);
         setPageSearched(pageSearched + 1);
       }
     } else {
       if (page < totalPages) {
         setNext(next + 12);
         setPrev(prev + 12);
         setPage(page + 1);
       }
     }
   };
   
   const handlePrev = () => {
     // Funcion para retroceder a la pagina anterior | PAGINADO
     if (pokemonsSearch.length > 0) {
       if (prevSearched > 0) {
         setNextSearched(nextSearched - 12);
         setPrevSearched(prevSearched - 12);
         setPageSearched(pageSearched - 1);
       }
     } else {
       if (prev > 0) {
         setNext(next - 12);
         setPrev(prev - 12);
         setPage(page - 1);
       }
     }
   };
 
   const resetPageFilter = () => {
     //Cuando filtro por types o created vuelvo a la pagina 1
     setNext(12);
     setPrev(0);
     setPage(1);
   };


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
        {loader ? <h2>Loading</h2>:(pokemonsSearch.length < 1
          ?((pokemonsSliced.length) ? pokemonsSliced.map(({ image, name, id, types, attack }) => (
              <Card
                image={image}
                name={name}
                key={id}
                types={types}
                attack={attack}
                id={id}
              />
            )): <div><h2>Pokemon not found with this charasteristic!</h2><Link to="/pokemonCreator"><button>Create a pokemon!</button></Link></div>)
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
            )))}
      </div>
    </div>
  );
};

export default CardsContainer;
