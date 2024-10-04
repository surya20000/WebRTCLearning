import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getUserProfileInfo } from "../src/reducer/userSlice";

const PrivateRoutes = () => {
  const currUser = useSelector(getUserProfileInfo);

  return <>{currUser ? <Outlet /> : <Navigate to="/signIn" />}</>;
};

export default PrivateRoutes;
