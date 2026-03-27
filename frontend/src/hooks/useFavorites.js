import { useState, useEffect } from "react";
import apiClient from "../services/api";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/favorites");
      setFavorites(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch favorites");
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (propertyId) => {
    try {
      const response = await apiClient.post(`/favorites/${propertyId}`);
      setFavorites(response.data.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add favorite");
      return false;
    }
  };

  const removeFavorite = async (propertyId) => {
    try {
      const response = await apiClient.delete(`/favorites/${propertyId}`);
      setFavorites(response.data.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove favorite");
      return false;
    }
  };

  const isFavorited = (propertyId) => {
    return favorites.some((fav) => fav._id === propertyId);
  };

  return {
    favorites,
    isLoading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    isFavorited,
  };
};

export default useFavorites;
