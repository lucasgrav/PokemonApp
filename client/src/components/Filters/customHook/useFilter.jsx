import {
    ordeForAttack,
    ordeForName,
    filterTypes,
    resetFilters,
    filterCreation,
  } from '../../../Redux/actions';
  import { useMemo, useState } from 'react';
  import { useDispatch } from 'react-redux';

const useFilter = ()=>{
    const dispatch = useDispatch()
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
    
      const handleTypes = (event,resetPageFilter) => {
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
  
      const handleFilterCreation = (event,resetPageFilter) => {
        // FILTRA LOS CREADOS Y NO CREADOS
        handleReset();
        resetPageFilter();
        setTypeCreated(event.target.value)
        dispatch(filterCreation(event.target.value));
      };
  
      return{handleSort, handleTypes, handleReset, handleFilterCreation,sortValue,typeValue,typeCreated}
}
export default useFilter