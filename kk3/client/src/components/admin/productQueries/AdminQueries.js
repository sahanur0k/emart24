import React, { Fragment, useState, useEffect } from "react";
import AdminLayout from "../layout";
import { getAllQueries, updateQueryStatus, deleteQuery, getQueryStatistics } from "./Action";
import { useSnackbar } from "notistack";

const AdminQueries = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [queries, setQueries] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "All",
    urgency: "All",
    page: 1,
    limit: 10,
  });
  const [editingQuery, setEditingQuery] = useState(null);
  const [updateData, setUpdateData] = useState({
    status: "",
    adminNotes: "",
    expectedDate: "",
  });

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const result = await getAllQueries(filters);
      if (result.error) {
        enqueueSnackbar(result.error, { variant: "error" });
      } else {
        setQueries(result.queries || []);
      }
    } catch (error) {
      enqueueSnackbar("Failed to fetch queries", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const result = await getQueryStatistics();
      if (result.error) {
        console.error("Failed to fetch statistics:", result.error);
      } else {
        setStatistics(result);
      }
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  useEffect(() => {
    fetchQueries();
    fetchStatistics();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handleUpdateQuery = async (queryId) => {
    try {
      const result = await updateQueryStatus(queryId, updateData);
      if (result.error) {
        enqueueSnackbar(result.error, { variant: "error" });
      } else {
        enqueueSnackbar("Query updated successfully!", { variant: "success" });
        setEditingQuery(null);
        setUpdateData({ status: "", adminNotes: "", expectedDate: "" });
        fetchQueries();
        fetchStatistics();
      }
    } catch (error) {
      enqueueSnackbar("Failed to update query", { variant: "error" });
    }
  };

  const handleDeleteQuery = async (queryId) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      try {
        const result = await deleteQuery(queryId);
        if (result.error) {
          enqueueSnackbar(result.error, { variant: "error" });
        } else {
          enqueueSnackbar("Query deleted successfully!", { variant: "success" });
          fetchQueries();
          fetchStatistics();
        }
      } catch (error) {
        enqueueSnackbar("Failed to delete query", { variant: "error" });
      }
    }
  };

  const startEditing = (query) => {
    setEditingQuery(query._id);
    setUpdateData({
      status: query.status,
      adminNotes: query.adminNotes || "",
      expectedDate: query.expectedDate ? query.expectedDate.split('T')[0] : "",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Ordered": return "bg-purple-100 text-purple-800";
      case "Available": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "Low": return "bg-gray-100 text-gray-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Urgent": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Fragment>
      <AdminLayout>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Product Queries Management</h1>
            <p className="text-gray-600 mt-1">Manage all customer product requests from employees</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{statistics.totalQueries || 0}</div>
              <div className="text-sm text-gray-600">Total Queries</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-yellow-600">{statistics.pendingQueries || 0}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{statistics.todayQueries || 0}</div>
              <div className="text-sm text-gray-600">Today</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">
                {statistics.statusStats?.find(s => s._id === "Available")?.count || 0}
              </div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Ordered">Ordered</option>
                  <option value="Available">Available</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                <select
                  value={filters.urgency}
                  onChange={(e) => handleFilterChange("urgency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Urgency</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Per Page</label>
                <select
                  value={filters.limit}
                  onChange={(e) => handleFilterChange("limit", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {queries.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No queries found</h3>
                  <p className="mt-1 text-sm text-gray-500">No product queries match your current filters.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product & Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status & Urgency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {queries.map((query) => (
                        <tr key={query._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{query.productName}</div>
                              {query.category && (
                                <div className="text-xs text-gray-500">Category: {query.category}</div>
                              )}
                              <div className="text-sm text-gray-700 mt-1">{query.customerName}</div>
                              <div className="text-xs text-gray-500">{query.customerContact}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{query.employeeName}</div>
                            <div className="text-xs text-gray-500">{formatDate(query.createdAt)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(query.status)}`}>
                                {query.status}
                              </span>
                              <br />
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(query.urgency)}`}>
                                {query.urgency}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs">
                              <div className="truncate" title={query.description}>
                                {query.description}
                              </div>
                              {query.quantity > 1 && (
                                <div className="text-xs text-gray-500">Qty: {query.quantity}</div>
                              )}
                              {query.estimatedPrice && (
                                <div className="text-xs text-gray-500">Est: ${query.estimatedPrice}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => startEditing(query)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteQuery(query._id)}
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
              )}
            </div>
          )}

          {/* Edit Modal */}
          {editingQuery && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Update Query</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={updateData.status}
                        onChange={(e) => setUpdateData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Ordered">Ordered</option>
                        <option value="Available">Available</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                      <textarea
                        value={updateData.adminNotes}
                        onChange={(e) => setUpdateData(prev => ({ ...prev, adminNotes: e.target.value }))}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add notes for the employee..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expected Date</label>
                      <input
                        type="date"
                        value={updateData.expectedDate}
                        onChange={(e) => setUpdateData(prev => ({ ...prev, expectedDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setEditingQuery(null)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateQuery(editingQuery)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </Fragment>
  );
};

export default AdminQueries;
