import { MdAdd } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdApps } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import Logo from "../common/Logo";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import ProfileSection from "../common/ProfileSection";

const Header = () => {
  const { user } = useAuth();
  const [openProfile, setProfileOpen] = useState(false);

  return (
    <header className="flex justify-between items-center">
      <div className="w-1/5 flex justify-start  items-center text-2xl">
        <img className="w-20" src="/kavioPix.svg" alt="" />
        <Logo />
      </div>

      <div className="w-4/5 px-4 flex justify-between max-lg:justify-end">
        <div className="flex items-center gap-2 bg-[#e9eef9] p-3 rounded-full max-lg:hidden">
          <MdOutlineSearch className="text-2xl" />
          <input
            className="w-85 outline-0 placeholder:text-[#444746]"
            type="text"
            placeholder="Search your photos and albums"
          />
        </div>

        <div className="flex items-center gap-2 text-2xl">
          <div className="hover:bg-zinc-200 rounded-full p-1.5 cursor-pointer transition-all ease-in-out lg:hidden">
            <MdOutlineSearch />
          </div>

          <div className="hover:bg-zinc-200 rounded-full p-1.5 cursor-pointer transition-all ease-in-out">
            <MdHelpOutline />
          </div>

          <div className="hover:bg-zinc-200 rounded-full p-1.5 cursor-pointer transition-all ease-in-out">
            <MdOutlineSettings />
          </div>

          <div className="hover:bg-zinc-200 rounded-full p-1.5 cursor-pointer transition-all ease-in-out">
            <MdApps />
          </div>

          <div className="relative">
            <div
              onClick={() => setProfileOpen(true)}
              className="ring-2 ring-[#0b57d0] p-0.5 rounded-full cursor-pointer transition-all ease-in-out"
            >
              <img
                className="w-8 rounded-full"
                src={`http://placehold.co/200?text=${user.email[0].toUpperCase()}`}
                alt=""
              />
            </div>
            {openProfile && <ProfileSection setIsOpen={setProfileOpen} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
