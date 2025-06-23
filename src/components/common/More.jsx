import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import RenameModal from "./RenameModal";
import { useAuth } from "../../context/AuthContext.jsx";
import ShareAlbum from "./ShareAlbum.jsx";

const More = ({ album }) => {
  const { user } = useAuth();
  const [showMore, setShowMore] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showShareAlbum, setShowShareAlbum] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const handleMoreDiv = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div onClick={handleMoreDiv}>
      <MdMoreVert
        onClick={() => setShowMore((show) => !show)}
        className="text-lg rounded-full hover:bg-gray-200"
      />
      {user._id === album.ownerId && (
        <>
          {showMore && (
            <div className="flex flex-col absolute top-8 z-10 right-2 py-4 border border-slate-300 bg-[#f0f4f9] shadow-sm rounded-sm">
              <p
                onClick={() => setShowRenameModal(true)}
                className="px-3 py-2 hover:bg-gray-300 cursor-pointer"
              >
                Rename Album
              </p>
              <p
                className="px-3 py-2 hover:bg-gray-300 cursor-pointer"
                onClick={() => setShowShareAlbum(true)}
              >
                Share Album
              </p>
              <p
                onClick={() => setShowDelModal(true)}
                className="px-3 py-2 hover:bg-gray-300 cursor-pointer"
              >
                Delete Album
              </p>
            </div>
          )}

          {showDelModal && (
            <DeleteModal
              isOpen={showDelModal}
              setIsOpen={setShowDelModal}
              albumId={album._id}
              setShowMore={setShowMore}
            />
          )}

          {showShareAlbum && (
            <ShareAlbum
              isOpen={showShareAlbum}
              setIsOpen={setShowShareAlbum}
              albumId={album._id}
              sharedUsers={album.sharedUsers}
            />
          )}

          {showRenameModal && (
            <RenameModal
              isOpen={showRenameModal}
              setIsOpen={setShowRenameModal}
              albumId={album._id}
              albumName={album.name}
              setShowMore={setShowMore}
            />
          )}
        </>
      )}
    </div>
  );
};

export default More;
