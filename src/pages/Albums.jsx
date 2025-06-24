import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { Link } from "react-router-dom";
import More from "../components/common/More";
import AlbumSort from "../components/common/AlbumSort";
import useFetchAlbums from "../hooks/useFetchAlbums";
import Loader from "../components/common/Loader";

const Albums = () => {
  const [currFilter, setCurrFilter] = useState("all");
  const [currSort, setCurrSort] = useState("mostRecent");
  const { albums, sharedAlbums, albumsLoading } = useFetchAlbums();

  const [filtered, setFiltered] = useState([]);

  const handleFilter = (input) => {
    setCurrFilter(input);
  };

  useEffect(() => {
    const data =
      currFilter === "all"
        ? [...albums, ...sharedAlbums]
        : currFilter === "my"
        ? [...albums]
        : [...sharedAlbums];

    if (currSort === "mostRecent") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFiltered(data);
    } else if (currSort === "lastMod") {
      data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setFiltered(data);
    } else if (currSort === "title") {
      data.sort((a, b) => a.name.localeCompare(b.name));
      setFiltered(data);
    }

    setFiltered(data);
  }, [albums, sharedAlbums, currFilter, currSort]);

  return (
    <div className="px-4">
      <div className="py-4 flex items-center justify-between">
        <h2 className="text-2xl">Albums</h2>
        <div className="flex items-center relative justify-between">
          {/* Create Album */}
          <Link to="/create-album">
            <div className="flex gap-2 items-center justify-between py-2 px-4 rounded-full hover:bg-zinc-200 cursor-pointer">
              <MdOutlineAddBox className="text-lg" />
              <span>Create Album</span>
            </div>
          </Link>
          {/* Album Sort */}
          <AlbumSort currSort={currSort} setCurrSort={setCurrSort} />
        </div>
      </div>
      <hr />

      {/* Filter */}
      <div className="flex justify-start items-center  mt-4 text-sm font-medium">
        <div
          onClick={() => handleFilter("all")}
          className={`flex justify-start items-center gap-2 py-2 px-4 mr-2 border rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
            currFilter === "all"
              ? "bg-[#c2e7ff] border-0"
              : "bg-white hover:bg-zinc-100"
          }`}
        >
          <MdOutlineCheck
            className={`text-lg transition-all duration-200 ease-in-out ${
              currFilter === "all" ? "" : "hidden"
            }`}
          />
          All
        </div>
        <div
          onClick={() => handleFilter("my")}
          className={`flex justify-start items-center gap-2 py-2 px-4 mr-2 border rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
            currFilter === "my"
              ? "bg-[#c2e7ff] border-0"
              : "bg-white hover:bg-zinc-100"
          }`}
        >
          <MdOutlineCheck
            className={`text-lg transition-all duration-200 ease-in-out ${
              currFilter === "my" ? "" : "hidden"
            }`}
          />
          My Albums
        </div>

        <div
          onClick={() => handleFilter("shared")}
          className={`flex justify-start items-center gap-2 py-2 px-4 mr-2 border rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
            currFilter === "shared"
              ? "bg-[#c2e7ff] border-0"
              : "bg-white hover:bg-zinc-100"
          }`}
        >
          <MdOutlineCheck
            className={`text-lg transition-all duration-200 ease-in-out ${
              currFilter === "shared" ? "" : "hidden"
            }`}
          />
          Shared with me
        </div>
      </div>

      {/* Albums */}
      <div className="flex gap-4 flex-wrap items-center py-5">
        {filtered?.length !== 0 &&
          filtered?.map((album) => (
            <Link
              key={album._id}
              to={`/${album._id}`}
              state={{
                name: album.name,
                description: album.description,
                sharedUsers: album.sharedUsers,
                ownerId: album.ownerId
              }}
            >
              <div className="relative">
                <div
                  key={album._id}
                  className="w-40 flex justify-between items-center border py-2 pl-4 pr-1 rounded-lg cursor-pointer"
                >
                  <p className="text-sm text-black">{album.name}</p>
                  <More album={album} />
                </div>
              </div>
            </Link>
          ))}
      </div>
      {albumsLoading && (
        <div className="h-64">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Albums;

// Legacy Code
// if (currFilter === "all") {
//   const data = [...albums, ...sharedAlbums];
//   const sorted = data.sort((a, b) => a.createdAt - b.createdAt);
//   setFiltered(sorted);
// }

// if (currFilter === "my") {
//   setFiltered(albums);
// }

// if (currFilter === "shared") {
//   setFiltered(sharedAlbums);
// }
