import { useState } from "react";
import DeleteImage from "./DeleteImage";
import Favorite from "./Favorite";

import {
  MdCalendarMonth,
  MdDeleteForever,
  MdFileDownload,
  MdOutlinePhoto,
} from "react-icons/md";
import CommentsSection from "./CommentsSection";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaTags } from "react-icons/fa";

const ImageModal = ({
  setIsOpen,
  imageData,
  setRefetch,
  albumName,
  albumOwner,
}) => {
  const { user } = useAuth();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50">
      <div className="bg-[#e9eef6] max-w-2xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto image-modal">
        {/* Modal content */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{albumName}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 cursor-pointer text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          <hr className="mb-4 text-stone-300" />
          <div className="flex flex-col gap-6">
            <div className="relative">
              <img
                className="aspect-auto:3/2 rounded-lg"
                loading="lazy"
                src={imageData.url}
                alt=""
              />

              {user._id === albumOwner && (
                <Favorite imageData={imageData} setRefetch={setRefetch} />
              )}
            </div>
            <div className="flex-1">
              {user._id === albumOwner && (
                <div className="flex gap-2 items-center">
                  <a
                    href={imageData.url}
                    download
                    target="_blank"
                    className="flex-1 flex justify-center items-center gap-2 text-center px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-full cursor-pointer"
                  >
                    <MdFileDownload className="text-xl" />
                    Download
                  </a>

                  <button
                    onClick={() => setShowDelete(true)}
                    className="flex-1 flex justify-center items-center gap-2 text-center px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-full cursor-pointer"
                  >
                    <MdDeleteForever className="text-xl" />
                    Delete
                  </button>
                  <DeleteImage
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                    albumId={imageData.albumId}
                    imageId={imageData._id}
                  />
                </div>
              )}

              <hr className="mt-8 mb-2 text-stone-300" />

              <div className="py-5">
                <p className="text-lg font-medium">Details</p>

                <div className="flex items-start gap-3 mt-4">
                  <MdCalendarMonth className="flex-1/10 text-2xl mt-1" />
                  <div className="flex-9/10 flex flex-col gap-2 justify-between items-start">
                    <p>
                      {new Date(imageData.uploadedAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm">
                      {new Date(imageData.uploadedAt).toLocaleString("en-IN", {
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-6">
                  <MdOutlinePhoto className="flex-1/10 text-2xl" />
                  <div className="flex-9/10 flex flex-col gap-2 justify-between items-start">
                    <p>{imageData.name}</p>
                  </div>
                </div>

                {imageData.tags?.length !== 0 && (
                  <div className="flex items-center gap-3 mt-6">
                    <FaTags className="flex-1/10 text-lg" />
                    <div className="flex-9/10 flex gap-2 items-start">
                      {imageData.tags?.map((tag) => (
                        <span className="bg-blue-300 px-2 py-1 rounded-sm">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {user._id === albumOwner && (
            <>
              <hr className="mt-8 mb-2 text-stone-300" />

              <div className="mt-6">
                <CommentsSection imageData={imageData} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

{
  /* <p className="text-sm fw-semibold">Comments</p>
            <textarea
              className="w-2/3 bg-white mt-4 border-1 outline-none rounded-sm"
              name=""
              id=""
            ></textarea> */
}
