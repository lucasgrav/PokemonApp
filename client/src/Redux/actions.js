import {
  ALL_POKEMONS,
  FILTER_CREATION,
  FILTER_TYPES,
  ORDER_ID,
  ORDER_NAME,
  RESET,
  FILTER_DELETED,
  ALL_TYPES_FILTER,
  ALL_TYPES
} from "./action-type";
import axios from "axios";

export const getAllPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/pokemons");
      dispatch({ type: ALL_POKEMONS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllTypesFilter = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/pokemons/types"
      );
      dispatch({ type: ALL_TYPES_FILTER, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};
export const getAllTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/pokemons/types"
      );
      dispatch({ type: ALL_TYPES, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
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
  return { type: RESET };
};
export const filterCreation = (type) => {
  return { type: FILTER_CREATION, payload: type };
};
export const filterDeleted = (id) => {
  return { type: FILTER_DELETED, payload: id };
};
