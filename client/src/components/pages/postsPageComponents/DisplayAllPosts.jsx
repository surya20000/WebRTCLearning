import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../../reducer/postSlice";

const DisplayAllPosts = () => {
  const allPosts = useSelector(getAllPosts);
  const navigate = useNavigate();

  const handelPostClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {allPosts.length > 0 ? (
        <>
          {allPosts.map((blog) => {
            return (
              <div
                className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 border border-white bg-white"
                key={blog._id}
                onClick={() => handelPostClick(blog._id)}
              >
                <div className="w-full md:w-1/3 bg-white grid place-items-center">
                  <img
                    src={blog.postImageURL}
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                </div>
                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                  <div className="flex justify-between item-center">
                    <p className="text-gray-500 font-medium hidden md:block">
                      Blog
                    </p>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M18 10c0 3.866-3.582 7-8 7a8.964 8.964 0 01-4.468-1.162L2 18l1.163-3.532A8.962 8.962 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                      </svg>

                      <p className="text-gray-600 font-bold text-sm ml-1">
                        {blog.views > 0 && blog.likes > 0
                          ? Math.floor((blog.likes / blog.views) * 100)
                          : 0}
                        %
                        <span className="text-gray-500 font-normal">
                          ({blog.comments} Comments)
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-pink-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{blog.likes}</span>
                      <span className="mx-2 flex items-center">
                        <svg
                          className="fill-gray-200 dark:fill-gray-200 w-[24px] h-[24px]"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 4.5C7.305 4.5 3.319 7.301 1.5 12c1.819 4.699 5.805 7.5 10.5 7.5s8.681-2.801 10.5-7.5c-1.819-4.699-5.805-7.5-10.5-7.5zm0 12c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zM12 10.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" />
                        </svg>
                      </span>
                      <span className="text-md font-bold">{blog.views}</span>
                    </div>
                    <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                      {blog.createdBy.name}
                    </div>
                  </div>
                  <h3 className="font-black text-gray-800 md:text-3xl text-xl hover:underline cursor-pointer">
                    {blog.heading}
                  </h3>
                  <p className="md:text-lg text-gray-500 text-base">
                    {blog.description}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default DisplayAllPosts;
