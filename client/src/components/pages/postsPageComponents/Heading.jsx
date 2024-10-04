import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  fetchAllPosts,
  getPostUploadingErrorMessage,
  getPostUploadingState,
} from "../../../reducer/postSlice";
import SuccessNotification from "../../common/SuccessNotification";
import FailureNotification from "../../common/FailureNotification";
import DisplayAllPosts from "./DisplayAllPosts";

const Heading = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(getAllPosts);
  const loading = useSelector(getPostUploadingState);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showFailureNotification, setShowFailureNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const serverError = useSelector(getPostUploadingErrorMessage);

  useEffect(() => {
    try {
      if (allPosts.length > 0) {
        return;
      }
      dispatch(fetchAllPosts());
      setShowSuccessNotification(true);
      setSuccessMessage("All Posts Fetched Successfully");
      setShowFailureNotification(false);
      setErrorMessage(null);
    } catch (error) {
      setShowFailureNotification(true);
      setErrorMessage(error.message);
      setShowSuccessNotification(false);
      setSuccessMessage(null);
    }
  }, [allPosts.length, dispatch]);

  return (
    <div>
      {showSuccessNotification ? (
        <SuccessNotification message={successMessage} />
      ) : (
        ""
      )}

      {showFailureNotification ? (
        <FailureNotification message={errorMessage} />
      ) : (
        ""
      )}

      {serverError && <FailureNotification message={serverError} />}

      <Link to="/createPost">
        <button>Create Post</button>
      </Link>
      <DisplayAllPosts />
    </div>
  );
};

export default Heading;
