const { Pokemon } = require('../db');
const postPokemon = async (req, res) => {
  try {
    const { name, life, attack, defense, speed, height, weight, type } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    res.status(200).json(newPokemon)
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = postPokemon;
