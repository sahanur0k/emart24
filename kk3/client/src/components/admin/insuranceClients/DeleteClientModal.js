import React, { Fragment, useContext, useState } from "react";
import { InsuranceClientContext } from "./index";
import { deleteInsuranceClient } from "./FetchApi";

const DeleteClientModal = () => {
  const { data, dispatch } = useContext(InsuranceClientContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    const responseData = await deleteInsuranceClient(data.deleteClientModal.clientId);
    
    if (responseData && responseData.success) {
      // Remove client from the list
      dispatch({ type: "deleteClient", payload: data.deleteClientModal.clientId });
      
      // Close modal
      dispatch({ type: "deleteClientModal", payload: { show: false, clientId: null } });
    } else {
      setError(responseData.error || "Failed to delete client");
    }
    
    setLoading(false);
  };

  const closeModal = () => {
    dispatch({ type: "deleteClientModal", payload: { show: false, clientId: null } });
    setError("");
  };

  if (!data.deleteClientModal.show) return null;

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Delete Insurance Client</h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <svg
                  className="w-12 h-12 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Are you sure you want to delete this client?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  This action cannot be undone. All client data including policy information, 
                  financial records, and documents will be permanently removed.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Warning
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Deleting this client will also remove:
                    </p>
                    <ul className="list-disc list-inside mt-1">
                      <li>Policy information and history</li>
                      <li>Financial records and premium data</li>
                      <li>Customer contact information</li>
                      <li>Any uploaded documents</li>
                      <li>Beneficiary information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </div>
                ) : (
                  'Delete Client'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteClientModal;
