import { useDispatch, useSelector } from "react-redux";
import { getAllTypesFilter } from "../../Redux/actions";
import { useEffect, useState } from "react";
import style from "./Filter.module.css";
import useFilter from "./customHook/useFilter";

const Filters = ({ resetPageFilter }) => {
  const dispatch = useDispatch(); // HOOK PARA DISPATCH DEL ESTADO GLOBAL

  const types = useSelector((state) => state.allTypesFilter); //TYPES DE POKEMONS GUARDADOSE EN REDUX
  useEffect(() => {
    if (!types.length) {
      dispatch(getAllTypesFilter());
    }
  }, [types]);

  const {
    handleSort,
    handleTypes,
    handleReset,
    handleFilterCreation,
    sortValue,
    typeValue,
    typeCreated,
  } = useFilter();

  return (
    <div className={style.containerFilter}>
      {/* SELECT DE CREADOS Y NO CREADOS*/}
      <select onChange={()=> handleFilterCreation(event,resetPageFilter)} value={typeCreated}>
        <option value="Original" disabled>
          Created || No Created
        </option>
        <option value="All">All Pokemons</option>
        <option value="Created">Created</option>
        <option value="NoCreated">No Created</option>
      </select>
      {/* SELECT FOR TYPE */}
      <select onChange={()=> handleTypes(event,resetPageFilter)} value={typeValue}>
        <option value="Original" disabled>
          Types
        </option>
        {types.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name.replace(/^\w/, (c) => c.toUpperCase())}
          </option>
        ))}
      </select>
      {/* SELECT FOR A-Z */}
      <select onChange={handleSort} value={sortValue}>
        <option value="Original" disabled>
          A-Z || Attack - +
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
