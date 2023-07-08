import {onSearch} from "./utils/onSearch"
import { useState } from "react";

const SearchBar = ({setPokemonsSearch})=>{

    const [name, setName] = useState("");
    const [loader, setLoader] = useState(false)
    const [returnSearch, setReturnSearch] = useState(false)
    const [errorSearch, setErrorSearch] = useState();

    const handleChange = (event) => {
      setName(event.target.value);
    };
    const returnSearchClick = ()=>{
      setName('')
      setPokemonsSearch([])
      setReturnSearch(false)
    }
    const quitError = ()=>{
      setName('')
      setErrorSearch('')
    }

    return(
        <div>
          {returnSearch && <button onClick={returnSearchClick}>Return</button>}
        <input type="search" onChange={handleChange} value={name.toLowerCase()} placeholder="Search Pokemon"/>
        <button onClick={() => onSearch(name, setPokemonsSearch, setErrorSearch,setLoader, setReturnSearch)}>Search</button>  
        {loader && <p>Loading...</p>} {/* Mostrar el mensaje de carga si el estado loader es verdadero */}
      {errorSearch && <div><button onClick={quitError}>X</button><p>{errorSearch}</p></div>}
      </div>
    )
};

export default SearchBar