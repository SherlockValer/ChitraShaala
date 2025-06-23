import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { imageAPI } from "../../api/api";
import { useEffect, useState } from "react";

const Favorite = ({ imageData, setRefetch }) => {
  const { _id: imageId, albumId, isFavorite } = imageData;

  const [fav, setFav] = useState(isFavorite);

  const handleClick = async (bool) => {
    try {
      const response = await imageAPI.starImage(albumId, imageId, {
        isFavorite: bool,
      });

      if (response.status === 200) {
        setFav(bool);
        setRefetch((state) => !state);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    setFav(isFavorite);
  }, [isFavorite]);

  return (
    <span className="absolute top-4 right-4">
      {fav ? (
        <MdFavorite
          onClick={() => handleClick(false)}
          className="text-red-600 cursor-pointer"
        />
      ) : (
        <MdFavoriteBorder
          onClick={() => handleClick(true)}
          className=" text-white rounded-full cursor-pointer"
        />
      )}
    </span>
  );
};

export default Favorite;
