import { ALL_POKEMONS, FILTER_CREATION, FILTER_TYPES, ORDER_ID,ORDER_NAME, RESET, FILTER_DELETED,} from "./action-type";

export const getAllPokemons = (pokemons) => {
  return { type: ALL_POKEMONS, payload: pokemons };
};

export const filterTypes = (type) => {
    return { type: FILTER_TYPES, payload: type };
  };
  export const ordeForId = (order) => {
    return { type: ORDER_ID, payload: order };
  };
  export const ordeForName = (order) => {
    return { type: ORDER_NAME, payload: order };
  };
  export const resetFilters = () => {
    return { type: RESET};
  };
  export const filterCreation = (type) => {
    return { type: FILTER_CREATION, payload: type };
  };
  export const filterDeleted = (id) => {
    return { type: FILTER_DELETED, payload: id };
  };
