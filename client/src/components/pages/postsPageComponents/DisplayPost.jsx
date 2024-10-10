import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementPostLike,
  fetchParticularPost,
  getParticularPost,
  getPostUploadingErrorMessage,
  getPostUploadingState,
} from "../../../reducer/postSlice";

import { getUserProfileInfo } from "../../../reducer/userSlice";
import SuccessNotification from "../../common/SuccessNotification";
import FailureNotification from "../../common/FailureNotification";
import Loader from "../../common/Loader";
import {
  getCommentsLoadingState,
  addComment,
  fetchAllComments,
  getAllComments,
  getCommentsErrorMessage,
  // likeComment,
} from "../../../reducer/commentSlice";

const DisplayPost = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const post = useSelector(getParticularPost);
  const userInfo = useSelector(getUserProfileInfo);
  const loading = useSelector(getPostUploadingState);
  const commentLoadingState = useSelector(getCommentsLoadingState);
  const commentErrorMessage = useSelector(getCommentsErrorMessage);
  const allComments = useSelector(getAllComments);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showFailureNotification, setShowFailureNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const serverError = useSelector(getPostUploadingErrorMessage);
  const [formData, setFormData] = useState({});
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [activateLikePostMethod, setActivateLikePostMethod] = useState(null);
  // const [activateLikeCommentMethod, setActivateLikeCommentMethod] =
  useState(null);
  // const userLikedComments = userInfo.userLikedPostsAndComments.filter(
  //   (item) => item.itemType === "Comment"
  // );

  const handleShowComments = () => {
    try {
      setShowCommentBox((prevState) => !prevState);
      dispatch(fetchAllComments(id));
      setSuccessMessage("Comments Fetched Successfully");
      setShowSuccessNotification(true);
      setShowFailureNotification(false);
    } catch (error) {
      setShowSuccessNotification(false);
      setShowFailureNotification(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    try {
      dispatch(fetchParticularPost(id));
      setShowSuccessNotification(true);
      setSuccessMessage("Blog Fetched Successfully");
      setShowFailureNotification(false);
    } catch (error) {
      setShowSuccessNotification(false);
      setShowFailureNotification(true);
      setErrorMessage(error.message);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (post && userInfo) {
      setFormData({
        postID: post._id, // Ensure post._id exists
        userID: userInfo._id,
      });
    }
  }, [post, userInfo]);

  useEffect(() => {
    const hasLikedPost = userInfo.userLikedPostsAndComments.some(
      (item) => item.itemId === id.id && item.itemType === "Post"
    );

    if (hasLikedPost) {
      setActivateLikePostMethod(false);
      return;
    }
    setActivateLikePostMethod(true);
  }, [id, userInfo.userLikedPostsAndComments]);

  // useEffect(() => {
  //   if (showCommentBox && allComments.length > 0) {
  //     const likedCommentIds = new Set(
  //       userLikedComments.map((item) => item.itemId)
  //     );

  //     allComments.forEach((comment) => {
  //       if (likedCommentIds.has(comment._id)) {
  //         setActivateLikeCommentMethod(false);
  //       }
  //     });
  //   }
  // }, [showCommentBox, allComments, userLikedComments]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddComment = () => {
    try {
      dispatch(addComment(formData));
      setShowSuccessNotification(true);
      formData.comment = " ";
      setSuccessMessage("Comment Added Successfully");
    } catch (error) {
      setShowSuccessNotification(false);
      setShowFailureNotification(true);
      setErrorMessage(error.message);
    }
  };

  //* method to dispatch the increment like function
  const handlePostLike = () => {
    try {
      dispatch(incrementPostLike({ id, userID: userInfo._id }));
      setSuccessMessage("Post Liked Successfully");
      setShowSuccessNotification(true);
      setActivateLikePostMethod(false);
    } catch (error) {
      setShowSuccessNotification(false);
      setShowFailureNotification(true);
      setErrorMessage(error.message);
    }
  };

  //* method to dispatch the comment like
  // const handleCommentLike = (commentId) => {
  //   try {
  //     dispatch(
  //       likeComment({ id: commentId, postID: id, userID: userInfo._id })
  //     );
  //     setSuccessMessage("Comment Liked Successfully");
  //     setShowSuccessNotification(true);
  //     setActivateLikeCommentMethod(false);
  //   } catch (error) {
  //     setShowSuccessNotification(false);
  //     setShowFailureNotification(true);
  //     setErrorMessage(error.message);
  //   }
  // };

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

      {commentErrorMessage && (
        <FailureNotification message={commentErrorMessage} />
      )}

      {loading ? <Loader /> : ""}

      {commentLoadingState ? <Loader /> : ""}

      {post ? (
        <div className="wrapper pt-10 px-8 flex flex-col items-center">
          {/* Card */}
          <article className="mb-4 break-inside p-6 rounded-xl bg-neutral-400 flex flex-col bg-clip-border sm:w-3/6 md:w-full">
            <div className="flex pb-6 items-center justify-between">
              <div className="flex">
                <a className="inline-block mr-4" href="#">
                  <img
                    className="rounded-full max-w-none w-12 h-12"
                    src={post.createdBy.profilePicURL}
                  />
                </a>
                <div className="flex flex-col">
                  <div>
                    <a
                      className="inline-block text-lg font-bold dark:text-white"
                      href="#"
                    >
                      {post.createdBy.name}
                    </a>
                  </div>
                  <div className="text-slate-500 dark:text-slate-200">
                    July 17, 2018
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold dark:text-white">
              {post.heading}
            </h2>
            <div className="py-4">
              <div className="flex justify-center gap-1">
                <img
                  className="max-w-full h-64 rounded-xl"
                  src={post.postImageURL}
                />
              </div>
            </div>
            <p className="dark:text-slate-200">{post.description}</p>
            <div className="py-4 ml-auto">
              <div
                className={`inline-flex items-center hover:cursor-pointer ${
                  activateLikePostMethod
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-gray-500 dark:text-gray-300"
                }`}
                onClick={activateLikePostMethod ? handlePostLike : () => {}}
              >
                <span className="mr-2">
                  <svg
                    className={`fill-${
                      activateLikePostMethod
                        ? "gray-500 dark:fill-gray-300"
                        : "rose-600 dark:fill-rose-400"
                    } w-[24px] h-[24px]`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                  </svg>
                </span>
                <span className="text-lg font-bold">{post.likes}</span>
              </div>
              <div className="inline-flex items-center">
                <span className="mx-2">
                  <svg
                    className="fill-gray-200 dark:fill-gray-200 w-[24px] h-[24px]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4.5C7.305 4.5 3.319 7.301 1.5 12c1.819 4.699 5.805 7.5 10.5 7.5s8.681-2.801 10.5-7.5c-1.819-4.699-5.805-7.5-10.5-7.5zm0 12c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zM12 10.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" />
                  </svg>
                </span>
                <span className="text-lg font-bold">{post.views}</span>
              </div>
            </div>
            <button
              onClick={handleShowComments}
              className={`pt-2 pb-2 pl-3 w-full h-11 justify-center bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20 cursor-pointer ${
                showCommentBox ? "hidden" : "flex"
              }`}
            >
              Show All Comments
            </button>
            <div className={`${showCommentBox ? "block" : "hidden"}`}>
              <div className="relative">
                <input
                  className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
                  type="text"
                  placeholder="Write a comment"
                  name="comment"
                  onChange={handleChange}
                />
                <span
                  onClick={handleAddComment}
                  className="flex absolute right-3 top-2/4 -mt-3 items-center"
                >
                  <svg
                    className="fill-blue-500 dark:fill-slate-50 w-[24px] h-[24px]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                  </svg>
                </span>
              </div>
              {/* Comment Section */}
              {allComments.length > 0 ? (
                allComments.map((comment) => {
                  return (
                    <div className="pt-6" key={comment._id}>
                      <div className="media flex pb-4">
                        <a className="mr-4" href="#">
                          <img
                            className="rounded-full max-w-none w-12 h-12"
                            src={comment.userID.profilePicURL}
                          />
                        </a>
                        <div className="media-body">
                          <div>
                            <p className="inline-block text-base font-bold mr-2">
                              {comment.userID.name}
                            </p>
                            <span className="text-slate-500 dark:text-slate-300">
                              25 minutes ago
                            </span>
                          </div>
                          <p>{comment.comment}</p>
                          {/* <div
                              className="mt-2 flex items-center hover:cursor-pointer"
                              onClick={() => {
                                if (
                                  activateLikeCommentMethod &&
                                  !isLikedByUser
                                ) {
                                  console.log("func needs to be executed");

                                  handleCommentLike(comment._id);
                                } else {
                                  console.log("nothing happened");
                                }
                              }}
                            >
                              <p className="inline-flex items-center py-2 mr-3">
                                <span className="mr-2">
                                  <svg
                                    className={`${
                                      isLikedByUser
                                        ? "fill-rose-600 dark:fill-rose-400"
                                        : "fill-gray-400 dark:fill-gray-300"
                                    } w-[22px] h-[22px]`}
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                                  </svg>
                                </span>
                                <span className="text-base font-bold">
                                  {comment.likes}
                                </span>
                              </p>
                            </div> */}
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })
              ) : (
                <p className="flex justify-center text-lg p-4">
                  Be the First One to Comment Here!
                </p>
              )}
              <div className="w-full">
                <button className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">
                  Show more comments
                </button>
              </div>
            </div>
          </article>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default DisplayPost;
