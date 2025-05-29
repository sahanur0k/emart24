import React, { Fragment, useContext, useEffect, useState } from "react";
import { ServicesContext } from "./index";
import { getAllServices } from "./FetchApi";
import ServiceCard from "./ServiceCard";

const AllServices = () => {
  const { data, dispatch } = useContext(ServicesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchServices = async () => {
    dispatch({ type: "setLoading", payload: true });
    const responseData = await getAllServices();
    if (responseData && responseData.services) {
      dispatch({ type: "fetchServices", payload: responseData.services });
      setFilteredServices(responseData.services);
    }
  };

  // Filter services based on search term
  useEffect(() => {
    if (!data.services) return;

    if (searchTerm.trim() === "") {
      setFilteredServices(data.services);
    } else {
      const filtered = data.services.filter(service =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.serviceType && service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, data.services]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (data.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading services...</div>
      </div>
    );
  }

  return (
    <Fragment>
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          All Services
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover our professional services tailored to meet your needs
        </p>

        {/* Search Bar - Centered */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search services by name, description, or type..."
              className="block w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 shadow-sm transition-all duration-200"
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="text-center mb-6">
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
              {filteredServices.length === 0
                ? `No services found for "${searchTerm}"`
                : `Found ${filteredServices.length} service${filteredServices.length !== 1 ? 's' : ''} for "${searchTerm}"`
              }
            </div>
          </div>
        )}
      </div>

      {/* Services Grid */}
      {filteredServices && filteredServices.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <svg
              className="w-20 h-20 text-gray-300 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              {searchTerm ? "No Services Found" : "No Services Available"}
            </h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              {searchTerm
                ? `No services match your search for "${searchTerm}". Try different keywords or browse all services.`
                : "No services are currently available. Please check back later."
              }
            </p>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AllServices;
