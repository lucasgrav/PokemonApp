import CardsContainer from "../../components/CardsContainer/CardsContainer";
import style from "./HomePage.module.css"
const HomePage = () => {
  return (
    <div className={style.homePage}>
      <CardsContainer />
    </div>
  );
};

export default HomePage;
