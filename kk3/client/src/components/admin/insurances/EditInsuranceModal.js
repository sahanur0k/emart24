import React, { Fragment, useContext, useState, useEffect } from "react";
import { InsuranceContext } from "./index";
import { updateInsurance, getAllInsurances } from "./FetchApi";

const EditInsuranceDetail = () => {
  const { data, dispatch } = useContext(InsuranceContext);
  const insurance = data.editInsuranceModal.insurance;

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    insuranceName: "",
    description: "",
    insuranceType: "Health",
    price: "",
    duration: "Annual",
    coverage: "",
    features: [""],
    status: "Active",
    images: null,
    success: false,
    error: false,
  });

  useEffect(() => {
    if (insurance) {
      setFdata({
        insuranceName: insurance.insuranceName || "",
        description: insurance.description || "",
        insuranceType: insurance.insuranceType || "Health",
        price: insurance.price || "",
        duration: insurance.duration || "Annual",
        coverage: insurance.coverage || "",
        features: insurance.features && insurance.features.length > 0 ? insurance.features : [""],
        status: insurance.status || "Active",
        images: null,
        success: false,
        error: false,
      });
    }
  }, [insurance]);

  const fetchData = async () => {
    let responseData = await getAllInsurances();
    if (responseData && responseData.insurances) {
      dispatch({
        type: "fetchInsurancesAndChangeState",
        payload: responseData.insurances,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!fData.insuranceName || !fData.description || !fData.price || !fData.coverage) {
      setFdata({ ...fData, error: "Insurance name, description, price, and coverage are required", success: false });
      return;
    }

    if (fData.price <= 0) {
      setFdata({ ...fData, error: "Price must be greater than 0", success: false });
      return;
    }

    const formData = new FormData();
    formData.append("insuranceName", fData.insuranceName);
    formData.append("description", fData.description);
    formData.append("insuranceType", fData.insuranceType);
    formData.append("price", fData.price);
    formData.append("duration", fData.duration);
    formData.append("coverage", fData.coverage);
    formData.append("features", JSON.stringify(fData.features.filter(f => f.trim() !== "")));
    formData.append("serviceType", "Basic Shop"); // Default service type
    formData.append("status", fData.status);

    if (fData.images) {
      for (let i = 0; i < fData.images.length; i++) {
        formData.append("images", fData.images[i]);
      }
    }

    let responseData = await updateInsurance(insurance._id, formData);
    if (responseData && responseData.success) {
      setFdata({
        ...fData,
        success: responseData.message,
        error: false,
      });
      fetchData(); // Refresh the insurances list
      setTimeout(() => {
        dispatch({ type: "editInsuranceModal", payload: { modal: false, insurance: null } });
      }, 2000);
    } else if (responseData && responseData.error) {
      setFdata({ ...fData, error: responseData.error, success: false });
    }
  };

  const addFeature = () => {
    setFdata({ ...fData, features: [...fData.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = fData.features.filter((_, i) => i !== index);
    setFdata({ ...fData, features: newFeatures });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...fData.features];
    newFeatures[index] = value;
    setFdata({ ...fData, features: newFeatures });
  };

  return (
    <Fragment>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl text-gray-700">Edit Insurance</div>
          <div
            onClick={(e) =>
              dispatch({ type: "editInsuranceModal", payload: { modal: false, insurance: null } })
            }
            className="text-gray-600 cursor-pointer hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
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
          </div>
        </div>
        <form className="space-y-4" onSubmit={submitForm}>
          {fData.success && alert(fData.success, "green")}
          {fData.error && alert(fData.error, "red")}

          {/* Insurance Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Name *
            </label>
            <input
              onChange={(e) =>
                setFdata({ ...fData, insuranceName: e.target.value })
              }
              value={fData.insuranceName}
              type="text"
              placeholder="Enter insurance name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              required
            />
          </div>

          {/* Insurance Type and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Type *
              </label>
              <select
                onChange={(e) =>
                  setFdata({ ...fData, insuranceType: e.target.value })
                }
                value={fData.insuranceType}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value="Health">Health</option>
                <option value="Life">Life</option>
                <option value="Auto">Auto</option>
                <option value="Home">Home</option>
                <option value="Travel">Travel</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration *
              </label>
              <select
                onChange={(e) =>
                  setFdata({ ...fData, duration: e.target.value })
                }
                value={fData.duration}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Semi-Annual">Semi-Annual</option>
                <option value="Annual">Annual</option>
                <option value="One-time">One-time</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              onChange={(e) =>
                setFdata({ ...fData, price: e.target.value })
              }
              value={fData.price}
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              onChange={(e) =>
                setFdata({ ...fData, description: e.target.value })
              }
              value={fData.description}
              rows="3"
              placeholder="Enter insurance description"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              required
            />
          </div>

          {/* Coverage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coverage Details *
            </label>
            <textarea
              onChange={(e) =>
                setFdata({ ...fData, coverage: e.target.value })
              }
              value={fData.coverage}
              rows="2"
              placeholder="Enter coverage details"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              required
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            {fData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Enter feature"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
                {fData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Feature
            </button>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images (Max 2) - Leave empty to keep current images
            </label>
            <input
              onChange={(e) =>
                setFdata({ ...fData, images: e.target.files })
              }
              type="file"
              accept="image/*"
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              onChange={(e) =>
                setFdata({ ...fData, status: e.target.value })
              }
              value={fData.status}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "editInsuranceModal", payload: { modal: false, insurance: null } })
              }
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Update Insurance
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const EditInsuranceModal = (props) => {
  const { data, dispatch } = useContext(InsuranceContext);

  return (
    <Fragment>
      {data.editInsuranceModal && data.editInsuranceModal.modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <EditInsuranceDetail />
        </div>
      )}
    </Fragment>
  );
};

export default EditInsuranceModal;
