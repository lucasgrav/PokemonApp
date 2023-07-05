const { Pokemon, Type } = require("../db");

const getAllPokemonsCreated = async (req, res) => {
  try {
    const pokemonsCreated = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
            attributes: [],
        }
      }, 
    });
    res.status(200).json(pokemonsCreated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getAllPokemonsCreated;
