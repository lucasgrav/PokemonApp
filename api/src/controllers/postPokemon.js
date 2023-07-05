const { Pokemon } = require("../db");
const postPokemon = async (req, res) => {
  try {
    const { name, life, attack, defense, speed, height, weight, types } =
      req.body;
    const newPokemon = await Pokemon.create({
      name: name.toLowerCase(),
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    newPokemon.addTypes(types);
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = postPokemon;
