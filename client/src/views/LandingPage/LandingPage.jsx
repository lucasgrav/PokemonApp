import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div>
      <h1>LandingPage</h1>
      <Link to="/home">
        <h2>To Home</h2>
      </Link>
    </div>
  );
};

export default LandingPage;
