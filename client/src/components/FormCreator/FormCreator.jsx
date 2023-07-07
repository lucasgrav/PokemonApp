import style from "./FormCreator.module.css";
import useRangeChange from "./CustomHooks/useRangeChange";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllTypes } from "../../Redux/actions";

const FormCreator = () => {
  const dispatch = useDispatch();
  const {
    rangeLife,
    rangeAttack,
    rangeDefense,
    rangeSpeed,
    rangeHeight,
    rangeWeight,
    error,
    handleImage,
    handleName,
    handleRangeLife,
    handleRangeAttack,
    handleRangeDefense,
    handleRangeSpeed,
    handleRangeHeight,
    handleRangeWeight,
    handleChecked,
    handleSubmit
  } = useRangeChange();

  useEffect(() => {
    dispatch(getAllTypes());
  }, []);

  const types = useSelector((state) => state.allTypes);

  
  return (
    <div>
      <div>
        <form className={style.formContainer} onSubmit={handleSubmit}>
          <label>Image</label>
          <input type="file" onChange={handleImage}/>
          <label>Name </label>
          <input type="text" name="name" onChange={handleName}/>
          <p>{error.name}</p>
          <label>Life: {rangeLife} </label>
          <input type="range" min="0" max="100" name="life" onChange={handleRangeLife} />
          <p>{error.life}</p>
          <label>Attack: {rangeAttack}</label>
          <input type="range" min="0" max="100" name="attack" onChange={handleRangeAttack} />

          <label>Defense: {rangeDefense}</label>
          <input type="range" min="0" max="100" name="defense" onChange={handleRangeDefense} />

          <label>Speed: {rangeSpeed}</label>
          <input type="range" min="0" max="100" name="speed" onChange={handleRangeSpeed} />

          <label>Height: {rangeHeight}</label>
          <input type="range" min="0" max="100" name="height" onChange={handleRangeHeight} />

          <label>Weight: {rangeWeight}</label>
          <input type="range" min="0" max="1000" name="weight"onChange={handleRangeWeight} />

          <label >Types {"(Max 3)"}</label>
          <p>{error.types}</p>
          <div className={style.containerTypesCheck}>
            {types?.map((type) => (
              <div key={type.id}>
                <label>{type.name}</label>
                <input id={type.id} name={type.name} type="checkbox" onChange={handleChecked}/>
              </div>
            ))}
          </div>
          <button type="submit" disabled={!(error.name === "✅" && error.types === "✅")}>Create Pokemon</button>
        </form>
      </div>
    </div>
  );
};

export default FormCreator;
