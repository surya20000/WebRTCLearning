import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";
import { userLoginWithGoogle } from "../../../reducer/userSlice";
import {
  getLoadingState,
  getError,
  getUserProfileInfo,
} from "../../../reducer/userSlice";
import Loader from "../../common/Loader";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserProfileInfo);
  const isLoading = useSelector(getLoadingState);
  const googleError = useSelector(getError);
  console.log(googleError);
  useEffect(() => {
    user && navigate("/UserPage");
  }, [user, navigate]);

  const handleUserLogin = async (clientID, credential) => {
    dispatch(userLoginWithGoogle({ clientID, credential }));
  };

  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="flex items-center absolute right-1/2 w-fit rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const clientId = credentialResponse.clientId;
            const credential = credentialResponse.credential;
            handleUserLogin(clientId, credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default GoogleSignIn;
