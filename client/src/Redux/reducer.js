import {
  ALL_POKEMONS,
  FILTER_CREATION,
  FILTER_TYPES,
  ORDER_ID,
  ORDER_NAME,
  RESET,
  FILTER_DELETED,
  ALL_TYPES_FILTER,
  ALL_TYPES
} from "./action-type";

const initialState = {
  allPokemons: [],
  allTypesFilter: [],
  pokemonsAux: [],
  pokemonsCreated: [],
  allTypes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //TRAIGO A TODOS LOS POKEMONS
    case ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemonsAux: action.payload,
      };
    //TRAIGO A TODOS LOS TYPES Y LOS FILTRO POR LOS QUE EXISTEN O TIENEN LOS POKEMON
    case ALL_TYPES_FILTER:
      let pokemonesmap = state.pokemonsAux
        .map((pok) => pok.types.map((type) => type.name))
        .flat();

      return {
        ...state,
        allTypesFilter: action.payload.filter((type) =>
          pokemonesmap.some((poktype) => poktype === type.name)
        ),
      };
      //TRAIGO A TODOS LOS TYPES
      case ALL_TYPES:
        return {
          ...state,
          allTypes: action.payload
        };
    //ORDENO POR ID
    case ORDER_ID:
      let orderAttack;
      if (action.payload === "MoreAttack") {
        orderAttack = [...state.allPokemons].sort((a, b) =>
          a.attack > b.attack ? 1 : -1
        );
      } else {
        orderAttack = [...state.allPokemons].sort((a, b) =>
          b.attack > a.attack ? 1 : -1
        );
      }
      return {
        ...state,
        allPokemons: orderAttack,
      };
    //ORDENO POR NAME
    case ORDER_NAME:
      let orderName;
      if (action.payload === "AlfabeticoAZ") {
        orderName = [...state.allPokemons].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else {
        orderName = [...state.allPokemons].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        allPokemons: orderName,
      };
    //FILTRO POR TIPOS
    case FILTER_TYPES:
      if (state.pokemonsCreated.length > 0) {
        return {
          ...state,
          allPokemons: [...state.pokemonsCreated].filter((pokemon) =>
            pokemon.types.some((type) => type.name === action.payload)
          ),
        };
      } else {
        return {
          ...state,
          allPokemons: [...state.pokemonsAux].filter((pokemon) =>
            pokemon.types.some((type) => type.name === action.payload)
          ),
        };
      }
    //FILTRO POR CREADO U ORIGINAL
    case FILTER_CREATION:
      let filtrado;
      if (action.payload === "Created") {
        filtrado = state.pokemonsAux.filter((pokemon) =>
          isNaN(Number(pokemon.id))
        );
      } else if (action.payload === "NoCreated") {
        filtrado = state.pokemonsAux.filter(
          (pokemon) => !isNaN(Number(pokemon.id))
        );
      } else {
        filtrado = state.pokemonsAux;
      }
      return {
        ...state,
        allPokemons: filtrado,
        pokemonsCreated: filtrado,
      };
    //FILTRO LOS ELIMINADOS
    case FILTER_DELETED:
      let filtradoDeletedDB = [...state.allPokemons].filter(
        (pokemon) => pokemon.id.toString() !== action.payload
      )
      let filtradoDeleted = [...state.pokemonsAux].filter(
        (pokemon) => pokemon.id.toString() !== action.payload
      )
      return {
        ...state,
        allPokemons:  filtradoDeletedDB,
        pokemonsAux: filtradoDeleted
      };
    //RESETEO LOS FILTROS
    case RESET:
      return {
        ...state,
        allPokemons: state.pokemonsAux, 
      };
    default:
      return { ...state };
  }
};

export default reducer;