import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

const InsuranceCard = ({ insurance }) => {
  const history = useHistory();

  const handleContactNow = () => {
    // Navigate to contact page or open contact modal
    history.push("/contact-us");
  };

  const handleVisitShop = () => {
    // Navigate to the main shop page
    history.push("/");
  };

  const getInsuranceTypeColor = (type) => {
    const colors = {
      Health: "bg-green-100 text-green-800",
      Life: "bg-blue-100 text-blue-800",
      Auto: "bg-red-100 text-red-800",
      Home: "bg-yellow-100 text-yellow-800",
      Travel: "bg-purple-100 text-purple-800",
      Business: "bg-indigo-100 text-indigo-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[type] || colors.Other;
  };

  const getDurationColor = (duration) => {
    const colors = {
      Monthly: "bg-orange-100 text-orange-800",
      Quarterly: "bg-teal-100 text-teal-800",
      "Semi-Annual": "bg-cyan-100 text-cyan-800",
      Annual: "bg-emerald-100 text-emerald-800",
      "One-time": "bg-pink-100 text-pink-800",
    };
    return colors[duration] || colors.Annual;
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        {/* Insurance Images */}
        <div className="relative h-56 bg-gradient-to-br from-blue-50 to-blue-100">
          {insurance.images && insurance.images.length > 0 ? (
            <div className="flex h-full">
              {insurance.images.slice(0, 2).map((image, index) => (
                <div
                  key={index}
                  className={`${
                    insurance.images.length === 1 ? "w-full" : "w-1/2"
                  } h-full`}
                >
                  <img
                    src={`${apiURL}/uploads/insurances/${image}`}
                    alt={`${insurance.insuranceName} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg
                className="w-20 h-20 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Insurance Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Insurance Type Badge */}
          <div className="flex justify-start items-center mb-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getInsuranceTypeColor(insurance.insuranceType)}`}>
              {insurance.insuranceType}
            </span>
          </div>

          {/* Insurance Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {insurance.insuranceName}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 leading-relaxed">
            {insurance.description.length > 100
              ? insurance.description.slice(0, 100) + "..."
              : insurance.description}
          </p>

          {/* Coverage */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Coverage:</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {insurance.coverage.length > 80
                ? insurance.coverage.slice(0, 80) + "..."
                : insurance.coverage}
            </p>
          </div>

          {/* Features */}
          {insurance.features && insurance.features.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {insurance.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-3 h-3 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
                {insurance.features.length > 3 && (
                  <li className="text-xs text-gray-500 ml-5">
                    +{insurance.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Price and Duration Section */}
          <div className="mb-6 mt-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  ${insurance.price}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  per {insurance.duration.toLowerCase()}
                </span>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDurationColor(insurance.duration)}`}>
                {insurance.duration}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleContactNow}
              className="py-3 px-4 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl"
            >
              Contact Now
            </button>
            <button
              onClick={handleVisitShop}
              className="py-3 px-4 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 shadow-lg hover:shadow-xl"
            >
              Visit Shop
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InsuranceCard;
