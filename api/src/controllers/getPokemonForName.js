const axios = require("axios");
const { Pokemon, Type } = require("../db");
const getPokemonForName = async (req, res) => {
  try {
    const { name } = req.query; //Name que me pasan por query
    //Variable auxiliar
    let pokemon;
    try {
      const { data } = await axios(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}` // Peticion a la api de pokemon
      );
      if (data) {
        // Si data contiene al pokemon crea un objeto con las caracteristicas
        pokemon = [{
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
        }];
      }
    } catch (error) {
      // Si no encuentra el pokemon, consologea el error
      console.log("Pokemon of API not found:", error.message);
    }

   if(!pokemon){
    pokemon = await Pokemon.findAll({
      where: {
        name: name,
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

    if (pokemon.length > 0) {
      res.status(200).json(pokemon);
    } else {
      throw new Error("Pokemons not found");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getPokemonForName;
