import axios from "axios";
export async function onSearch(name, setPokemonSearch, setErrorSearch) {
    try {
      if (name.length > 0) {
        const response = await axios(
          `http://localhost:3001/pokemons/name/?name=${name.toLowerCase()}`
        );
        setPokemonSearch(response.data);

      }
      if (name.length === 0) {
        setPokemonSearch([]);
      }
      
      setErrorSearch()
    } catch (error) {
      setPokemonSearch([]);
      setErrorSearch(`Pokemon ${error.response.statusText}`);
    }
  };
  
  