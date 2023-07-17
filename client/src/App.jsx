import { Routes, Route, useLocation } from "react-router-dom"; //Importo para enrutar la app
import style from "./App.module.css"
import HomePage from "./views/HomePage/HomePage";
import LandingPage from "./views/LandingPage/LandingPage";
import CreatorOfPokemon from "./views/CreatorOfPokemon/CreatorOfPokemon";
import DetailPage from "./views/DetailPage/DetailPage";
import NavBar from "./components/NavBar/NavBar";
import FooterComponent from "./components/Footer/FooterComponent";
function App() {
  const location = useLocation();
  return (
    <div className={style.containerApp}>
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/pokemonCreator" element={<CreatorOfPokemon />} />
      </Routes>
      {location.pathname !== "/" && <FooterComponent />}
    </div>
  );
}

export default App;
