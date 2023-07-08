import axios from "axios";
export async function onSearch(
  name,
  setPokemonSearch,
  setErrorSearch,
  setLoader,
  setReturnSearch
) {
  try {
    if (name.length > 0) {
      setLoader(true);
      setErrorSearch(``);
      const response = await axios(
        `http://localhost:3001/pokemons/name/?name=${name.toLowerCase()}`
      );
      if (response) {
        setLoader(false);
        setReturnSearch(true)
      }
      setPokemonSearch(response.data);
    }
    if (name.length === 0) {
      setPokemonSearch([]);
    }
    setErrorSearch();
  } catch (error) {
    setLoader(false);
    setErrorSearch(`Pokemon not found`);
    console.error(error.message);
  }
}
