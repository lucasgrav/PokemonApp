const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const getAllPokemons = require("../controllers/getAllPokemons");
const getPokemonForId = require("../controllers/getPokemonForId");
const postPokemon = require("../controllers/postPokemon");
const getPokemonForName = require("../controllers/getPokemonForName");
const getAllPokemonsCreated = require("../controllers/getAllPokemonsCreated");
const getTypesPokemons = require("../controllers/getTypesPokemons");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons/", getAllPokemons);
router.get("/pokemons/id/:idPokemon", getPokemonForId);
router.get("/pokemons/name/", getPokemonForName);
router.post("/pokemons/post/", postPokemon);
router.get("/pokemons/createdPokemons", getAllPokemonsCreated);
router.get("/pokemons/types", getTypesPokemons);

module.exports = router;
