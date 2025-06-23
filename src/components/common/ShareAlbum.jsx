import { FaPlus, FaTimes } from "react-icons/fa";
import useFetchAlbum from "../../hooks/useFetchAlbum";
import { useEffect, useState } from "react";
import { albumsAPI } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";

function ShareAlbum({ isOpen, setIsOpen, albumId }) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const { album, albumLoading, albumError, setRefetch } =
    useFetchAlbum(albumId);

  const [newUser, setNewUser] = useState("");
  const [message, setMessage] = useState({
    show: false,
    content: "",
    isError: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage((prev) => ({
      ...prev,
      show: false,
      content: "",
      isError: false,
    }));

    if (regex.test(newUser)) {
      try {
        const response = await albumsAPI.shareAlbum(albumId, {
          email: newUser,
        });

        if (response.status === 200) {
          setRefetch(true);
        }
      } catch (error) {
        if (error?.response?.status === 400) {
          setMessage((prev) => ({
            ...prev,
            show: true,
            content: error.response.data.message,
            isError: true,
          }));
        }
      }

      console.log("Valid Email Address!");
    } else {
      setMessage((prev) => ({
        ...prev,
        show: true,
        content: "Invalid Email Address!",
        isError: true,
      }));
    }
  };


  const handleDeleteUser = async (emailId) => {
    try {
      const response = await albumsAPI.unshareAlbum(albumId, {email: emailId});

      if (response.status === 200) {
        setRefetch(true);
        toast.success("Removed user successfully");
      }
    } catch (error) {
      const errmessage = error.response.data.message;
      toast.error(errmessage);
    }
  };


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#e9eef6] w-full max-w-md p-6 rounded-xl shadow-lg relative">
            <div>
              <h1 className="text-xl font-medium mb-4">Share Album</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-8 text-gray-500 hover:text-gray-700 cursor-pointer text-2xl font-bold"
              >
                &times;
              </button>
              <hr className="text-gray-300 mb-4" />
            </div>

            {/* Modal content */}
            <div className="flex flex-col space-y-4">
              {/* Add User Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-start space-y-4"
              >
                <p className="font-semibold">Add User</p>
                <input
                  onChange={(e) => setNewUser(e.target.value)}
                  className="w-full h-10 bg-white border border-gray-300 rounded-sm outline-none p-2 text-sm focus:ring-2 focus:ring-blue-700 caret-blue-700"
                  type="text"
                />

                {message?.show && (
                  <p
                    className={`w-full px-4 py-2 ${
                      message.isError
                        ? "bg-rose-100 text-rose-600"
                        : "bg-emerald-100 text-emerald-500"
                    } rounded-sm`}
                  >
                    {message.content}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg cursor-pointer hover:bg-emerald-700"
                >
                  <FaPlus /> Add
                </button>
              </form>

              <hr className="text-gray-300" />

              {/* Shared Users */}
              <p className="font-semibold">Shared Users</p>
              <div className="flex flex-col-reverse">
                {album?.sharedUsers &&
                  album.sharedUsers?.map((user) => (
                    <div className="flex justify-between items-center p-3 hover:bg-gray-200 rounded-sm cursor-pointer">
                      <div>{user}</div>
                      <FaTimes
                        onClick={() => handleDeleteUser(user)}
                        className="p-1 text-2xl text-red-600 rounded-sm hover:bg-red-200 cursor-pointer"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      )}
    </>
  );
}

export default ShareAlbum;
