import { Heart, MapPin, Bed, Bath, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PropertyCard = ({ property, isFavorited, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0].url}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>No image available</span>
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full capitalize">
            {property.type}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(property._id)}
          className={`absolute top-4 left-4 p-2 rounded-full transition-all ${
            isFavorited
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-600 hover:text-red-600'
          }`}
        >
          <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
          <MapPin size={16} />
          <span className="line-clamp-1">
            {property.location.city}, {property.location.state}
          </span>
        </div>

        {/* Features */}
        <div className="flex justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{property.features.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{property.features.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 size={16} />
            <span>{property.features.squareFeet.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              ${property.price.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/properties/${property._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;