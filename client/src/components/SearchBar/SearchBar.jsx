import {onSearch} from "./utils/onSearch"
import { useState } from "react";
import style from "./SearchBar.module.css"
import iconSearch from  "../../../assets/images/input-search-bg.png"
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
      setErrorSearch('')
      setPokemonsSearch([])
      setReturnSearch(false)
    }
    const quitError = ()=>{
      setName('')
      setErrorSearch('')
    }

    return(
        <div className={style.containerSearchBar}>
          <div className={style.containerInputSearch}>
          {returnSearch && <button className={style.btnBack}onClick={returnSearchClick}>←</button>}
        <input  type="search" onChange={handleChange} value={name.toLowerCase()} placeholder="Search Pokemon"/>
        <button className={style.btnSearch}onClick={() => onSearch(name, setPokemonsSearch, setErrorSearch,setLoader, setReturnSearch)}><img src={iconSearch}/></button>  
          </div>
         <div className={style.containerErrorLoading}>
         {loader && <p className={style.loadingSearch}>Searching...</p>} {/* Mostrar el mensaje de carga si el estado loader es verdadero */}
      {errorSearch && <div className={style.errorNotFound}><p  className={style.quitError}onClick={quitError}>X</p><p>{errorSearch}</p></div>}
         </div>
      
      </div>
    )
};

export default SearchBar