import { useEffect, useState } from "react";
import { imageAPI } from "../../api/api";

const DeleteImage = ({ showDelete, setShowDelete, albumId, imageId }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    setSuccess(false);
    setError(false);
    try {
      const response = await imageAPI.deleteImage(albumId, imageId);
      if (response.status === 200) {
        setSuccess(true);
        window.location.reload();
      }
    } catch (error) {
      setError(true);
      console.error(error.response?.data);
    }
  };

  useEffect(() => {
    setSuccess(false);
    setError(false);
  }, []);

  return (
    <>
      {showDelete && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
          <div className="bg-[#e9eef6] w-full max-w-md p-6 rounded-xl shadow-lg relative">
            {/* Close button */}
            <button
              onClick={() => setShowDelete(false)}
              className="absolute top-4 right-8 text-gray-500 hover:text-gray-700 cursor-pointer text-2xl font-bold"
            >
              &times;
            </button>

            {/* Modal content */}
            <h2 className="text-xl font-semibold mb-4">Delete Image</h2>
            <p className="pb-4 text-lg italic">
              Are you sure you want to permanently delete this image?
            </p>

            <div>
              {success && !error && (
                <p className="py-2 px-4 my-2 text-sm border text-emerald-600 border-emerald-600 bg-emerald-100 rounded-lg">
                  Image deleted successfully.
                </p>
              )}
              {error && !success && (
                <p className="py-2 px-4 my-2 text-sm border text-rose-600 border-rose-600 bg-rose-100 rounded-lg">
                  Error deleting file
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-3 mt-6 text-sm font-semibold">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2  text-[#0b57d0] hover:bg-[#0b57d017] cursor-pointer  rounded-full "
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2  text-[#d43418] hover:bg-[#d0290b17] cursor-pointer  rounded-full "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteImage;
