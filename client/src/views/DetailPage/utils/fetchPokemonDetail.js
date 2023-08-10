import axios from "axios";
export  const fetchPokemonDetail = async (id,setPokemonDetail) => {
    try {
      const { data } = await axios.get(
        `https://pokemon-api-henry.onrender.com/pokemons/id/${id}`
      );
      setPokemonDetail([data]);
    } catch (error) {
      console.error(error);
    }
  };