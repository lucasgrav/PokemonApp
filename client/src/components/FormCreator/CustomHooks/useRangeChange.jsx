import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const useRangeChange = () => {
  //ESTADOS PARA CONTROLAR LOS INPUTS
  const [values, setValues] = useState({
    name: "",
    imagePokemon: "",
    rangeLife: 50,
    rangeAttack: 50,
    rangeDefense: 50,
    rangeSpeed: 50,
    rangeHeight: 50,
    rangeWeight: 50,
    typesButtons: 0,
    nameType: [],
  });

  //POKEMON QUE POSTEO
  const [pokemonCreated, setPokemonCreated] = useState({
    name: "",
    life: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    height: 50,
    weight: 50,
    imageUrl: "",
    types: [],
  });

  //ESTADOS PARA EL MANEJO DE ERRORES
  const [error, setError] = useState({
    name: "Write the name of the pokemon",
    types: "Select types of the pokemon",
    image: "Post a URL image",
  });

  //FUNCION PARA CONTROLAR LOS ERRORES Y ACTUALIZAR EL ESTADO
  const handleError = (event) => {
    //ERRORS INPUT NAME
    if (event.target.name === "name") {
      if (!/^.{4,}$/.test(event.target.value))
        setError({ ...error, name: "X Minimum 4 characters" }); // VERIFICA QUE SEA MAYOR A 4 CARACTERES
      if (/^.{4,12}$/.test(event.target.value))
        setError({ ...error, name: "✅" }); // SI VA TODO BIEN
      if (!/^.{0,12}$/.test(event.target.value))
        setError({ ...error, name: "X Maximum 12 characters" }); // CUANDO SUPERA EL MAXIMO DE 12 CARACTERES
      if (!/^[A-Za-z]+$/.test(event.target.value))
        setError({
          ...error,
          name: "X Only letters (no special characters or numbers)",
        });
      if (/^$/.test(event.target.value))
        setError({ ...error, name: "X Write the name of the pokemon" }); // PARA QUE ESCRIBA EN EL INPUT
    }

    //ERRORS INPUT IMAGE
    if (event.target.name === "image") {
      if (
        !/^(http|https):\/\/([^\s$.?#].[^\s]*)*[^.,?!:;\s]$/.test(
          event.target.value
        )
      )
        setError({ ...error, image: "X Invalid URL" });

      if (!/\.(jpeg|jpg|png|gif|bmp)$/i.test(event.target.value))
        setError({ ...error, image: "X Invalid URL (Of image please)" });
      else setError({ ...error, image: "✅" });
    }
  };

  //CONTROLA LOS INPUTS Y VERIFICA LOS ERRORES
  const handleChangesValues = (event) => {
    if (event.target.name === "name") {
      setValues({ ...values, name: event.target.value });
      setPokemonCreated({ ...pokemonCreated, name: event.target.value });
      handleError(event);
    }
    if (event.target.name === "image") {
      setValues({ ...values, imagePokemon: event.target.value });
      setPokemonCreated({ ...pokemonCreated, imageUrl: event.target.value });
      handleError(event);
    }

    if (event.target.name === "life") {
      setValues({ ...values, rangeLife: event.target.value });
      setPokemonCreated({ ...pokemonCreated, life: event.target.value });
    }

    if (event.target.name === "attack") {
      setValues({ ...values, rangeAttack: event.target.value });
      setPokemonCreated({ ...pokemonCreated, attack: event.target.value });
    }
    if (event.target.name === "defense") {
      setValues({ ...values, rangeDefense: event.target.value });
      setPokemonCreated({ ...pokemonCreated, defense: event.target.value });
    }
    if (event.target.name === "speed") {
      setValues({ ...values, rangeSpeed: event.target.value });
      setPokemonCreated({ ...pokemonCreated, speed: event.target.value });
    }
    if (event.target.name === "height") {
      setValues({ ...values, rangeHeight: event.target.value });
      setPokemonCreated({ ...pokemonCreated, height: event.target.value });
    }
    if (event.target.name === "weight") {
      setValues({ ...values, rangeWeight: event.target.value });
      setPokemonCreated({ ...pokemonCreated, weight: event.target.value });
    }
  };

  // FUNCION PARA CONTROLAR LOS BUTTONS TYPES E IR ACTUALIZANDO EL TYPE DEL POKEMON
  const handleClickButton = (event) => {
    event.preventDefault();
    const { id, value } = event.target; // Obtener el ID y el valor del botón

    const isTypeExist = values.nameType.some((type) => type.name === value);
    if (isTypeExist) {
      return; // Salgo de la función si el tipo ya existe en values.nameType
    }

    const checkedCount = event.target.checked
      ? values.typesButtons + 1
      : values.typesButtons - 1;

    if (checkedCount) {
      setError({ ...error, types: "✅" });
    }

    if (value) {
      if (values.nameType.length !== 3) {
        setValues({ ...values, typesButtons: values.typesButtons + 1 });
        setPokemonCreated({
          ...pokemonCreated,
          types: [...pokemonCreated.types, id],
        });

        setValues({
          ...values,
          nameType: [...values.nameType, { name: value }],
        });
      }
    }
  };

  //RESETEAR LOS BUTTONS
  const resetTypesButtons = (event) => {
    event.preventDefault();
    setError({ ...error, types: "Select types of the pokemon" });
    setValues({ ...values, nameType: [], typesButtons: 0 });
    setPokemonCreated({...pokemonCreated, types: []})
  };

  //RESETEAR TODOS LOS INPUTS
  const resetInputsValues = () => {
    setValues({
      name: "",
      imagePokemon: "",
      rangeLife: 50,
      rangeAttack: 50,
      rangeDefense: 50,
      rangeSpeed: 50,
      rangeHeight: 50,
      rangeWeight: 50,
      typesButtons: 0,
      nameType: [],
    });
    setError({
      name: "Write the name of the pokemon",
      types: "Select types of the pokemon",
      image: "Post a URL image",
    });
    setPokemonCreated({
      name: "",
      life: 50,
      attack: 50,
      defense: 50,
      speed: 50,
      height: 50,
      weight: 50,
      imageUrl: "",
      types: [],
    });
  };

  //SUBMIT PARA POSTEAR EL POKEMON
  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmed = await Swal.fire({
      title: "Are you sure you want to create the Pokemon?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.post("https://pokemon-api-henry.onrender.com/pokemons/post", pokemonCreated);
        Swal.fire({
          title: "Success!",
          text: "Pokemon created successfully!",
          icon: "success",
        });
        resetInputsValues();
      } catch (error) {
        console.error(error.response.data.error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.error,
          icon: "error",
        });
      }
    }
  };
  return {
    values,
    error,
    handleSubmit,
    handleChangesValues,
    handleClickButton,
    resetTypesButtons,
  };
};

export default useRangeChange;
