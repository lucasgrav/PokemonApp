import { useState } from "react";
import { useSelector } from "react-redux";

const usePagination = () => {
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
  const pageUlt = ()=>{
    //Voy a la ultima pagina
    setNext(12 * totalPages)
    setPrev((12 * totalPages) - 12)
    setPage(totalPages)
  }

  return {
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
    allPokemons
  };
};
export default usePagination;
