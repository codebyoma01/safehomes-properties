import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProperties from '../hooks/useProperties';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import useFavorites from '../hooks/useFavorites';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { properties, fetchProperties, isLoading } = useProperties();
  const { favorites, fetchFavorites, addFavorite, removeFavorite } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    fetchProperties({}, 1);
    if (user) {
      fetchFavorites();
    }
  }, [user]);

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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Easily search for the best properties, browse listings, and contact agents all in one place.
          </p>
          <Link
            to="/properties"
            className="inline-block px-8 py-3 bg-white text-blue-700 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition"
          >
            Browse Properties
          </Link>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto -mt-12 relative z-10 px-4">
        <SearchBar onSearch={fetchProperties} />
      </div>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
          Featured Properties
        </h2>
        {isLoading ? (
          <Loader />
        ) : properties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isFavorited={isFavorited(property._id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No properties found</p>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-blue-600 text-white rounded-xl py-12 px-6 text-center shadow-lg animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Ready to get started?
          </h3>
          <p className="mb-6 text-lg opacity-90">
            Register now to save your favorite properties and access exclusive features.
          </p>
          {!user ? (
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-bold shadow-lg hover:bg-blue-50 transition"
            >
              Register Now
            </Link>
          ) : (
            <Link
              to="/properties"
              className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-bold shadow-lg hover:bg-blue-50 transition"
            >
              Explore Properties
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;