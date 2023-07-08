import { useDispatch, useSelector } from "react-redux";
import { getAllTypesFilter } from "../../Redux/actions";
import { useEffect,useState } from "react";
import style from "./Filter.module.css";
import {
  ordeForAttack,
  ordeForName,
  filterTypes,
  resetFilters,
  filterCreation,
} from '../../Redux/actions';

const Filters = ({resetPageFilter}) => {
  const dispatch = useDispatch(); // HOOK PARA DISPATCH DEL ESTADO GLOBAL

  const types = useSelector((state) => state.allTypesFilter); //TYPES DE POKEMONS GUARDADOSE EN REDUX
  useEffect(() => {
    if (!types.length) {
      dispatch(getAllTypesFilter());
    }
  }, [types]);
  
  const [sortValue, setSortValue] = useState("Original"); //ESTADO DEL SELECT DEL FILTRADO ALFABETICO
  const [typeValue, setTypeValue] = useState("Original"); //ESTADO DEL SELECT DE TYPE
  const [typeCreated, setTypeCreated] = useState("Original"); //ESTADO DEL SELECT DE TYPE
  const handleSort = (event) => {
      //ORDENA POR ATTACK O POR NAME
      if (
        event.target.value === "MoreAttack" ||
        event.target.value === "LessAttack"
      ) {
       
        setSortValue(event.target.value);
        dispatch(ordeForAttack(event.target.value));
      } else {
       
        setSortValue(event.target.value);
        dispatch(ordeForName(event.target.value));
      }
    };
  
    const handleTypes = (event) => {
      //FILTRA POR TIPOS DE POKEMON
      setSortValue("Original");
      setTypeValue("Original");
      resetPageFilter();
      setTypeValue(event.target.value);
      dispatch(filterTypes(event.target.value));
    };

    const handleReset = () => {
      // RESETEA LOS FILTROS
      dispatch(resetFilters());
      setSortValue("Original");
      setTypeValue("Original");
      setTypeCreated('Original')
    };

    const handleFilterCreation = (event) => {
      // FILTRA LOS CREADOS Y NO CREADOS
      handleReset();
      resetPageFilter();
      setTypeCreated(event.target.value)
      dispatch(filterCreation(event.target.value));
    };


  return (
    <div className={style.containerFilter}>
      {/* SELECT DE CREADOS Y NO CREADOS*/}
      <select onChange={handleFilterCreation} value={typeCreated}>
        <option value="Original" disabled>
          Created || No Created
        </option>
        <option value="All">All Pokemons</option>
        <option value="Created">Created</option>
        <option value="NoCreated">No Created</option>
      </select>
      {/* SELECT FOR TYPE */}
      <select onChange={handleTypes} value={typeValue}>
        <option value="Original" disabled>
          Ordernar por tipo
        </option>
        {types.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      {/* SELECT FOR A-Z */}
      <select onChange={handleSort} value={sortValue}>
        <option value="Original" disabled>
        Alphabetically || Attack
        </option>
        <option value="AlfabeticoAZ">A - Z</option>
        <option value="AlfabeticoZA">Z - A</option>
        <option value="MoreAttack">- Attack | + Attack</option>
        <option value="LessAttack">+ Attack | - Attack</option>
      </select>
      {/* BUTTON RESET FILTERS */}
      <button onClick={handleReset}>Reset Filters</button>
    </div>
  );
};
export default Filters;
