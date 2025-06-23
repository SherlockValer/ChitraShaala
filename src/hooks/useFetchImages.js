import { useEffect, useState } from "react";
import { imageAPI } from "../api/api";

const useFetchImages = (albumId) => {
  const [images, setImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [currFilter, setCurrFilter] = useState("all");

  const fetchImages = async () => {
    setImages([]);
    setImageLoading(true);
    try {
      if (currFilter === "all") {
        const response = await imageAPI.getImages(albumId);
        if (response.status === 200) {
          setImages(response.data?.images);
        }
      }

      if (currFilter === "favorites") {
        const response = await imageAPI.getFavImages(albumId);
        if (response.status === 200) {
          setImages(response.data?.favImages);
        }
      }
    } catch (error) {
      setImageError(error.response?.data);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [refetch, albumId, currFilter]);

  return {
    images,
    imageLoading,
    imageError,
    setRefetch,
    currFilter,
    setCurrFilter,
  };
};

export default useFetchImages;
