import { useState } from "react";
import { MdImportExport, MdOutlineCheck } from "react-icons/md";

const AlbumSort = ({ currSort, setCurrSort }) => {
  const [showSort, setShowSort] = useState(false);

  const handleSort = (sort) => {
    setCurrSort(sort);
    setShowSort(false);
  };

  return (
    <>
      <div
        onClick={() => setShowSort((show) => !show)}
        className="flex gap-2 items-center justify-between py-2 px-4 rounded-full hover:bg-zinc-200 cursor-pointer"
      >
        <MdImportExport className="text-lg" />
        <span>
          {currSort === "mostRecent"
            ? "Most Recent Photo"
            : currSort === "lastMod"
            ? "Last Modified"
            : "Album Title"}
        </span>
      </div>
      {showSort && (
        <div className="flex flex-col absolute top-10 z-10 right-0 py-4 border border-slate-300 bg-[#f0f4f9] shadow-sm rounded-sm">
          <p
            onClick={() => handleSort("mostRecent")}
            className={`flex items-center gap-2 px-3 py-2 ${
              currSort === "mostRecent"
                ? "bg-[#c2e7ff] hover:bg-[#a9cde6]"
                : "hover:bg-gray-300"
            }   cursor-pointer`}
          >
            <MdOutlineCheck
              className={`text-lg transition-all duration-200 ease-in-out ${
                currSort === "mostRecent" ? "" : "hidden"
              }`}
            />
            <span>Most Recent Photo</span>
          </p>
          <p
            onClick={() => handleSort("lastMod")}
            className={`flex items-center gap-2 px-3 py-2 ${
              currSort === "lastMod"
                ? "bg-[#c2e7ff] hover:bg-[#a9cde6]"
                : "hover:bg-gray-300"
            }   cursor-pointer`}
          >
            <MdOutlineCheck
              className={`text-lg transition-all duration-200 ease-in-out ${
                currSort === "lastMod" ? "" : "hidden"
              }`}
            />
            <span>Last Modified</span>
          </p>
          <p
            onClick={() => handleSort("title")}
            className={`flex items-center gap-2 px-3 py-2 ${
              currSort === "title"
                ? "bg-[#c2e7ff] hover:bg-[#a9cde6]"
                : "hover:bg-gray-300"
            }   cursor-pointer`}
          >
            <MdOutlineCheck
              className={`text-lg transition-all duration-200 ease-in-out ${
                currSort === "title" ? "" : "hidden"
              }`}
            />
            <span>Album Title</span>
          </p>
        </div>
      )}
    </>
  );
};

export default AlbumSort;
