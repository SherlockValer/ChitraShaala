import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  MdArrowBack,
  MdFavorite,
  MdMoreVert,
  MdOutlineAdd,
  MdOutlineCheck,
  MdShare,
} from "react-icons/md";
import UploadImage from "../components/common/UploadImage";
import Favorite from "../components/common/Favorite";
import ImageModal from "../components/common/ImageModal";
import Loader from "../components/common/Loader";
import useFetchImages from "../hooks/useFetchImages";
import ShareAlbum from "../components/common/ShareAlbum";
import { useAuth } from "../context/AuthContext.jsx";

const Images = () => {
  const { albumId } = useParams();
  const { state } = useLocation();

  const { user } = useAuth();

  const {
    images,
    imageLoading,
    imageError,
    setRefetch,
    currFilter,
    setCurrFilter,
  } = useFetchImages(albumId);

  const [showUploadModal, setUploadModal] = useState(false);
  const [showShareAlbum, setShowShareAlbum] = useState(false);

  const [openImage, setOpenImage] = useState(false);
  const [currImageID, setCurrImageID] = useState(null);

  const handleOpenImage = (imageId) => {
    setOpenImage(true);
    setCurrImageID(imageId);
  };

  return (
    <div className="p-2">
      {/* Toolbar Panel */}
      <div className="flex items-center justify-between">
        {/* Back Arrow */}
        <Link to="/">
          <MdArrowBack className="size-8 hover:bg-stone-100 p-1 rounded-full" />
        </Link>

        <div className="flex items-center gap-2">
          {/* Share Album */}
          {user._id === state?.ownerId && (
            <>
              <MdShare
                onClick={() => setShowShareAlbum(true)}
                className="size-7 hover:bg-stone-100 p-1 rounded-full cursor-pointer"
              />

              <ShareAlbum
                isOpen={showShareAlbum}
                setIsOpen={setShowShareAlbum}
                albumId={albumId}
              />
            </>
          )}

          <MdMoreVert className="size-8 hover:bg-stone-100 p-1 rounded-full cursor-pointer" />
        </div>
      </div>

      {/* Album Title */}
      <h1 className="text-3xl mt-6 text-black">{state?.name}</h1>

      {/* Album Description */}
      <p className="text-lg mt-4">{state?.description || ""}</p>

      {/* Album Filters */}
      {user._id === state?.ownerId && (
        <div className="flex justify-start items-center  mt-4 text-sm font-medium">
          <div
            onClick={() => setCurrFilter("all")}
            className={`flex justify-start items-center gap-2 py-2 px-4 mr-2 border rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
              currFilter === "all"
                ? "bg-[#c2e7ff] border-0"
                : "bg-white hover:bg-zinc-100"
            }`}
          >
            <MdOutlineCheck
              className={`text-lg transition-all duration-200 ease-in-out ${
                currFilter === "all" ? "" : "hidden"
              }`}
            />
            All
          </div>
          <div
            onClick={() => setCurrFilter("favorites")}
            className={`flex justify-start items-center gap-2 py-2 px-4 mr-2 border rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
              currFilter === "favorites"
                ? "bg-[#c2e7ff] border-0"
                : "bg-white hover:bg-zinc-100"
            }`}
          >
            <MdOutlineCheck
              className={`text-lg transition-all duration-200 ease-in-out ${
                currFilter === "favorites" ? "" : "hidden"
              }`}
            />
            <MdFavorite />
            favorites
          </div>
        </div>
      )}

      {/* Empty Album Screen */}
      {!imageLoading && images.length === 0 && (
        <div className="w-full h-80 flex flex-col items-center justify-center gap-4">
          <p className="text-xl text-black">Album is empty</p>
          {user._id === state?.ownerId && (
            <button
              onClick={() => setUploadModal(true)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-800 cursor-pointer rounded-full "
            >
              Add Image
            </button>
          )}
        </div>
      )}

      {/* Images */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-2 mt-8">
        {images?.length !== 0 &&
          images?.map((image) => (
            <div
              key={image._id}
              className="mb-4 break-inside-avoid rounded overflow-hidden shadow-md bg-white relative cursor-pointer"
            >
              <img
                onClick={() => handleOpenImage(image._id)}
                className="w-full rounded-sm"
                src={image.url}
                alt={image.name}
              />
              {/* Favorite */}
              {user._id === state?.ownerId && (
                <Favorite imageData={image} setRefetch={setRefetch} />
              )}

              {/* Image Modal */}
              {openImage && currImageID === image._id && (
                <ImageModal
                  setIsOpen={setOpenImage}
                  imageData={image}
                  setRefetch={setRefetch}
                  albumName={state?.name}
                  albumOwner={state?.ownerId}
                />
              )}
            </div>
          ))}
      </div>

      {/* Loading Screen */}
      {imageLoading && (
        <div className="h-96">
          <Loader />
        </div>
      )}

      {/* Add Image Button */}
      {user._id === state?.ownerId && images.length !== 0 && (
        <div className="fixed bottom-15 right-25 bg-blue-600 text-white inline-block p-2 rounded-full">
          <MdOutlineAdd
            onClick={() => setUploadModal(true)}
            className="text-3xl"
          />
        </div>
      )}

      {user._id === state?.ownerId && showUploadModal && (
        <UploadImage
          isOpen={showUploadModal}
          setIsOpen={setUploadModal}
          albumId={albumId}
        />
      )}
    </div>
  );
};

export default Images;
