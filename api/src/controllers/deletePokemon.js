const { Pokemon } = require("../db");
const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemonDeleted = await Pokemon.destroy({
      where: {
        id: id,
      },
    });
    if (pokemonDeleted > 0) {
      res.status(200).json({ Deleted: "Pokemon deleted" });
    } else {
      throw new Error("Pokemon not found");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = deletePokemon;
