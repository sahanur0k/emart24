import React, { Fragment, useEffect, useState } from "react";
import {
  getAllUsersWithSuperCoins,
  updateUserSuperCoins,
  createRewardCode,
  getAllRewardCodes,
  deleteRewardCode
} from "./FetchApi";

const RewardSection = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [state, setState] = useState({
    users: [],
    rewardCodes: [],
    loading: true,
    error: false,
  });

  const [coinModal, setCoinModal] = useState({
    show: false,
    userId: null,
    userName: "",
    currentCoins: 0,
    action: "add", // "add" or "remove"
    amount: ""
  });

  const [codeModal, setCodeModal] = useState({
    show: false,
    code: "",
    coins: "",
    description: "",
    expiryDate: ""
  });

  useEffect(() => {
    loadAllData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAllData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const [usersResponse, codesResponse] = await Promise.all([
        getAllUsersWithSuperCoins(),
        getAllRewardCodes()
      ]);

      setState(prev => ({
        ...prev,
        users: usersResponse?.users || [],
        rewardCodes: codesResponse?.codes || [],
        loading: false
      }));
    } catch (error) {
      setState(prev => ({ ...prev, error: true, loading: false }));
    }
  };



  const handleCoinUpdate = async () => {
    try {
      const { userId, action, amount } = coinModal;

      if (!userId || !action || !amount) {
        alert("Please fill in all required fields");
        return;
      }

      const numAmount = parseInt(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        alert("Please enter a valid amount greater than 0");
        return;
      }

      const response = await updateUserSuperCoins(userId, action, numAmount);

      if (response && response.success) {
        alert(`Successfully ${action === "add" ? "added" : "removed"} ${amount} super coins!`);
        setCoinModal({ show: false, userId: null, userName: "", currentCoins: 0, action: "add", amount: "" });
        loadAllData();
      } else {
        alert(response?.error || "Failed to update super coins");
      }
    } catch (error) {
      console.error("Error updating super coins:", error);
      alert("Error updating super coins");
    }
  };

  const handleCreateRewardCode = async () => {
    try {
      const { code, coins, description, expiryDate } = codeModal;
      const response = await createRewardCode(code, parseInt(coins), description, expiryDate);

      if (response && response.success) {
        setCodeModal({ show: false, code: "", coins: "", description: "", expiryDate: "" });
        loadAllData();
      } else {
        alert(response?.error || "Failed to create reward code");
      }
    } catch (error) {
      alert("Error creating reward code");
    }
  };

  const handleDeleteRewardCode = async (codeId) => {
    if (window.confirm("Are you sure you want to delete this reward code?")) {
      try {
        const response = await deleteRewardCode(codeId);
        if (response && response.success) {
          loadAllData();
        }
      } catch (error) {
        alert("Error deleting reward code");
      }
    }
  };

  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Loading...
      </div>
    );
  }

  return (
    <Fragment>
      <div className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-3xl font-bold mx-2 mb-6">Super Coin Management</div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "users"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            👥 User Management
          </button>
          <button
            onClick={() => setActiveTab("codes")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "codes"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🎫 Reward Codes
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">All Users & Super Coins</h3>
              <p className="text-sm text-gray-600">Manage user super coin balances</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Super Coins
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold text-yellow-600">
                          🥇 {user.totalSuperCoins || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setCoinModal({
                              show: true,
                              userId: user._id,
                              userName: user.name,
                              currentCoins: user.totalSuperCoins || 0,
                              action: "add",
                              amount: ""
                            })}
                            className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded"
                          >
                            ➕ Add
                          </button>
                          <button
                            onClick={() => setCoinModal({
                              show: true,
                              userId: user._id,
                              userName: user.name,
                              currentCoins: user.totalSuperCoins || 0,
                              action: "remove",
                              amount: ""
                            })}
                            className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded"
                          >
                            ➖ Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}



        {/* Reward Codes Tab */}
        {activeTab === "codes" && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Reward Codes</h3>
                <p className="text-sm text-gray-600">Create and manage reward codes for users</p>
              </div>
              <button
                onClick={() => setCodeModal({ show: true, code: "", coins: "", description: "", expiryDate: "" })}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                ➕ Create New Code
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coins
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Used
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.rewardCodes.map((code) => (
                    <tr key={code._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">{code.code}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-yellow-600">🥇 {code.coins}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{code.description}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {code.expiryDate ? new Date(code.expiryDate).toLocaleDateString() : "No expiry"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          code.isUsed ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}>
                          {code.isUsed ? "Used" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteRewardCode(code._id)}
                          className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Coin Management Modal */}
        {coinModal.show && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {coinModal.action === "add" ? "Add" : "Remove"} Super Coins
                </h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">User: <strong>{coinModal.userName}</strong></p>
                  <p className="text-sm text-gray-600">Current Balance: <strong className="text-yellow-600">🥇 {coinModal.currentCoins}</strong></p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to {coinModal.action}:
                  </label>
                  <input
                    type="number"
                    value={coinModal.amount || ""}
                    onChange={(e) => {
                      const value = e.target?.value || "";
                      setCoinModal(prev => ({ ...prev, amount: value }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setCoinModal({ show: false, userId: null, userName: "", currentCoins: 0, action: "add", amount: "" })}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCoinUpdate}
                    className={`px-4 py-2 text-white rounded-md ${
                      coinModal.action === "add"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={!coinModal.amount || parseInt(coinModal.amount) <= 0}
                  >
                    {coinModal.action === "add" ? "Add Coins" : "Remove Coins"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reward Code Creation Modal */}
        {codeModal.show && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create Reward Code</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code:</label>
                    <input
                      type="text"
                      value={codeModal.code || ""}
                      onChange={(e) => {
                        const value = e.target?.value || "";
                        setCodeModal(prev => ({ ...prev, code: value.toUpperCase() }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="e.g., WELCOME50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Super Coins:</label>
                    <input
                      type="number"
                      value={codeModal.coins || ""}
                      onChange={(e) => {
                        const value = e.target?.value || "";
                        setCodeModal(prev => ({ ...prev, coins: value }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Amount of coins"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
                    <input
                      type="text"
                      value={codeModal.description || ""}
                      onChange={(e) => {
                        const value = e.target?.value || "";
                        setCodeModal(prev => ({ ...prev, description: value }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="e.g., Super coin hurry up by something"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional):</label>
                    <input
                      type="date"
                      value={codeModal.expiryDate || ""}
                      onChange={(e) => {
                        const value = e.target?.value || "";
                        setCodeModal(prev => ({ ...prev, expiryDate: value }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setCodeModal({ show: false, code: "", coins: "", description: "", expiryDate: "" })}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateRewardCode}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    disabled={!codeModal.code || !codeModal.coins || !codeModal.description}
                  >
                    Create Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default RewardSection;