import axios from "axios";
export const fetchAllPokemons = async (dispatch, getAllPokemons) => {
  try {
    const { data } = await axios.get("http://localhost:3001/pokemons");
    dispatch(getAllPokemons(data));
  } catch (error) {
    console.error(error)
  }
};
