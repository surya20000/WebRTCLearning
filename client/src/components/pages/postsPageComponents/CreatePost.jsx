import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../common/Loader";
import { getUserProfileInfo } from "../../../reducer/userSlice";
import {
  uploadNewPost,
  getPostUploadingState,
  getPostUploadingErrorMessage,
} from "../../../reducer/postSlice";
import SuccessNotification from "../../common/SuccessNotification";
import FailureNotification from "../../common/FailureNotification";

const CreatePost = () => {
  const dispatch = useDispatch();
  const postLoadingState = useSelector(getPostUploadingState);
  const userInfo = useSelector(getUserProfileInfo);
  const [formData, setFormData] = useState({ createdBy: userInfo._id });
  const fileRefPost = useRef(null);
  const [imageUploadLoadingState, setImageUploadLoadingState] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showFailureNotification, setShowFailureNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const serverError = useSelector(getPostUploadingErrorMessage);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleImageUpload(selectedFile);
    }
  };

  const handleImageUpload = async (selectedFile) => {
    try {
      setImageUploadLoadingState(true);
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "phzosbeb");
      data.append("Folder", "media");
      if (data) {
        await fetch(import.meta.env.VITE_APP_CLOUDINARY_URI, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((result) => {
            setImageUploadLoadingState(false);
            setFormData({ ...formData, ["postImageURL"]: result.secure_url });
            setShowSuccessNotification(true);
            setSuccessMessage("Image Uploaded Successfully");
          });
      }
    } catch (error) {
      setImageUploadLoadingState(false);
      setShowFailureNotification(true);
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e) => {
    try {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } catch (error) {
      showFailureNotification(true);
      setErrorMessage(error.message);
    }
  };

  const handleUploadPost = (e) => {
    e.preventDefault();
    try {
      dispatch(uploadNewPost(formData));
      setShowSuccessNotification(true);
      setSuccessMessage("Post Uploaded Successfully");
    } catch (error) {
      showFailureNotification(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      {imageUploadLoadingState ? (
        <div className="absolute">
          {" "}
          <Loader />
        </div>
      ) : (
        ""
      )}

      {postLoadingState ? (
        <div className="absolute">
          {" "}
          <Loader />
        </div>
      ) : (
        ""
      )}

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

      <h1>Upload your post let the world know your thoughts</h1>
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover bg-[url(https://i.pinimg.com/564x/9f/a9/d2/9fa9d2ec5448525c567ba87d98a2753f.jpg)]">
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              Create A Post
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              It takes so less time to spread so much Information
            </p>
          </div>
          <form className="mt-8 space-y-3">
            <div className="grid grid-cols-1 space-y-2">
              {formData.postImageURL ? (
                <img
                  src={formData.postImageURL}
                  className="w-full h-60 object-contain  rounded-lg mx-auto"
                />
              ) : (
                <>
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Upload A Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                      <div className="h-full w-full text-center flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <div className="flex flex-auto items-center justify-center max-h-48 w-2/5 mx-auto -mt-10">
                          <img
                            className="has-mask h-36 object-center"
                            src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                            alt="freepik image"
                          />
                        </div>
                        <p className="pointer-none text-gray-500 ">
                          <span className="text-sm">Drag and drop</span> files
                          here <br /> or{" "}
                          <span className="text-blue-600 hover:underline">
                            select a file
                          </span>{" "}
                          from your computer
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={fileRefPost}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: png,jpg</span>
            </p>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Title Of Your Post
              </label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type="text"
                name="heading"
                placeholder="My First Time Experience With Ace"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Describe your moments
              </label>
              <textarea
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 min-h-56 max-h-96 overflow-hidden"
                type="text"
                name="description"
                placeholder="We would love to hear your moments"
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                onClick={handleUploadPost}
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                            font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
