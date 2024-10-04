import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import Posts from "./pages/Posts";
import Connect from "./pages/Connect";
import PrivateRoutes from "../utils/PrivateRoutes";
import SignInAndLogin from "./pages/SignInAndLogin";
import Navbar from "./components/common/Navbar";
import CreatePost from "./components/pages/postsPageComponents/CreatePost";
import DisplayPost from "./components/pages/postsPageComponents/DisplayPost";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signIn" element={<SignInAndLogin />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/connect" element={<Connect />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/UserPage" element={<UserPage />} />
          <Route path="/post/:id" element={<DisplayPost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
