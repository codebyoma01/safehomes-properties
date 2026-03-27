import { useEffect } from 'react';
import useFavorites from '../hooks/useFavorites';
import useAuth from '../hooks/useAuth';
import PropertyCard from '../components/PropertyCard';
import Loader from '../components/Loader';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { favorites, fetchFavorites, isLoading, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const toggleFavorite = async (propertyId) => {
    if (favorites.some((fav) => fav._id === propertyId)) {
      await removeFavorite(propertyId);
    } else {
      await addFavorite(propertyId);
    }
  };

  const isFavorited = (propertyId) => {
    return favorites.some((fav) => fav._id === propertyId);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Profile Info */}
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center mb-12 gap-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
          {user?.name?.[0] || 'U'}
        </div>
        <div>
          <h2 className="text-3xl font-bold">{user?.name}</h2>
          <p className="text-gray-600 text-lg">{user?.email}</p>
          <p className="text-sm text-gray-500 mt-2">
            Member since {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Saved Properties */}
      <div>
        <h2 className="text-3xl font-bold mb-8">
          Saved Properties ({favorites.length})
        </h2>

        {isLoading ? (
          <Loader />
        ) : favorites.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isFavorited={isFavorited(property._id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              You haven't saved any properties yet.
            </p>
            <p className="text-gray-500">
              Browse properties and click the heart icon to save them to your favorites.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;