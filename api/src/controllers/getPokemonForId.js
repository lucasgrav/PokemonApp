const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getPokemonForId = async (req, res) => {
  try {
    const { idPokemon } = req.params;
    let pokemon;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const isUUID = uuidRegex.test(idPokemon); //me fijo si es un id UUID como que tienen los pokemon creados
    
    try {
      const { data } = await axios(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}` // Peticion a la api de pokemon
      );
      if (data) {
        // Si data contiene al pokemon crea un objeto con las caracteristicas
        pokemon = {
          // se lo asigno a la variable creada al inicio
          id: data.id,
          name: data.name,
          imageUrl: data.sprites.other["official-artwork"].front_default,
          life: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type) => {
            return { name: type.type.name };
          }),
        };
      }
    } catch (error) {
      // Si no encuentra el pokemon, consologea el error
      console.log("Pokemon of API not found:", error.message);
    }

    if (!pokemon && isUUID) {
      //En caso de que no haya nada en la variable es que no se encontro el pokemon en la api y
      pokemon = await Pokemon.findOne({
        // procedo a buscarlo en mi base de datos
        where: {
          id: idPokemon,
        },
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
    }

    if (pokemon) {
      res.status(200).json(pokemon); // Devuelvo el pokemon ya sea de la api o de la base de datos
    } else {
      throw new Error("Pokemon not found"); // error que lanzo por si no se encontro pokemones
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getPokemonForId;
