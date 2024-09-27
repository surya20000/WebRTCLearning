import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfileInfo,
  removeUserProfileData,
  startLoading,
  stopLoading,
} from "../../../reducer/userSlice";
import { useNavigate } from "react-router-dom";

const GreetUser = () => {
  const userData = useSelector(getUserProfileInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userData);

  const handleLogout = () => {
    dispatch(startLoading());
    dispatch(removeUserProfileData());
    dispatch(stopLoading());
    navigate("/");
  };

  return (
    <div>
        <h1>Hello {userData.firstName} {userData.lastName}</h1>
      <button
        role="tab"
        type="button"
        className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-inset text-yellow-600 shadow bg-white dark:text-white dark:bg-yellow-600"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default GreetUser;
