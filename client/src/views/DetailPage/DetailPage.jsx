import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetail } from "./utils/fetchPokemonDetail";

const DetailPage = () => {
  const { id } = useParams(); // Recibo el id por params, id que se encuentra en la card que contiene un link hacia este path
  const [pokemonDetail, setPokemonDetail] = useState(); // Estado para guardar dicho pokemon

  useEffect(() => { //cuando se monta el componente llamo a la api para traerme el pokemon y sus detalles y guardarlo en el estado local
    fetchPokemonDetail(id, setPokemonDetail);
  }, []);

  return (
    <div>
      {pokemonDetail?.map(
        ({
          name,
          image,
          life,
          attack,
          defense,
          speed,
          height,
          weight,
          types,
        }) => (
          <div>
            <img src={image} alt={`Image of ${name}`} />
            <h2>{name}</h2>
            <h3>HP: {life}</h3>
            <h3>Attack: {attack}</h3>
            <h3>Defense: {defense}</h3>
            <h3>Speed: {speed}</h3>
            <h3>Height: {height}</h3>
            <h3>Weigth: {weight}</h3>
            <h3>
              Types:{" "}
              {types.map((type) => (
                <p>{type.name}</p>
              ))}
            </h3>
          </div>
        )
      )}
    </div>
  );
};

export default DetailPage;
