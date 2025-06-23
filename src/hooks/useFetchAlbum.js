import { useEffect, useState } from "react";
import { albumsAPI } from "../api/api";

const useFetchAlbum = (albumId) => {
  const [album, setAlbum] = useState({});
  const [albumLoading, setLoading] = useState(false);
  const [albumError, setError] = useState(null);

  const [refetch, setRefetch] = useState(false);

  async function fetchAlbum() {
    setLoading(true);
    setError(null);
    try {
      const response = await albumsAPI.getAlbum(albumId);
      if (response.status === 200) {
        setAlbum(response.data?.album);
      }
    } catch (error) {
      setAlbum({});
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlbum();
    setRefetch(false);
  }, [refetch]);

  return { album, albumLoading, albumError, setRefetch };
};

export default useFetchAlbum;
