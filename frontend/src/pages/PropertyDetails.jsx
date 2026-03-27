import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProperties from '../hooks/useProperties';
import Loader from '../components/Loader';
import { MapPin, Bed, Bath, Maximize2, Phone, Mail, Heart } from 'lucide-react';
import useFavorites from '../hooks/useFavorites';
import useAuth from '../hooks/useAuth';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPropertyById, isLoading } = useProperties();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const getProperty = async () => {
      const data = await fetchPropertyById(id);
      setProperty(data);
    };
    getProperty();
  }, [id]);

  const toggleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isFavorited()) {
      await removeFavorite(id);
    } else {
      await addFavorite(id);
    }
  };

  const isFavorited = () => {
    return favorites.some((fav) => fav._id === id);
  };

  if (isLoading || !property) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Image Gallery */}
      <div className="mb-8">
        {property.images && property.images.length > 0 ? (
          <div>
            <div className="relative mb-4">
              <img
                src={property.images[imageIndex].url}
                alt={property.images[imageIndex].caption || `Photo ${imageIndex + 1}`}
                className="w-full h-96 object-cover rounded-xl"
              />
              <button
                onClick={() => toggleFavorite()}
                className={`absolute top-4 right-4 p-3 rounded-full ${
                  isFavorited()
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-600 hover:text-red-600'
                } shadow-lg transition`}
              >
                <Heart size={24} fill={isFavorited() ? 'currentColor' : 'none'} />
              </button>
            </div>

            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`border-2 rounded-lg overflow-hidden transition ${
                      imageIndex === idx ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 h-96 rounded-xl flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{property.title}</h1>

          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin size={20} />
            <span>
              {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
            </span>
          </div>

          <p className="text-4xl font-bold text-blue-600 mb-6">
            ${property.price.toLocaleString()}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bed size={20} className="text-blue-600" />
                <span className="font-bold">{property.features.bedrooms}</span>
              </div>
              <p className="text-sm text-gray-600">Bedrooms</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bath size={20} className="text-blue-600" />
                <span className="font-bold">{property.features.bathrooms}</span>
              </div>
              <p className="text-sm text-gray-600">Bathrooms</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Maximize2 size={20} className="text-blue-600" />
                <span className="font-bold">{property.features.squareFeet.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600">Sq Ft</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-blue-600">{property.features.yearBuilt}</span>
              </div>
              <p className="text-sm text-gray-600">Year Built</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About This Property</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{property.description}</p>

            {/* Amenities */}
            <h3 className="text-xl font-bold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={property.features.hasPool} readOnly />
                <span>Swimming Pool</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={property.features.hasGarden} readOnly />
                <span>Garden</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={property.features.parking > 0} readOnly />
                <span>Parking ({property.features.parking})</span>
              </label>
            </div>
          </div>
        </div>

        {/* Agent Contact Card */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
            <h3 className="text-2xl font-bold mb-4">Contact Agent</h3>

            {property.agent && (
              <>
                {property.agent.profileImage && (
                  <img
                    src={property.agent.profileImage}
                    alt={property.agent.name}
                    className="w-20 h-20 rounded-full mb-4 mx-auto"
                  />
                )}

                <h4 className="text-xl font-bold text-center mb-2">
                  {property.agent.name}
                </h4>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a href={`tel:${property.agent.phone}`} className="font-semibold text-blue-600 hover:underline">
                        {property.agent.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a href={`mailto:${property.agent.email}`} className="font-semibold text-blue-600 hover:underline">
                        {property.agent.email}
                      </a>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold mb-2">
                  Schedule Tour
                </button>

                <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 font-semibold">
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;