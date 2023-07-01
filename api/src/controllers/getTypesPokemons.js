const axios = require("axios");
const { Type } = require("../db");

const getTypesPokemons = async (req, res) => {
  try {
    const typesInDataBase = await Type.findAll(); // variable para verificar si hay en base de datos

    if (typesInDataBase.length === 0) { //aca verifico si hay fijandome el largo del array, SOLO ENTRA SI NO HAY NADA EN LA BASE DE DATOS
      const { data } = await axios("https://pokeapi.co/api/v2/type");
      const types = data.results.map((type) => ({ // por cada type creo un objeto con el name
        name: type.name,
      }));
      await Type.bulkCreate(types); // creo el array Types que saque del mapeo y lo pongo en base de datos
    }
    const allTypes = await Type.findAll(); // los traigo a todos los tipos de la BD

    res.status(200).json(allTypes); //lo envio al cliente
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getTypesPokemons;
