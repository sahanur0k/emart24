import React, { Fragment, useContext, useState } from "react";
import { InsuranceClientContext } from "./index";
import { createInsuranceClient } from "./FetchApi";

const AddClientModal = () => {
  const { data, dispatch } = useContext(InsuranceClientContext);

  const [formData, setFormData] = useState({
    policyNumber: "",
    insuranceType: "Health",
    customInsuranceType: "",
    policyDate: "",
    company: "",
    customerName: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    },
    amount: "",
    premium: "",
    coverage: "",
    duration: "Annual",
    status: "Active",
    expiryDate: "",
    notes: "",
    success: false,
    error: false,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.policyNumber || !formData.customerName || !formData.company || !formData.phoneNumber || !formData.amount || !formData.premium || !formData.coverage || !formData.policyDate || !formData.expiryDate) {
      setFormData({ ...formData, error: "All required fields must be filled", success: false });
      setLoading(false);
      return;
    }

    if (!formData.address.street || !formData.address.city || !formData.address.state || !formData.address.zipCode) {
      setFormData({ ...formData, error: "Complete address is required", success: false });
      setLoading(false);
      return;
    }

    // Validate custom insurance type if "Other" is selected
    if (formData.insuranceType === "Other" && !formData.customInsuranceType.trim()) {
      setFormData({ ...formData, error: "Please specify the insurance type", success: false });
      setLoading(false);
      return;
    }

    // Prepare data for submission
    const submitData = {
      ...formData,
      insuranceType: formData.insuranceType === "Other" ? formData.customInsuranceType : formData.insuranceType
    };

    const responseData = await createInsuranceClient(submitData);

    if (responseData && responseData.success) {
      setFormData({
        policyNumber: "",
        insuranceType: "Health",
        customInsuranceType: "",
        policyDate: "",
        company: "",
        customerName: "",
        phoneNumber: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "USA",
        },
        amount: "",
        premium: "",
        coverage: "",
        duration: "Annual",
        status: "Active",
        expiryDate: "",
        notes: "",
        success: responseData.message,
        error: false,
      });

      // Add client to the list
      dispatch({ type: "addClient", payload: responseData.client });

      // Close modal after 2 seconds
      setTimeout(() => {
        dispatch({ type: "addClientModal", payload: false });
        setFormData({ ...formData, success: false });
      }, 2000);
    } else {
      setFormData({ ...formData, error: responseData.error || "Failed to create client", success: false });
    }

    setLoading(false);
  };

  const closeModal = () => {
    dispatch({ type: "addClientModal", payload: false });
    setFormData({
      policyNumber: "",
      insuranceType: "Health",
      customInsuranceType: "",
      policyDate: "",
      company: "",
      customerName: "",
      phoneNumber: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "USA",
      },
      amount: "",
      premium: "",
      coverage: "",
      duration: "Annual",
      status: "Active",
      expiryDate: "",
      notes: "",
      success: false,
      error: false,
    });
  };

  if (!data.addClientModal) return null;

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Add New Insurance Client</h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {formData.success && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {formData.success}
              </div>
            )}

            {formData.error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {formData.error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Policy Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Policy Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Policy Number *
                  </label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance Type *
                  </label>
                  <select
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Health">Health</option>
                    <option value="Life">Life</option>
                    <option value="Auto">Auto</option>
                    <option value="Home">Home</option>
                    <option value="Travel">Travel</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other (Specify below)</option>
                  </select>
                </div>

                {formData.insuranceType === "Other" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specify Insurance Type *
                    </label>
                    <input
                      type="text"
                      name="customInsuranceType"
                      value={formData.customInsuranceType}
                      onChange={handleInputChange}
                      placeholder="Enter insurance type"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Policy Date *
                  </label>
                  <input
                    type="date"
                    name="policyDate"
                    value={formData.policyDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Semi-Annual">Semi-Annual</option>
                    <option value="Annual">Annual</option>
                    <option value="One-time">One-time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Expired">Expired</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Customer Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Financial Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coverage Amount *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Premium Amount *
                  </label>
                  <input
                    type="number"
                    name="premium"
                    value={formData.premium}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coverage Details *
                </label>
                <textarea
                  name="coverage"
                  value={formData.coverage}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Client'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddClientModal;
