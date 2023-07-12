import { useState } from "react";
import axios from "axios";
const useRangeChange = () => {
  const [name, setName] = useState('')
  const [imagePokemon, setImagePokemon] = useState('')
  const [rangeLife, setRangeLife] = useState(50);
  const [rangeAttack, setRangeAttack] = useState(50);
  const [rangeDefense, setRangeDefense] = useState(50);
  const [rangeSpeed, setRangeSpeed] = useState(50);
  const [rangeHeight, setRangeHeight] = useState(50);
  const [rangeWeight, setRangeWeight] = useState(50);
  const [checkedInput, setCheckedInput] = useState(0);


  const [error, setError] = useState({
    name:'Write the name of the pokemon',
   types:'Select types of the pokemon',
   image: 'Post a URL image'
  })

  const [pokemonCreated, setPokemonCreated]= useState({
    name:'',
    life: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    height: 50,
    weight: 50,
    imageUrl: '',
    types: [],
  })

const handleError =(event)=>{
if(event.target.name === "name"){
if(!/^.{4,}$/.test(event.target.value))  setError({...error, name: "X Minimum 4 characters"}); // VERIFICA QUE SEA MAYOR A 4 CARACTERES
if(/^.{4,12}$/.test(event.target.value)) setError({...error, name: "✅"}); // SI VA TODO BIEN
if(!/^.{0,12}$/.test(event.target.value)) setError({...error, name: "X Maximum 12 characters"}); // CUANDO SUPERA EL MAXIMO DE 12 CARACTERES
if(!/^[A-Za-z]+$/.test(event.target.value)) setError({...error, name: "X Only letters (no special characters or numbers)"});
if(/^$/.test(event.target.value)) setError({...error, name: "X Write the name of the pokemon"}); // PARA QUE ESCRIBA EN EL INPUT
}else if(event.target.name === "image"){
 if(!/^(http|https):\/\/([^\s$.?#].[^\s]*)*[^.,?!:;\s]$/.test(event.target.value)) setError({...error, image: "X Invalid URL"})
 else setError({...error, image: "✅"})
}
}

const handleImage = (event)=>{
   setImagePokemon(event.target.value);
    setPokemonCreated({...pokemonCreated, imageUrl: event.target.value})
    handleError(event)
}
//CONTROLA EL INPUT NAME Y MANEJA LOS ERRORES Y VA SETEANDO EL NOMBRE AL POKEMON
  const handleName = (event) => {
    setName(event.target.value);
    setPokemonCreated({...pokemonCreated, name: event.target.value})
    handleError(event)}
//CONTROLA LIFE Y SETEA LIFE AL POKEMON
  const handleRangeLife = (event) => {
    setRangeLife(event.target.value);
    setPokemonCreated({...pokemonCreated, life: Number(event.target.value)})
  };
// ATAQUE
  const handleRangeAttack = (event) => {
    setRangeAttack(event.target.value);
    setPokemonCreated({...pokemonCreated, attack: Number(event.target.value)})
  };
  //DEFENSE
  const handleRangeDefense = (event) => {
    setRangeDefense(event.target.value);
    setPokemonCreated({...pokemonCreated, defense: Number(event.target.value)})
  };
  //SPEED
  const handleRangeSpeed = (event) => {
    setRangeSpeed(event.target.value);
    setPokemonCreated({...pokemonCreated, speed: Number(event.target.value)})
  };
  //HEIGHT
  const handleRangeHeight = (event) => {
    setRangeHeight(event.target.value);
    setPokemonCreated({...pokemonCreated, height: Number(event.target.value)})
  };
  //WEIGHT
  const handleRangeWeight = (event) => {
    setRangeWeight(event.target.value);
    setPokemonCreated({...pokemonCreated, weight: Number(event.target.value)})
  };
  // SETEA LOS TYPES AL POKEMON Y MANEJA LOS ERRORES 
  const [nameType, setNameType] = useState([])

  const handleChecked = (event) => {
    const { checked, id, name } = event.target; // AGARRO EL ID Y SI ESTA CHECKED
    
    
    if(nameType.length !== 3){
      setNameType([...nameType,{name: name}])
    }
    const checkedCount = checked ? checkedInput + 1 : checkedInput - 1; 
    if (checkedCount === 0 ) {
      setError({ ...error, types: 'X Minimun 1 type' });
    }else if (checkedCount > 3 ) {
      setError({ ...error, types: 'X Max 3 types' });
    } else {
      setError({ ...error, types: "✅" });
    }
    if (checked) {
      setCheckedInput(checkedInput + 1);
      setPokemonCreated({ ...pokemonCreated, types: [...pokemonCreated.types, id] });
    } else {
      setCheckedInput(checkedInput - 1);
      setPokemonCreated({
        ...pokemonCreated,
        types: pokemonCreated.types.filter((type) => type !== id),
      });
      setNameType(nameType.filter(type => type.name !== name))
    }
  };

  const handleSubmit = async (event) => {
   
    try {
        setName('')
        setRangeLife(50)
        setRangeAttack(50)
        setRangeDefense(50)
        setRangeSpeed(50)
        setRangeHeight(50)
        setRangeWeight(50)
        setCheckedInput(0)
        setImagePokemon('')
        setError({
          name:'Write the name of the pokemon',
         types:'Select types of the pokemon'
        })
        setNameType([])
        await axios.post('http://localhost:3001/pokemons/post', pokemonCreated);
        window.alert('¡Pokemon created successfully!');
    } catch (error) {
      console.error(error.message);
      window.alert('Error in the creation of the pokemon (Server)');
    }
  
   
  };
  return {name,
    rangeLife,
    rangeAttack,
    rangeDefense,
    rangeSpeed,
    rangeHeight,
    rangeWeight,
    error,
    handleImage,
    imagePokemon,
   nameType,
   checkedInput,
    handleChecked,
    handleName,
    handleRangeLife,
    handleRangeAttack,
    handleRangeDefense,
    handleRangeSpeed,
    handleRangeHeight,
    handleRangeWeight,
    handleSubmit
  };
};

export default useRangeChange;
