import { useDispatch, useSelector } from "react-redux";
import { ordeForId, ordeForName, filterTypes, resetFilters, filterCreation, getAllTypes } from "../../Redux/actions";
import { useEffect, useState } from "react";
import style from "./Filter.module.css"

const Filters = ({resetPageFilter}) => {
  const dispatch = useDispatch(); // HOOK PARA DISPATCH DEL ESTADO GLOBAL
  const types = useSelector(state => state.allTypes)
  const [sortValue, setSortValue] = useState("Original"); //ESTADO DEL SELECT DEL FILTRADO ALFABETICO
  const [attackValue, setAttackValue] = useState("Original");//ESTADO DEL SELECT DEL FILTRADO ATTACK
  const [typeValue, setTypeValue] = useState("Original"); //ESTADO DEL SELECT DE TYPE
  const [creationValue, setCreationValue] = useState("Original"); // ESTADO DEL SELECT DE CREATED | API
  

  useEffect(() => {
  dispatch(getAllTypes());
  }, [types]);


  const handleSort = (event) => { //ORDENA POR ATTACK O POR NAME
    if (
      event.target.value === "MoreAttack" ||
      event.target.value === "LessAttack"
    ) {
      setSortValue("Original");
      setAttackValue(event.target.value) 
      dispatch(ordeForId(event.target.value));
      
    } else {
      setAttackValue("Original");
     setSortValue(event.target.value)
      dispatch(ordeForName(event.target.value));
    }
  };

  const handleTypes = (event) => { //FILTRA POR TIPOS DE POKEMON
    setSortValue("Original");
    setAttackValue("Original");
    setTypeValue("Original");
    resetPageFilter()
   setTypeValue(event.target.value)
   dispatch(filterTypes(event.target.value))
  };
  const handleReset = () => { // RESETEA LOS FILTROS
    dispatch(resetFilters())
    setSortValue("Original");
    setAttackValue("Original");
    setTypeValue("Original");
    setCreationValue("Original");
   };
   const handleFilterCreation = (event) => { // FILTRA LOS CREADOS Y NO CREADOS
   handleReset()
    resetPageFilter()
    setCreationValue(event.target.value)
    dispatch(filterCreation(event.target.value))
    
   };
 
  return (
    <div className={style.containerFilter}>
        <button onClick={handleReset}>Reset Filters</button>
        <select onChange={handleFilterCreation} value={creationValue}>
      <option value="Original" disabled>All | Created | API</option>
      <option value="All">All</option>
        <option value="NoCreated">API</option>
        <option value="Created">Created</option>
      </select>
      <select onChange={handleTypes} value={typeValue}>
      <option value="Original" disabled>Ordernar por tipo</option>
        {types.map((type) => (
          <option key={type.id}value={type.name}>{type.name}</option>
        ))}
      </select>
      <select onChange={handleSort} value={sortValue}>
      <option value="Original" disabled>Ordernar alfabeticamente</option>
        <option value="AlfabeticoAZ">A - Z</option>
        <option value="AlfabeticoZA">Z - A</option>
      </select>
      <select onChange={handleSort} value={attackValue}>
      <option value="Original" disabled>Ordernar por ataque</option>
        <option value="MoreAttack">- Attack | + Attack</option>
        <option value="LessAttack">+ Attack | - Attack</option>
      </select>
     
      
    </div>
  );
};
export default Filters;
