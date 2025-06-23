import { useState } from "react";
import { albumsAPI } from "../../api/api";

const RenameModal = ({
  isOpen,
  setIsOpen,
  albumId,
  albumName,
  setShowMore,
}) => {
  const [name, setName] = useState(albumName);

  const handleRename = async () => {
    try {
      const response = await albumsAPI.editAlbum(albumId, { name });
      if (response.status === 200) {
        window.location.reload();
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowMore(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#e9eef6] w-full max-w-md p-6 rounded-xl shadow-lg relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-8 text-gray-500 hover:text-gray-700 cursor-pointer text-2xl font-bold"
            >
              &times;
            </button>

            {/* Modal content */}
            <h2 className="text-xl font-semibold mb-4">Rename Album</h2>
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-200 p-4 text-black rounded-t-lg border-b hover:bg-stone-300 focus:border-b-2 focus:border-[#0b57d0] outline-none"
              type="text"
              name=""
              id=""
              value={name}
            />

            {/* Action buttons */}
            <div className="flex justify-end space-x-3 mt-6 text-sm font-semibold">
              <button
                onClick={handleClose}
                className="px-4 py-2  text-[#0b57d0] hover:bg-[#0b57d017] cursor-pointer  rounded-full "
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                className="px-4 py-2  text-[#0b57d0] hover:bg-[#0b57d017] cursor-pointer  rounded-full "
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RenameModal;
