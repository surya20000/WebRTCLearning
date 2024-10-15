import Heading from "../components/pages/connectPageComponents/Heading";
import CurrentActiveUsersWindow from "../components/pages/connectPageComponents/CurrentActiveUsersWindow";
import VideosWindow from "../components/pages/connectPageComponents/VideosWindow";

const Connect = () => {
  return (
    <div>
      <Heading />
      <div className="flex">
        <CurrentActiveUsersWindow />
        <VideosWindow />
      </div>
    </div>
  );
};

export default Connect;
