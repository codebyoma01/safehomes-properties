import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FilterPanel = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 md:mb-0">
      <div
        className="flex justify-between items-center cursor-pointer mb-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <ChevronDown
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </div>

      {isOpen && (
        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">Under $100K</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">$100K - $300K</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">$300K - $500K</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">$500K+</span>
              </label>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Bedrooms</h4>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-600">{num}+ Beds</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Amenities</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">Swimming Pool</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">Garden</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">Garage</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;