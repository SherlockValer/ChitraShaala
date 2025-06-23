import React from "react";
import { useAuth } from "../../context/AuthContext";
import { MdLogout } from "react-icons/md";
import styles from "../styles/logout.module.css";
import { useNavigate } from "react-router-dom";

const ProfileSection = ({ setIsOpen }) => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="absolute z-1000 top-15 right-0 flex flex-col justify-center items-center gap-4 py-4 px-10 text-sm bg-[#e9eef6] border border-gray-300 rounded-xl shadow-lg">
      <img
        className="w-8 rounded-full"
        src={`http://placehold.co/200?text=${user.email[0].toUpperCase()}`}
        alt=""
      />
      <p>{user.email}</p>
      <div
        onClick={() => handleLogout()}
        className="flex justify-between items-center bg-white text-[#0b57d0] hover:bg-[#0b57d017] shadow-sm gap-2 py-2 px-6 rounded-full cursor-pointer transition-all duration-100 ease-in-out"
      >
        {loading ? <div className={styles.loader}></div> : <MdLogout />}
        Logout
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 text-xl px-2 hover:bg-gray-300 rounded-full cursor-pointer"
      >
        &times;
      </button>
    </div>
  );
};

export default ProfileSection;
