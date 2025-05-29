import React, { Fragment, useContext, useEffect } from "react";
import { ServicesContext } from "./index";
import { getAllCategories, getAllServices, getServicesByCategory } from "./FetchApi";

const ServicesByCategory = () => {
  const { data, dispatch } = useContext(ServicesContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const responseData = await getAllCategories();
    if (responseData && responseData.Categories) {
      dispatch({
        type: "fetchCategories",
        payload: responseData.Categories.filter(cat => cat.cStatus === "Active"),
      });
    }
  };

  const handleCategoryClick = async (categoryId) => {
    dispatch({ type: "setLoading", payload: true });
    dispatch({ type: "setSelectedCategory", payload: categoryId });
    
    if (categoryId === null) {
      // Show all services
      const responseData = await getAllServices();
      if (responseData && responseData.services) {
        dispatch({ type: "fetchServices", payload: responseData.services });
      }
    } else {
      // Show services by category
      const responseData = await getServicesByCategory(categoryId);
      if (responseData && responseData.services) {
        dispatch({ type: "fetchServices", payload: responseData.services });
      }
    }
  };

  return (
    <Fragment>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Service Categories</h2>
        
        {/* All Services Option */}
        <div
          onClick={() => handleCategoryClick(null)}
          className={`cursor-pointer p-3 mb-2 rounded-lg transition-colors ${
            data.selectedCategory === null
              ? "bg-gray-800 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="font-medium">All Services</span>
          </div>
        </div>

        {/* Category List */}
        {data.categories && data.categories.length > 0 ? (
          data.categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`cursor-pointer p-3 mb-2 rounded-lg transition-colors ${
                data.selectedCategory === category._id
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <div>
                  <div className="font-medium">{category.cName}</div>
                  {category.cDescription && (
                    <div className="text-sm opacity-75 mt-1">
                      {category.cDescription.length > 50
                        ? category.cDescription.slice(0, 50) + "..."
                        : category.cDescription}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-4">
            No categories available
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ServicesByCategory;
