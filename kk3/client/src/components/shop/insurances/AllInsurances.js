import React, { Fragment, useContext, useEffect, useState } from "react";
import { InsurancesContext } from "./index";
import { getAllInsurances } from "./FetchApi";
import InsuranceCard from "./InsuranceCard";

const AllInsurances = () => {
  const { data, dispatch } = useContext(InsurancesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInsurances, setFilteredInsurances] = useState([]);

  useEffect(() => {
    fetchInsurances();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchInsurances = async () => {
    dispatch({ type: "setLoading", payload: true });
    const responseData = await getAllInsurances();
    if (responseData && responseData.insurances) {
      dispatch({ type: "fetchInsurances", payload: responseData.insurances });
      setFilteredInsurances(responseData.insurances);
    }
  };

  // Filter insurances based on search term
  useEffect(() => {
    if (!data.insurances) return;

    if (searchTerm.trim() === "") {
      setFilteredInsurances(data.insurances);
    } else {
      const filtered = data.insurances.filter(insurance =>
        insurance.insuranceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insurance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insurance.insuranceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insurance.coverage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (insurance.serviceType && insurance.serviceType.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredInsurances(filtered);
    }
  }, [searchTerm, data.insurances]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (data.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading insurances...</div>
      </div>
    );
  }

  return (
    <Fragment>
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Insurance Plans
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Protect what matters most with our comprehensive insurance coverage options
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
              placeholder="Search insurance plans by name, type, or coverage..."
              className="block w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
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
            <div className="inline-block bg-blue-100 px-4 py-2 rounded-full text-sm text-blue-700">
              {filteredInsurances.length === 0
                ? `No insurance plans found for "${searchTerm}"`
                : `Found ${filteredInsurances.length} insurance plan${filteredInsurances.length !== 1 ? 's' : ''} for "${searchTerm}"`
              }
            </div>
          </div>
        )}
      </div>

      {/* Insurances Grid */}
      {filteredInsurances && filteredInsurances.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredInsurances.map((insurance) => (
              <InsuranceCard key={insurance._id} insurance={insurance} />
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              {searchTerm ? "No Insurance Plans Found" : "No Insurance Plans Available"}
            </h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              {searchTerm
                ? `No insurance plans match your search for "${searchTerm}". Try different keywords or browse all plans.`
                : "No insurance plans are currently available. Please check back later."
              }
            </p>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
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

export default AllInsurances;
