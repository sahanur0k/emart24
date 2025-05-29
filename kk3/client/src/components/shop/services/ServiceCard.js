import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

const ServiceCard = ({ service }) => {
  const history = useHistory();

  const handleButtonClick = () => {
    if (service.serviceType === "Contact Now") {
      // For Contact Now services, you could navigate to a contact page or open a modal
      // For now, let's navigate to a contact page
      history.push("/contact");
    } else {
      // For Basic Shop services, navigate to the main shop page
      history.push("/");
    }
  };

  const getButtonText = () => {
    return service.serviceType === "Contact Now" ? "Contact Now" : "Visit Shop";
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        {/* Service Images */}
        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200">
          {service.images && service.images.length > 0 ? (
            <div className="flex h-full">
              {service.images.slice(0, 2).map((image, index) => (
                <div
                  key={index}
                  className={`${
                    service.images.length === 1 ? "w-full" : "w-1/2"
                  } h-full`}
                >
                  <img
                    src={`${apiURL}/uploads/services/${image}`}
                    alt={`${service.serviceName} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg
                className="w-20 h-20 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Service Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Service Type Badge */}
          <div className="flex justify-end mb-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              service.serviceType === "Contact Now"
                ? "text-blue-700 bg-blue-100"
                : "text-gray-700 bg-gray-100"
            }`}>
              {service.serviceType || "Basic Shop"}
            </span>
          </div>

          {/* Service Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {service.serviceName}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
            {service.description.length > 100
              ? service.description.slice(0, 100) + "..."
              : service.description}
          </p>

          {/* Price Section */}
          <div className="mb-6">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  ${service.price}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  starting at
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleButtonClick}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              service.serviceType === "Contact Now"
                ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl"
                : "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 shadow-lg hover:shadow-xl"
            }`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ServiceCard;
