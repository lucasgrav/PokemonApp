import usePaginated from "../../CardsContainer/CustomsHooks/usePaginated"
import { useDispatch } from "react-redux";
import {
  ordeForId,
  ordeForName,
  filterTypes,
  resetFilters,
  filterCreation,
} from "../../../Redux/actions";
import { useState } from "react";

const useSelectFilter = ()=>{
    const dispatch = useDispatch(); // HOOK PARA DISPATCH DEL ESTADO GLOBAL
    const { resetPageFilter} = usePaginated()

    const [sortValue, setSortValue] = useState("Original"); //ESTADO DEL SELECT DEL FILTRADO ALFABETICO
    const [attackValue, setAttackValue] = useState("Original"); //ESTADO DEL SELECT DEL FILTRADO ATTACK
    const [typeValue, setTypeValue] = useState("Original"); //ESTADO DEL SELECT DE TYPE
  
    const handleSort = (event) => {
        //ORDENA POR ATTACK O POR NAME
        if (
          event.target.value === "MoreAttack" ||
          event.target.value === "LessAttack"
        ) {
          setSortValue("Original");
          setAttackValue(event.target.value);
          dispatch(ordeForId(event.target.value));
        } else {
          setAttackValue("Original");
          setSortValue(event.target.value);
          dispatch(ordeForName(event.target.value));
        }
      };
    
      const handleTypes = (event) => {
        //FILTRA POR TIPOS DE POKEMON
        setSortValue("Original");
        setAttackValue("Original");
        setTypeValue("Original");
        resetPageFilter();
        setTypeValue(event.target.value);
        dispatch(filterTypes(event.target.value));
      };

      const handleReset = () => {
        // RESETEA LOS FILTROS
        dispatch(resetFilters());
        setSortValue("Original");
        setAttackValue("Original");
        setTypeValue("Original");
      };
      const handleFilterCreation = (event) => {
        // FILTRA LOS CREADOS Y NO CREADOS
        handleReset();
        resetPageFilter();
        dispatch(filterCreation(event.target.value));
      };

return{handleSort, handleTypes, handleFilterCreation,sortValue,attackValue,typeValue,handleReset}
}

export default useSelectFilter;