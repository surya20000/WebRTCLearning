import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import SignInAndLogin from "./pages/SignInAndLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signIn" element={<SignInAndLogin/>}/>
          <Route element={<PrivateRoutes />}>
            <Route path="/UserPage" element={<UserPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
