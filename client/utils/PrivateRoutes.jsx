import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getUserProfileInfo } from "../src/reducer/userSlice";

const PrivateRoutes = () => {
  const currUser = useSelector(getUserProfileInfo);
  console.log(currUser);

  return <>{currUser ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoutes;
