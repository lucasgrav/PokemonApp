import axios from "axios";
import { filterDeleted } from "../../../Redux/actions";
import Swal from "sweetalert2";

export const handleDelete = async (id, dispatch) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure to remove this pokemon?",
      text: "This action can not be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      dispatch(filterDeleted(id));
      const { data } = await axios.delete(
        `https://pokemon-api-henry.onrender.com/pokemons/deletePokemon/${id}`
      );
      console.log(data);

      Swal.fire(
        "Pokemon has been deleted",
        "The pokemon has been removed successfully",
        "success"
      );
    }
  } catch (error) {
    console.error(error);
  }
};