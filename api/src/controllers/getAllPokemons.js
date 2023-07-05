const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getAllPokemons = async (req, res) => {
  try {
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon?limit=50`); //la ruta de la api me muestra solamente el nombre y una url
    let pokemon = [];
    for (const obj of data.results) {
      // recorro todas las url
      const { data } = await axios(obj.url); // las llamo
      pokemon = [
        // concateno y creo el objeto de cada pokemon con sus caracteristicas de dicha url
        ...pokemon,
        {
          id: data.id,
          name: data.name,
          image: data.sprites.other.home.front_default,
          life: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type) => {
            return { name: type.type.name };
          }),
        },
      ];
    }
    const pokemonsCreated = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).json([...pokemonsCreated, ...pokemon]); // devuelvo el array con todos los pokemones
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getAllPokemons;
