import { useRef, useState } from "react";
import { MdAttachFile, MdFileUpload } from "react-icons/md";
import { imageAPI } from "../../api/api";
import TagsInput from "./TagsInput.jsx";

const UploadImage = ({ setIsOpen, albumId }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fail, setFail] = useState(false);

  const [tags, setTags] = useState([]);
  const [person, setPerson] = useState(null);
  const [isFavorite, setFavorite] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif"
    ) {
      setFileName("Only .jpg, .jpeg, .png, .gif formats are allowed.");
      setError(true);
      setImage(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFileName("File must be smaller than 2MB.");
      setError(true);
      setImage(null);
      return;
    }

    setImage(file);
    setError(false);
    setFileName(file ? file.name : "No file chosen");
  };

  const handleUpload = async () => {
    if (!image) {
      setError(true);
      setFileName("Please select a file first!");
      return;
    }

    setFail(false);
    setUploaded(false);
    setUploading(true);

    const formData = new FormData();
    formData.append("image", image); // "image" is the key your backend expects

    if (tags.length !== 0) {
      tags.forEach((tag) => formData.append("tags[]", tag))
    }

    if (person) {
      formData.append("person", person);
    }

    try {
      const response = await imageAPI.uploadImage(albumId, formData);
      if (response.status === 200) {
        setUploading(false);
        setUploaded(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error uploading file:", error.response?.data);
      setUploading(false);
      setUploaded(false);
      setFail(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#e9eef6] w-full max-w-md p-6 rounded-xl shadow-lg relative">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-8 text-gray-500 hover:text-gray-700 cursor-pointer text-2xl font-bold"
        >
          &times;
        </button>

        {/* Modal content */}
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <div
          className={`flex flex-col items-center border border-dashed ${
            error ? "border-rose-700" : "border-blue-700"
          }  rounded-lg text-center`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".png, .jpg, .jpeg, .gif"
            hidden
          />
          <p
            className={`w-full pt-6 pb-1 px-2 ${
              error ? "text-rose-700" : "text-gray-600"
            } break-all`}
          >
            {fileName}
          </p>
          <span className="text-xs text-gray-500 py-3">
            Supported formats: .jpg, .jpeg, .png, .gif
          </span>
          <button
            onClick={handleButtonClick}
            className="flex items-center gap-2 text-sm bg-blue-800 text-white py-2 px-4 rounded-lg cursor-pointer"
          >
            <MdFileUpload className="text-lg" />
            Choose File
          </button>
          <span className="text-xs text-gray-500 pt-2 pb-3">
            Maximum size: 2MB
          </span>
        </div>

        {/* Tags Input */}
        <h4 className="mt-6">
          Tags <span className="text-gray-500">(if any)</span>
        </h4>
        <TagsInput tags={tags} setTags={setTags} />

        {/* Person */}
        <div className="w-full">
          <h4>
            Person <span className="text-gray-500">(if any)</span>
          </h4>
          <input
            onChange={(e) => setPerson(e.target.value)}
            className="w-full outline-none bg-white p-2 my-4 rounded-sm"
            type="text"
            placeholder="Name of the person in the image"
          />
        </div>

        <div>
          {uploading && (
            <p className="py-2 px-4 my-2 text-sm border text-[#0b57d0] border-[#0b57d0] bg-[#0b57d017] rounded-lg">
              Uploading Image...
            </p>
          )}
          {uploaded && (
            <p className="py-2 px-4 my-2 text-sm border text-emerald-600 border-emerald-600 bg-emerald-100 rounded-lg">
              File uploaded successfully
            </p>
          )}
          {fail && (
            <p className="py-2 px-4 my-2 text-sm border text-rose-600 border-rose-600 bg-rose-100 rounded-lg">
              Error uploading file
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-3 mt-6 text-sm font-semibold">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2  text-[#0b57d0] hover:bg-[#0b57d017] cursor-pointer  rounded-full "
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2  text-[#0b57d0] hover:bg-[#0b57d017] cursor-pointer  rounded-full "
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
