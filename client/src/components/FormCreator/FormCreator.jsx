import style from "./FormCreator.module.css";
import useRangeChange from "./CustomHooks/useRangeChange";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getAllTypes } from "../../Redux/actions";
import Card from "../Card/Card";

const FormCreator = () => {
  const dispatch = useDispatch();
  const {
    name,
    rangeLife,
    rangeAttack,
    rangeDefense,
    rangeSpeed,
    rangeHeight,
    rangeWeight,
    error,
    nameType,
    imagePokemon,
    handleName,
    handleRangeLife,
    handleRangeAttack,
    handleRangeDefense,
    handleRangeSpeed,
    handleRangeHeight,
    handleRangeWeight,
    handleChecked,
    handleSubmit,
    handleImage,
  } = useRangeChange();

  useEffect(() => {
    dispatch(getAllTypes());
  }, []);

  const types = useSelector((state) => state.allTypes);
  const formRef = useRef(null);

  const handleFormSubmit = (event) => {
    const confirmed = window.confirm("Are you sure of create the pokemon?");
    if (confirmed) {
      event.preventDefault();
      handleSubmit();
      // Restablece los checkboxes
      formRef.current.reset();
    } else {
      event.preventDefault();
      window.alert("Ok, don't forget to create your pokemon");
    }
  };

  return (
    <div>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleFormSubmit} ref={formRef}>
          <div className={style.containerNameImage}>
            <div className={style.containerName}>
              <label>Name </label>
              <input
                className={style.inputName}
                type="text"
                name="name"
                onChange={handleName}
                value={name}
              />
              <p>{error.name}</p>
            </div>
            <div className={style.containerImage}>
              <label>Image</label>
              <input
                type="text"
                name="image"
                value={imagePokemon}
                onChange={handleImage}
              />
              <p>{error.image}</p>
            </div>
          </div>
          <div className={style.containerRanges}>
            <label className={style.labelStats}>Stats</label>
            <label>Life: {rangeLife} </label>
            <input
              type="range"
              min="10"
              max="100"
              name="life"
              onChange={handleRangeLife}
              value={rangeLife}
            />

            <label>Attack: {rangeAttack}</label>
            <input
              type="range"
              min="5"
              max="100"
              name="attack"
              onChange={handleRangeAttack}
              value={rangeAttack}
            />

            <label>Defense: {rangeDefense}</label>
            <input
              type="range"
              min="10"
              max="100"
              name="defense"
              onChange={handleRangeDefense}
              value={rangeDefense}
            />

            <label>Speed: {rangeSpeed}</label>
            <input
              type="range"
              min="5"
              max="100"
              name="speed"
              onChange={handleRangeSpeed}
              value={rangeSpeed}
            />

            <label>Height: {rangeHeight}</label>
            <input
              type="range"
              min="50"
              max="200"
              name="height"
              onChange={handleRangeHeight}
              value={rangeHeight}
            />

            <label>Weight: {rangeWeight}</label>
            <input
              type="range"
              min="20"
              max="1000"
              name="weight"
              onChange={handleRangeWeight}
              value={rangeWeight}
            />
          </div>
          <div className={style.containerTypes}>
            <label className={style.labelTypes}>Types {"(Max 3)"}</label>
            <p>{error.types}</p>
            <div className={style.containerTypesCheck}>
              {types?.map((type) => (
                <div key={type.id}>
                  <label>
                    {type.name.replace(/^\w/, (c) => c.toUpperCase())}
                  </label>
                  <input
                    id={type.id}
                    name={type.name}
                    type="checkbox"
                    onChange={handleChecked}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={!(error.name === "✅" && error.types === "✅")}
            >
              Create Pokemon
            </button>
          </div>
        </form>
        <div className={style.containerCardForm}>
          <Card
            imageUrl={imagePokemon}
            name={!name ? "Name of Pokemon" : name}
            id={9999}
            types={!nameType.length ? [{ name: "Select Types" }] : nameType}
            attack={!rangeAttack ? 50 : rangeAttack}
            life={!rangeLife ? 50 : rangeLife}
            defense={!rangeDefense ? 50 : rangeDefense}
          />
        </div>
       
      </div>
    </div>
  );
};

export default FormCreator;
