import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <Link to="/signIn">
        <button>SignIn</button>
      </Link>
    </div>
  );
};

export default LandingPage;
