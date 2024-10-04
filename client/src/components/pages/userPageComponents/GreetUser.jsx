import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { useEffect, useState } from "react";
import {
  getLoadingState,
  getUserProfileInfo,
  updateUserProfileData,
  getError,
} from "../../../reducer/userSlice";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import Loader from "../../common/Loader";
import SuccessNotification from "../../common/SuccessNotification";
import FailureNotification from "../../common/FailureNotification";

const GreetUser = () => {
  const dispatch = useDispatch();
  const fileRefProfile = useRef(null);
  const userInfo = useSelector(getUserProfileInfo);
  const isLoading = useSelector(getLoadingState);
  const [profileImage, setProfileImage] = useState(userInfo.profilePicURL);
  const [uploadButtonVisibility, setUploadButtonVisibility] = useState(false);
  const [imageUploadLoadingState, setImageUploadLoadingState] = useState(false);
  const [form, setFormData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showFailureNotification, setShowFailureNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const serverError = useSelector(getError);

  const interestsOptions = [
    "Cars",
    "Music",
    "Games",
    "Web Series",
    "Movies",
    "Cooking",
    "Songs",
  ];

  useEffect(() => {
    if (userInfo.userAreaOfInterests) {
      setFormData((prevForm) => ({
        ...prevForm,
        userAreaOfInterests: userInfo.userAreaOfInterests || [],
      }));
    }
  }, [userInfo.userAreaOfInterests]);

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
            setUploadButtonVisibility(true);
            setProfileImage(result.secure_url);
            setShowSuccessNotification(true);
            setSuccessMessage(null);
            setSuccessMessage("Image Uploaded Successfully");
            setFormData({ ...form, ["profilePicUR"]: result.secure_url });
          });
      }
    } catch (error) {
      setImageUploadLoadingState(false);
      setShowSuccessNotification(false);
      setSuccessMessage(null);
      console.log("Error Uploading Image", error.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleImageUpload(selectedFile);
    }
  };

  const handleChange = (e) => {
    setUploadButtonVisibility(true);
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (interest) => {
    setUploadButtonVisibility(true);
    if (form.userAreaOfInterests.includes(interest)) {
      setFormData((prevForm) => ({
        ...prevForm,
        userAreaOfInterests: prevForm.userAreaOfInterests.filter(
          (item) => item !== interest
        ),
      }));
    } else {
      setFormData((prevForm) => ({
        ...prevForm,
        userAreaOfInterests: [...prevForm.userAreaOfInterests, interest],
      }));
    }
  };

  const handleUserProfileUpdate = (e) => {
    try {
      e.preventDefault();
      const _id = userInfo._id;
      dispatch(updateUserProfileData({ _id, form }));
      setShowSuccessNotification(true);
      setSuccessMessage(null);
      setSuccessMessage("Profile Updated Successfully");
      setUploadButtonVisibility(false);
      setDropdownOpen(false);
    } catch (error) {
      setShowSuccessNotification(false);
      setSuccessMessage(null);
      setShowFailureNotification(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <div>
      {imageUploadLoadingState ? <Loader /> : ""}
      {isLoading ? <Loader /> : ""}
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

      {userInfo && (
        <>
          {/* Background section with image and overlay */}
          <section className="relative block h-[450px]">
            <div className='absolute top-0 w-full h-full bg-center bg-cover bg-[url("https://i.ibb.co/zR1ykQb/background-Temp.jpg")]'>
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div className="relative w-full h-20 overflow-hidden transform translateZ-0">
              <svg
                className="absolute bottom-0"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                viewBox="0 0 2560 100"
              ></svg>
            </div>
          </section>

          {/* Profile card section */}

          <section className="relative py-16 bg-blueGray-200">
            <form>
              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center mt-4">
                        <div className="relative">
                          <div
                            className="absolute top-14 right-10 hover:cursor-pointer"
                            onClick={() => {
                              fileRefProfile.current.click();
                            }}
                          >
                            <HiOutlinePencilAlt size={25} />
                          </div>
                          <input
                            type="file"
                            ref={fileRefProfile}
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <img
                            alt="Profile"
                            src={profileImage}
                            className="shadow-xl rounded-full h-28 align-middle border-none max-w-150-px"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div className="py-6 px-3 mt-32 sm:mt-0 text-center">
                          <button
                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-1 mt-4">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                              {userInfo.friends}
                            </span>
                            <span className="text-sm text-blueGray-400">
                              Friends
                            </span>
                          </div>
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                              {userInfo.interactions}
                            </span>
                            <span className="text-sm text-blueGray-400">
                              Interactions
                            </span>
                          </div>
                          <div className="lg:mr-4 p-3 text-center">
                            <div className="flex text-xl items-center">
                              <FaHeart color="red" />
                              <span className="font-bold block uppercase tracking-wide text-blueGray-600 ml-1">
                                {userInfo.hearts}
                              </span>
                            </div>
                            <span className="text-sm text-blueGray-400">
                              Hearts
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-12">
                      <input
                        onChange={handleChange}
                        name="name"
                        value={form.name || userInfo.name}
                        className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 border-none text-center"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Biography Section */}
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <p className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400 font-bold">
                            Description
                          </p>
                          <textarea
                            name="userDescription"
                            onChange={handleChange}
                            value={
                              form.userDescription || userInfo.userDescription
                            }
                            className="mb-1 text-lg leading-relaxed text-blueGray-700 border-none text-center w-full max-h-52 overflow-hidden"
                            placeholder="Introduce yourself to make people understand You"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">
                        Area Of Interests
                      </i>
                      <div className="px-6 pt-4 pb-2">
                        {userInfo.userAreaOfInterests &&
                          userInfo.userAreaOfInterests.map(
                            (interests, index) => {
                              return (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                >
                                  {interests}
                                </span>
                              );
                            }
                          )}
                      </div>
                      <div className="relative inline-block w-full">
                        <div
                          className="flex justify-between items-center py-2 pl-3 pr-2 border border-gray-300 rounded-lg cursor-pointer"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          <span className="mx-auto">
                            Select Area of Interests
                          </span>
                          <i
                            className={`fas fa-chevron-down transition-transform ${
                              dropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>
                      {dropdownOpen && (
                        <div className="relative w-full bg-white border border-gray-300 mt-2 rounded-lg shadow-lg z-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-3 py-2">
                            {interestsOptions.map((interest, index) => (
                              <div
                                key={index}
                                className="flex items-center hover:bg-gray-100"
                              >
                                <input
                                  type="checkbox"
                                  id={`interest-${index}`}
                                  checked={form.userAreaOfInterests.includes(
                                    interest
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(interest)
                                  }
                                  className="mr-2"
                                />
                                <label
                                  htmlFor={`interest-${index}`}
                                  className="text-sm font-medium text-gray-700"
                                >
                                  {interest}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center flex justify-center ${
                      uploadButtonVisibility ? "block" : "hidden"
                    }`}
                  >
                    <div className="py-6 px-3 mt-32 sm:mt-0 text-center">
                      <button
                        className={`bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 
                        `}
                        type="button"
                        onClick={handleUserProfileUpdate}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default GreetUser;
