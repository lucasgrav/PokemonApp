import {onSearch} from "./utils/onSearch"
import { useState } from "react";

const SearchBar = ({setPokemonsSearch})=>{

    const [name, setName] = useState("");
    const [errorSearch, setErrorSearch] = useState();

    const handleChange = (event) => {
      setName(event.target.value);
    };

    return(
        <div>
        <input type="search" onChange={handleChange} value={name.toLowerCase()} placeholder="Search Pokemon"/>
        <button onClick={() => onSearch(name, setPokemonsSearch, setErrorSearch)}>Search</button>   
      </div>
    )
};

export default SearchBar