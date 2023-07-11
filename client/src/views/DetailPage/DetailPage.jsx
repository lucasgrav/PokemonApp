import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetail } from "./utils/fetchPokemonDetail";
import style from "./DetailPage.module.css";
import profesorOak from "./assets/images/profesorOak.png";
import { AiFillHeart } from "react-icons/ai";
import { BsFillShieldFill } from "react-icons/bs";
import { GiMineExplosion } from "react-icons/gi";
import { IoMdFlash } from "react-icons/io";
import {TbLineHeight} from "react-icons/tb"
import {FaWeightHanging} from "react-icons/fa"
import {MdCatchingPokemon} from "react-icons/md"
import imgDefault from "../../components/Card/assets/defaultImage.png"
import imageLoader from "./assets/images/pikachuLoader.gif"

const DetailPage = () => {
  const { id } = useParams(); // Recibo el id por params, id que se encuentra en la card que contiene un link hacia este path
  const [pokemonDetail, setPokemonDetail] = useState(); // Estado para guardar dicho pokemon

  useEffect(() => {
    //cuando se monta el componente llamo a la api para traerme el pokemon y sus detalles y guardarlo en el estado local
    fetchPokemonDetail(id, setPokemonDetail);
  }, []);

  return (
    <div className={style.containerDetail}>
      {!pokemonDetail ? <img className={style.pikachuLoaderDetail}src={imageLoader}/>:(pokemonDetail?.map(
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
          <div className={style.detailPokemon}>

            <div className={style.containerImage}>
              {/* IMAGEN DEL POKEMON */}
              {!image ? <img src={imgDefault} alt={`Image of ${name}`} /> :<img src={image} alt={`Image of ${name}`} />}
              
              {/* TYPES DEL POKEMON */}
              <div className={style.detailTypes}>
              <h2 className={style.nameDetail}>{name.toUpperCase()}</h2>
                <MdCatchingPokemon className={style.iconoTypes}/>
                {types.map((type) => (
                  <h3> | {type.name.toUpperCase()}</h3>
                ))}
              </div>
            </div>

            <div className={style.characteristicsPokemon}>
              <div className={style.containerDetailHeight}>
                {/* PESO Y ALTURA DE POKEMON */}
            <div>
            <h3><TbLineHeight/> | {height}</h3>
              <h3><FaWeightHanging/> |  {weight}</h3>
            </div>
              </div>

              {/* RANG STATS */}
              <div className={style.characteristicsPokemonStats}>
                <h3>STATS</h3>
                <div className={style.rangesDetail}>
                  <p className={style.detailCard}>
                    <AiFillHeart /> {life}
                  </p>
                  <div
                    className={style.rangeLife}
                    style={{ width: `${life}px` }}
                  ></div>
                  <p className={style.detailCard}>
                    <BsFillShieldFill /> {defense}
                  </p>
                  <div
                    className={style.rangeDefense}
                    style={{ width: `${defense}px` }}
                  ></div>
                  <p className={style.detailCard}>
                    <GiMineExplosion /> {attack}
                  </p>
                  <div
                    className={style.rangeAttack}
                    style={{ width: `${attack}px` }}
                  ></div>
                  <p className={style.detailCard}>
                    <IoMdFlash /> {speed}
                  </p>
                  <div
                    className={style.rangeSpeed}
                    style={{ width: `${speed}px` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )
      ))}
      <div>
        {pokemonDetail && <img className={style.profesorOak} src={profesorOak} />}
      </div>
    </div>
  );
};

export default DetailPage;
