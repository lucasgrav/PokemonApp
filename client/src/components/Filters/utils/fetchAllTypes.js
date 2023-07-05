import axios from "axios"
export const fetchAllTypes = async(setTypes)=>{
    try {
        const { data } = await axios('http://localhost:3001/pokemons/types')
        setTypes(data)
    } catch (error) {
         console.error(error)
    }
}