import { useEffect, useState } from 'react';
import useProperties from '../hooks/useProperties';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import useFavorites from '../hooks/useFavorites';
import useAuth from '../hooks/useAuth';

const Properties = () => {
  const { properties, fetchProperties, isLoading, pagination } = useProperties();
  const { favorites, fetchFavorites, addFavorite, removeFavorite } = useFavorites();
  const { user } = useAuth();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchProperties(filters, pagination.currentPage || 1);
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    fetchProperties(newFilters, 1);
  };

  const toggleFavorite = async (propertyId) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (favorites.some((fav) => fav._id === propertyId)) {
      await removeFavorite(propertyId);
    } else {
      await addFavorite(propertyId);
    }
  };

  const isFavorited = (propertyId) => {
    return favorites.some((fav) => fav._id === propertyId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Properties</h1>
      <SearchBar onSearch={handleSearch} />

      {isLoading ? (
        <Loader />
      ) : properties.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isFavorited={isFavorited(property._id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {[...Array(pagination.pages)].map((_, num) => (
              <button
                key={num}
                onClick={() => fetchProperties(filters, num + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  pagination.currentPage === num + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Properties;