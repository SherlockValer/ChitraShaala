import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { albumsAPI } from "../api/api";

const useFetchAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [sharedAlbums, setSharedAlbums] = useState([]);
  const [albumsLoading, setLoading] = useState(false);
  const [albumsError, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchAlbums() {
    try {
      setLoading(true);
      const response = await albumsAPI.getAlbums();
      setAlbums(response?.data?.myAlbums);
      setSharedAlbums(response?.data?.sharedAlbums);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      setError(error.response?.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlbums();
  }, []);

  return { albums, sharedAlbums, albumsLoading, albumsError };
};

export default useFetchAlbums;
