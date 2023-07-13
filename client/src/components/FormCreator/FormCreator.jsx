import style from "./FormCreator.module.css";
import useRangeChange from "./CustomHooks/useRangeChange";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getAllTypes } from "../../Redux/actions";
import Card from "../Card/Card";
import imgDefault from "./assets/image/defaultImage.png"


const FormCreator = () => {
  const dispatch = useDispatch(); //DISPATCH

  useEffect(() => {
    dispatch(getAllTypes());
  }, []); 

  const {
    values,
    error,
    handleSubmit,
    handleChangesValues,
    handleClickButton,
    resetTypesButtons
  } = useRangeChange(); //CUSTOM HOOK CON LOS ESTADOS DE LOS INPUTS Y LA LOGICA

  const types = useSelector((state) => state.allTypes);
 
  return (
    <div>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          {/* CONTAINER DE LOS INPUTS IMAGE Y NAME */}
          <div className={style.containerNameStats}>
          <div className={style.containerNameImage}>
            {/* NAME */}
            <div className={style.containerName}>
              <label>Name </label>
              <input
                className={style.inputName}
                type="text"
                name="name"
                onChange={handleChangesValues}
                value={values.name}
              />
              <p>{error.name}</p>
            </div>
            {/* IMAGE */}
            <div className={style.containerImage}>
              <label>Image</label>
              <input
                type="text"
                name="image"
                value={values.imagePokemon}
                onChange={handleChangesValues}
              />
              <p>{error.image}</p>
            </div>
          </div>

          {/* CONTAINER DE LOS INPUTS RANGES DE LAS STATS */}
          <div className={style.containerRanges}>
            <label className={style.labelStats}>Stats</label>
            {/* LIFE */}
            <label>Life: {values.rangeLife} </label>
            <input
              type="range"
              min="10"
              max="100"
              name="life"
              onChange={handleChangesValues}
              value={values.life}
            />
            {/* ATTACK */}
            <label>Attack: {values.rangeAttack}</label>
            <input
              type="range"
              min="5"
              max="100"
              name="attack"
              onChange={handleChangesValues}
              value={values.rangeAttack}
            />
            {/* DEFENSE */}
            <label>Defense: {values.rangeDefense}</label>
            <input
              type="range"
              min="10"
              max="100"
              name="defense"
              onChange={handleChangesValues}
              value={values.rangeDefense}
            />
            {/* SPEED */}
            <label>Speed: {values.rangeSpeed}</label>
            <input
              type="range"
              min="5"
              max="100"
              name="speed"
              onChange={handleChangesValues}
              value={values.rangeSpeed}
            />
            {/* HEIGHT */}
            <label>Height: {values.rangeHeight} CM</label>
            <input
              type="range"
              min="50"
              max="200"
              name="height"
              onChange={handleChangesValues}
              value={values.rangeHeight}
            />
            {/* WEIGHT */}
            <label>Weight: {values.rangeWeight} KG</label>
            <input
              type="range"
              min="20"
              max="1000"
              name="weight"
              onChange={handleChangesValues}
              value={values.rangeWeight}
            />
          </div>





          </div>
         

          {/* CONTAINER DE LOS TYPES y BUTTONS*/}
          <div className={style.containerTypes}>
            <label className={style.labelTypes}>Types {"(Max 3)"}</label>
            <p>{error.types}</p>
            {/* TYPES */}
            <div className={style.containerTypesCheck}>    
        {types.map((type) => (
          <button  onClick={handleClickButton}key={type.id} id={type.id} value={type.name} name={type.name} className={style[type.name]} >
            {type.name.replace(/^\w/, (c) => c.toUpperCase())}
          </button>
        ))}
            </div>
             {/* BUTTON RESET TYPES */}
            <button className={style.buttonResetTypes} onClick={resetTypesButtons}>Reset Types</button>
            {/* BUTTON SUBMIT */}
            <button
              type="submit"
              disabled={!(error.name === "✅" && error.types === "✅" && error.image === "✅" )}
            >
              Create Pokemon
            </button>
          </div>
        </form>
        {/* CARD PREVIEW */}
        <div className={style.containerCardForm}>
          <Card
            imageUrl={/\.(jpeg|jpg|png|gif|bmp)$/i.test(values.imagePokemon) ? values.imagePokemon : imgDefault}
            name={!values.name ? "Name of Pokemon" : values.name}
            id={9999}
            types={!values.nameType.length ? [{ name: "Select Types" }] : values.nameType}
            attack={!values.rangeAttack ? 50 : values.rangeAttack}
            life={!values.rangeLife ? 50 : values.rangeLife}
            defense={!values.rangeDefense ? 50 : values.rangeDefense}
          />
        </div>
      </div>
    </div>
  );
};

export default FormCreator;
