import { albumsAPI } from "../../api/api";

export default function ModalExample({
  isOpen,
  setIsOpen,
  albumId,
  setShowMore,
}) {
  const handleDelete = async () => {
    try {
      const response = await albumsAPI.deleteAlbum(albumId);
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
            <h2 className="text-xl font-semibold mb-4">Delete Album?</h2>
            <p className="text-gray-600 mb-6">
              Deleting an album is permanent. Photos and videos that were in a
              deleted album remain in ChitraShaala.
            </p>

            {/* Action buttons */}
            <div className="flex justify-end space-x-3 text-sm font-semibold">
              <button
                onClick={handleClose}
                className="px-4 py-2  text-[#0b57d0] hover:bg-[#0b57d017] cursor-pointer  rounded-full "
              >
                Keep Album
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2  text-[#0b57d0] hover:bg-[#0b57d017] cursor-pointer  rounded-full "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
