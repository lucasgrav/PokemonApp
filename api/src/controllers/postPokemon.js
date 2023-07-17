const { Pokemon } = require("../db");
const axios = require('axios')
const postPokemon = async (req, res) => {
  try {
    const { name, life, attack, defense, speed, height, weight, types, imageUrl } = req.body;
    
    const existingPokemon = await Pokemon.findOne({ where: { name: name.toLowerCase() } });
    const allPokemonesApi = await axios.get("http://localhost:3001/pokemons");
    const isAlreadyInExistingPokemons = allPokemonesApi.data.some(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    
    if (existingPokemon || isAlreadyInExistingPokemons) {
      return res.status(409).json({ error: "Pokemon already exists" });
    }

    const newPokemon = await Pokemon.create({
      name: name.toLowerCase(),
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      imageUrl,
    });

    newPokemon.addTypes(types);

    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPokemon;
