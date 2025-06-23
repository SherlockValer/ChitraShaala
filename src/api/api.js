import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/v1`,
  withCredentials: true,
});

export const userAPI = {
  // get user details
  getUser: () => api.get("/me"),
  logoutUser: () => api.post("/logout"),
};

export const albumsAPI = {
  // get All Albums
  getAlbums: () => api.get("/albums"),

  // get one album
  getAlbum: (albumId) => api.get(`/albums/${albumId}`),

  // Create new album
  createAlbum: (album) => api.post("/albums", album),

  // Edit album
  editAlbum: (albumId, updateData) =>
    api.post(`/albums/${albumId}`, updateData),

  // Share album with users
  shareAlbum: (albumId, user) => api.post(`/albums/${albumId}/share`, user),

  // Unshare album
  unshareAlbum: (albumId, user) => api.post(`/albums/${albumId}/unshare`, user),

  // Delete album
  deleteAlbum: (albumId) => api.delete(`/albums/${albumId}`),
};

export const imageAPI = {
  // Get all images in current album
  getImages: (albumId) => api.get(`/albums/${albumId}/images`),

  // Get all favorite images from current album
  getFavImages: (albumId) => api.get(`/albums/${albumId}/images/favorites`),

  // Get images by tag
  getImagesByTag: (albumId, tag) =>
    api.get(`/albums/${albumId}/images`, { params: { tag } }),

  // Upload image to database
  uploadImage: (albumId, formData) =>
    api.post(`/albums/${albumId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // Make an image favorite
  starImage: (albumId, imageId, data) =>
    api.post(`/albums/${albumId}/images/${imageId}/favorite`, data),

  // Add comment to image
  addComment: (albumId, imageId, data) =>
    api.post(`/albums/${albumId}/images/${imageId}/comments`, data),

  // Delete image
  deleteImage: (albumId, imageId) =>
    api.delete(`/albums/${albumId}/images/${imageId}`),
};
