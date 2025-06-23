import { MdOutlineImage } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { MdOutlinePhotoAlbum } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowRight } from "react-icons/md";
import useFetchAlbums from "../../hooks/useFetchAlbums";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlbums, setShowAlbums] = useState(false);

  const { albums, sharedAlbums } = useFetchAlbums();

  return (
    <div
      className={`w-1/5 max-lg:w-14 pt-8 transition-all duration-300 ease-in-out`}
    >
      <div className="pb-8">
        <div
          // onClick={() => navigate("/")}
          className={`w-6/7 flex items-center gap-2 py-3 max-lg:px-3 max-lg:py-1.5 px-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out  ${
            location.pathname === "/photos"
              ? "bg-[#c2e7ff] text-[#001d35] font-bold"
              : "hover:bg-gray-200 font-medium"
          }`}
        >
          <MdOutlineImage className="text-2xl" />
          <span className="max-lg:hidden">Photos</span>
        </div>
      </div>

      <hr className="lg:hidden pb-4 text-gray-400" />

      <div>
        <h2 className="font-bold px-6 pb-6 max-lg:hidden">Collections</h2>

        <div>
          <div
            onClick={() => navigate("/")}
            className={`w-6/7 flex items-center py-3 pl-0 pr-6 max-lg:px-3 max-lg:py-1.5 rounded-full cursor-pointer transition-all duration-300 ease-in-out  ${
              location.pathname === "/"
                ? "bg-[#c2e7ff] text-[#001d35] font-bold"
                : "hover:bg-gray-200 font-medium"
            }`}
          >
            <MdOutlineArrowRight
              onClick={() => setShowAlbums((show) => !show)}
              className={`text-2xl max-lg:hidden ${
                showAlbums ? "rotate-90" : "rotate-0"
              }`}
            />
            <MdOutlinePhotoAlbum className="text-2xl" />
            <span className="max-lg:hidden ml-2">Albums</span>
          </div>
          {showAlbums && (
            <div>
              {albums?.map((album) => (
                <Link
                  to={`/${album._id}`}
                  state={{ name: album.name, description: album.description }}
                  className={`w-6/7 flex items-center gap-2 py-3 pl-12 max-lg:px-3 max-lg:py-1.5 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-300 ease-in-out`}
                >
                  {/* <img
                    className="w-8 rounded-sm"
                    src="http://placehold.co/50?text=1"
                    alt=""
                  /> */}
                  <span className="max-lg:hidden">{album.name}</span>
                </Link>
              ))}
              {sharedAlbums?.map((album) => (
                <Link
                  to={`/${album._id}`}
                  state={{ name: album.name, description: album.description }}
                  className={`w-6/7 flex items-center gap-2 py-3 pl-12 max-lg:px-3 max-lg:py-1.5 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-300 ease-in-out`}
                >
                  {/* <img
                    className="w-8 rounded-sm"
                    src="http://placehold.co/50?text=1"
                    alt=""
                  /> */}
                  <span className="max-lg:hidden">{album.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div
          className={`w-6/7 flex items-center gap-2 py-3 max-lg:px-3 max-lg:py-1.5 px-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out  ${
            location.pathname === "/updates"
              ? "bg-[#c2e7ff] text-[#001d35] font-bold"
              : "hover:bg-gray-200 font-medium"
          }`}
        >
          <MdNotificationsNone className="text-2xl" />
          <span className="max-lg:hidden">Updates</span>
        </div>

        <div
          className={`w-6/7 flex items-center gap-2 py-3 max-lg:px-3 max-lg:py-1.5 px-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out  ${
            location.pathname === "/updates"
              ? "bg-[#c2e7ff] text-[#001d35] font-bold"
              : "hover:bg-gray-200 font-medium"
          }`}
        >
          <MdOutlineArticle className="text-2xl" />
          <span className="max-lg:hidden">Documents</span>
        </div>

        <div
          className={`w-6/7 flex items-center gap-2 py-3 max-lg:px-3 max-lg:py-1.5 px-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out  ${
            location.pathname === "/updates"
              ? "bg-[#c2e7ff] text-[#001d35] font-bold"
              : "hover:bg-gray-200 font-medium"
          }`}
        >
          <MdOutlineStarBorder className="text-2xl" />
          <span className="max-lg:hidden">Favorites</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// const handleChevClick = (e) => {

//   e.stopPropogation();
// };

// const handleAlbumDivClick = (e) => {

//   e.stopPropogation();
// };
