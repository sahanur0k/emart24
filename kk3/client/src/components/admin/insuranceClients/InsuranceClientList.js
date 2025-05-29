import React, { useContext, useEffect } from "react";
import { InsuranceClientContext } from "./index";
import { getAllInsuranceClients } from "./FetchApi";

const InsuranceClientList = () => {
  const { data, dispatch } = useContext(InsuranceClientContext);
  const { clients, pagination, filters, loading } = data;

  useEffect(() => {
    fetchClients();
  }, [pagination.currentPage, filters]);

  const fetchClients = async () => {
    dispatch({ type: "setLoading", payload: true });
    const responseData = await getAllInsuranceClients(
      pagination.currentPage,
      pagination.limit,
      filters.search,
      filters.status,
      filters.insuranceType
    );
    
    if (responseData && responseData.success) {
      dispatch({ type: "setClients", payload: responseData });
    } else {
      dispatch({ type: "setLoading", payload: false });
    }
  };

  const handleSearch = (e) => {
    dispatch({ type: "setFilters", payload: { search: e.target.value } });
  };

  const handleStatusFilter = (e) => {
    dispatch({ type: "setFilters", payload: { status: e.target.value } });
  };

  const handleTypeFilter = (e) => {
    dispatch({ type: "setFilters", payload: { insuranceType: e.target.value } });
  };

  const handlePageChange = (page) => {
    dispatch({ type: "setPagination", payload: { currentPage: page } });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const handleViewClient = (client) => {
    dispatch({ type: "viewClientModal", payload: { show: true, client } });
  };

  const handleEditClient = (client) => {
    dispatch({ type: "editClientModal", payload: { show: true, client } });
  };

  const handleDeleteClient = (clientId) => {
    dispatch({ type: "deleteClientModal", payload: { show: true, clientId } });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800">
          Insurance Clients ({pagination.total})
        </h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search clients..."
            value={filters.search}
            onChange={handleSearch}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={handleStatusFilter}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          
          {/* Type Filter */}
          <select
            value={filters.insuranceType}
            onChange={handleTypeFilter}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="Health">Health</option>
            <option value="Life">Life</option>
            <option value="Auto">Auto</option>
            <option value="Home">Home</option>
            <option value="Travel">Travel</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Policy No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {client.policyNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.insuranceType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(client.policyDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(client.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(client.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewClient(client)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditClient(client)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {clients.map((client) => (
          <div key={client._id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-900">{client.policyNumber}</p>
                <p className="text-sm text-gray-500">{client.customerName}</p>
              </div>
              {getStatusBadge(client.status)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
              <div>Type: {client.insuranceType}</div>
              <div>Company: {client.company}</div>
              <div>Phone: {client.phoneNumber}</div>
              <div>Amount: {formatCurrency(client.amount)}</div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewClient(client)}
                className="text-blue-600 hover:text-blue-900 text-sm"
              >
                View
              </button>
              <button
                onClick={() => handleEditClient(client)}
                className="text-indigo-600 hover:text-indigo-900 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClient(client._id)}
                className="text-red-600 hover:text-red-900 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.limit, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(pagination.totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-2 border rounded-md text-sm font-medium ${
                  pagination.currentPage === index + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {clients.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new insurance client.
          </p>
        </div>
      )}
    </div>
  );
};

export default InsuranceClientList;
