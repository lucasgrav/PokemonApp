import axios from "axios";
export  const fetchPokemonDetail = async (id,setPokemonDetail) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/pokemons/id/${id}`
      );
      setPokemonDetail([data]);
    } catch (error) {
      console.error(error);
    }
  };