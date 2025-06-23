import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { FcApproval, FcHighPriority } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { albumsAPI } from "../api/api";

const CreateAlbum = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleTitle = (e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleDescription = (e) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await albumsAPI.createAlbum(formData);
      if (response.status === 201) {
        setSaving(false);
        setSuccess(true);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (err) {
      setSaving(false);
      const errorMsg =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(errorMsg);
    }
  };

  return (
    <div className="p-2">
      <Link to="/" className="text-xl">
        <MdArrowBack />
      </Link>
      <h1 className="text-2xl mt-4">Create Album</h1>
      <form onSubmit={handleForm} className="max-w-sm space-y-3">
        <input
          onChange={handleTitle}
          type="text"
          className="w-100 outline-none pt-6 border-b-1 focus:border-b-2 focus:border-[#0b57d0] transition-all duration-75 ease-in-out placeholder:text-lg "
          placeholder="Add a title"
          required
        />
        <input
          onChange={handleDescription}
          type="text"
          className="w-100 outline-none pt-6 border-b-1 focus:border-b-2 focus:border-[#0b57d0] transition-all duration-75 ease-in-out placeholder:text-lg "
          placeholder="Add a description"
        />

        <input
          className="px-2 py-1 mt-4 bg-blue-700 text-white cursor-pointer rounded-sm"
          type="submit"
          value="create"
        />
      </form>
      {saving && <p className="mt-3 text-blue-500">creating new album......</p>}

      {success && (
        <p className="mt-3 flex items-center gap-2">
          <FcApproval className="text-xl" /> Done
        </p>
      )}
      {error && (
        <p className="mt-3 flex items-center gap-2">
          <FcHighPriority className="text-xl" /> {error}
        </p>
      )}
    </div>
  );
};

export default CreateAlbum;
