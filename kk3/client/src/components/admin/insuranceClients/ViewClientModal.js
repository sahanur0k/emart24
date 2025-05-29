import React, { Fragment, useContext } from "react";
import { InsuranceClientContext } from "./index";

const ViewClientModal = () => {
  const { data, dispatch } = useContext(InsuranceClientContext);
  const client = data.viewClientModal.client;

  const closeModal = () => {
    dispatch({ type: "viewClientModal", payload: { show: false, client: null } });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Active: 'bg-green-100 text-green-800',
      Expired: 'bg-red-100 text-red-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Cancelled: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!data.viewClientModal.show || !client) return null;

  const daysUntilExpiry = getDaysUntilExpiry(client.expiryDate);

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Insurance Client Details</h2>
              <p className="text-sm text-gray-600">Policy #{client.policyNumber}</p>
            </div>
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
            {/* Status and Expiry Alert */}
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                {getStatusBadge(client.status)}
              </div>
              {client.status === 'Active' && daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                <div className="bg-orange-100 border border-orange-400 text-orange-700 px-3 py-1 rounded-md text-sm">
                  Expires in {daysUntilExpiry} days
                </div>
              )}
              {client.status === 'Active' && daysUntilExpiry <= 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded-md text-sm">
                  Policy has expired
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Policy Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Policy Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Policy Number</label>
                      <p className="text-gray-900 font-medium">{client.policyNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Insurance Type</label>
                      <p className="text-gray-900">{client.insuranceType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Company</label>
                      <p className="text-gray-900">{client.company}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Policy Date</label>
                      <p className="text-gray-900">{formatDate(client.policyDate)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Expiry Date</label>
                      <p className="text-gray-900">{formatDate(client.expiryDate)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Duration</label>
                      <p className="text-gray-900">{client.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Financial Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Coverage Amount</label>
                      <p className="text-gray-900 font-semibold text-lg">{formatCurrency(client.amount)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Premium Amount</label>
                      <p className="text-gray-900 font-semibold">{formatCurrency(client.premium)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Coverage Details</label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{client.coverage}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Customer Name</label>
                      <p className="text-gray-900 font-medium">{client.customerName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                      <p className="text-gray-900">
                        <a href={`tel:${client.phoneNumber}`} className="text-blue-600 hover:text-blue-800">
                          {client.phoneNumber}
                        </a>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Address</label>
                      <div className="text-gray-900 bg-gray-50 p-3 rounded-md">
                        <p>{client.address.street}</p>
                        <p>{client.address.city}, {client.address.state} {client.address.zipCode}</p>
                        <p>{client.address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Additional Information</h3>
                  <div className="space-y-3">
                    {client.notes && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Notes</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{client.notes}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Created Date</label>
                      <p className="text-gray-900">{formatDate(client.createdAt)}</p>
                    </div>
                    {client.createdBy && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Created By</label>
                        <p className="text-gray-900">{client.createdBy.name} ({client.createdBy.email})</p>
                      </div>
                    )}
                    {client.lastUpdatedBy && client.updatedAt !== client.createdAt && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Last Updated</label>
                        <p className="text-gray-900">
                          {formatDate(client.updatedAt)} by {client.lastUpdatedBy.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
              <button
                onClick={() => {
                  closeModal();
                  dispatch({ type: "editClientModal", payload: { show: true, client } });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Client
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewClientModal;
