import { useDispatch, useSelector } from "react-redux";
import { getAllTypesFilter } from "../../Redux/actions";
import { useEffect } from "react";
import style from "./Filter.module.css";
import useSelectFilter from "./CustomHooks/useSelectFilter";

const Filters = () => {
  const dispatch = useDispatch(); // HOOK PARA DISPATCH DEL ESTADO GLOBAL

  const {
    handleSort,
    handleTypes,
    handleFilterCreation,
    sortValue,
    attackValue,
    typeValue,
    handleReset,
  } = useSelectFilter(); //CUSTOM HOOKS CON LA LOGICA PARA LOS SELECT Y LOS ESTADOS QUE CONTROLAN LO QUE RENDERIZA EL TEXTO DEL INPUT

  const types = useSelector((state) => state.allTypesFilter); //TYPES DE POKEMONS GUARDADOSE EN REDUX
  useEffect(() => {
    if (!types.length) {
      dispatch(getAllTypesFilter());
    }
  }, [types]);
  
  return (
    <div className={style.containerFilter}>
      {/* INPUTS RADIO */}
      <div>
        <input
          type="radio"
          id="all"
          name="filter"
          value="All"
          onChange={handleFilterCreation}
        />
        <label htmlFor="all">All</label>

        <input
          type="radio"
          id="created"
          name="filter"
          value="Created"
          onChange={handleFilterCreation}
        />
        <label htmlFor="created">Created</label>

        <input
          type="radio"
          id="api"
          name="filter"
          value="NoCreated"
          onChange={handleFilterCreation}
        />
        <label htmlFor="api">API</label>
      </div>
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
          Ordernar alfabeticamente
        </option>
        <option value="AlfabeticoAZ">A - Z</option>
        <option value="AlfabeticoZA">Z - A</option>
      </select>
      {/* SELECT FOR ATTACK */}
      <select onChange={handleSort} value={attackValue}>
        <option value="Original" disabled>
          Ordernar por ataque
        </option>
        <option value="MoreAttack">- Attack | + Attack</option>
        <option value="LessAttack">+ Attack | - Attack</option>
      </select>
      {/* BUTTON RESET FILTERS */}
      <button onClick={handleReset}>Reset Filters</button>
    </div>
  );
};
export default Filters;
