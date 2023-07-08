import { useState } from "react";
import axios from "axios";
const useRangeChange = () => {
  const [name, setName] = useState('')
  const [rangeLife, setRangeLife] = useState(50);
  const [rangeAttack, setRangeAttack] = useState(50);
  const [rangeDefense, setRangeDefense] = useState(50);
  const [rangeSpeed, setRangeSpeed] = useState(50);
  const [rangeHeight, setRangeHeight] = useState(50);
  const [rangeWeight, setRangeWeight] = useState(50);
  const [checkedInput, setCheckedInput] = useState(0);
  const [error, setError] = useState({
    name:'',
   types:''
  })
  const [pokemonCreated, setPokemonCreated]= useState({
    name:'',
    life: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    height: 50,
    weight: 50,
    image: null,
    types: [],
  })

const handleError =(event)=>{
if(event.target.name === "name"){
if(!/^.{4,}$/.test(event.target.value))  setError({...error, name: "❌ Minimum 4 characters"}); // VERIFICA QUE SEA MAYOR A 4 CARACTERES
if(/^.{4,12}$/.test(event.target.value)) setError({...error, name: "✅"}); // SI VA TODO BIEN
if(!/^.{0,12}$/.test(event.target.value)) setError({...error, name: "❌ Maximum 12 characters"}); // CUANDO SUPERA EL MAXIMO DE 12 CARACTERES
if(!/^[^0-9]*$/.test(event.target.value))   setError({...error, name: "❌ Must not contain numbers"}); // QUE NO CONTENGA NUMEROS 
if(/^$/.test(event.target.value)) setError({...error, name: "Write the name of the pokemon"}); // PARA QUE ESCRIBA EN EL INPUT
}

  }

  const handleImage = (event) => {
    const file = event.target.files[0];
  

  };
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
  const handleChecked = (event) => {
    const { checked, id } = event.target; // AGARRO EL ID Y SI ESTA CHECKED
    const checkedCount = checked ? checkedInput + 1 : checkedInput - 1; 
    if (checkedCount === 0 ) {
      setError({ ...error, types: '❌ Minimun 1 type' });
    }else if (checkedCount > 3 ) {
      setError({ ...error, types: '❌ Max 3 types' });
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
    }
  };
  const handleSubmit = async (event) => {
    let preventSubmit = true;
    try {
      const confirmed = window.confirm('Are you sure of create the pokemon?');
      if (confirmed) {
        preventSubmit = false;
        await axios.post('http://localhost:3001/pokemons/post', pokemonCreated);
        window.alert('¡Pokemon created successfully!');
      } else {
        window.alert("Ok, don't forget to create your pokemon");
      }
    } catch (error) {
      console.error(error.message);
      window.alert('Error in the creation of the pokemon (Server)');
    }
  
    if (preventSubmit) {
      event.preventDefault();
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
