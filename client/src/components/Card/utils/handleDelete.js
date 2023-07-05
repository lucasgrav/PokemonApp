import axios from "axios";
import { filterDeleted } from "../../../Redux/actions";
export const handleDelete = async (id,dispatch) => {
    try {
      dispatch(filterDeleted(id))
      const {data} = await axios.delete(
        `http://localhost:3001/pokemons/deletePokemon/${id}`
      );
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };