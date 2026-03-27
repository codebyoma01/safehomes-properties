import { useState, useEffect } from "react";
import apiClient from "../services/api";

const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1,
  });

  const fetchProperties = async (filters = {}, page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page,
        limit: 12,
        ...filters,
      });

      const response = await apiClient.get(`/properties?${params}`);
      setProperties(response.data.data);
      setPagination({
        total: response.data.total,
        pages: response.data.pages,
        currentPage: page,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch properties");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPropertyById = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/properties/${id}`);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch property");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    properties,
    isLoading,
    error,
    pagination,
    fetchProperties,
    fetchPropertyById,
  };
};

export default useProperties;
