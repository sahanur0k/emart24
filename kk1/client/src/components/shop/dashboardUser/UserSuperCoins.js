import React, { Fragment, useEffect, useContext, useState } from "react";
import moment from "moment";
import Layout, { DashboardUserContext } from "./Layout";
import { getUserSuperCoins } from "./FetchApi";

const UserSuperCoins = () => {
  const { data } = useContext(DashboardUserContext);
  const [superCoinData, setSuperCoinData] = useState({
    totalSuperCoins: 0,
    history: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug logging
  console.log("UserSuperCoins - data:", data);
  console.log("UserSuperCoins - userDetails:", data.userDetails);
  console.log("JWT token:", localStorage.getItem("jwt"));
  console.log("Is authenticated:", localStorage.getItem("jwt") ? "Yes" : "No");

  useEffect(() => {
    console.log("UserSuperCoins useEffect - userDetails:", data.userDetails);
    if (data.userDetails && data.userDetails._id) {
      fetchSuperCoins();
    } else {
      setLoading(false);
    }
  }, [data.userDetails]);

  const fetchSuperCoins = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching super coins for user:", data.userDetails._id);
      const response = await getUserSuperCoins(data.userDetails._id);
      console.log("Super coins response:", response);

      if (response && !response.error) {
        setSuperCoinData({
          totalSuperCoins: response.totalSuperCoins || 0,
          history: response.history || []
        });
      } else {
        setError(response?.error || "Failed to fetch super coins");
      }
    } catch (error) {
      console.error("Error fetching super coins:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const SuperCoinCard = () => {
    return (
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-lg p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Super Coins</h2>
            <p className="text-yellow-100">Earn coins with every purchase!</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{superCoinData.totalSuperCoins}</div>
            <div className="text-yellow-100">Available Coins</div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Coins are awarded when your orders are delivered</span>
        </div>
      </div>
    );
  };

  const HistoryTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
      );
    }

    if (superCoinData.history.length === 0) {
      return (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Super Coins Yet</h3>
          <p className="text-gray-500">Start shopping to earn super coins with every purchase!</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {superCoinData.history.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {moment(entry.date).format("MMM DD, YYYY")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    entry.type === "earned"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {entry.type === "earned" ? "Earned" : "Spent"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={entry.type === "earned" ? "text-green-600" : "text-red-600"}>
                    {entry.type === "earned" ? "+" : "-"}{entry.amount}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {entry.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Show loading state
  if (data.loading) {
    return (
      <Fragment>
        <Layout>
          <div className="flex-grow bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
                <span className="ml-3 text-lg">Loading user data...</span>
              </div>
            </div>
          </div>
        </Layout>
      </Fragment>
    );
  }

  // Show error if user not found
  if (!data.userDetails) {
    return (
      <Fragment>
        <Layout>
          <div className="flex-grow bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-600 mb-4">User Not Found</h2>
                <p className="text-gray-600">Please log in to view your super coins.</p>
              </div>
            </div>
          </div>
        </Layout>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Layout>
        <div className="flex-grow bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Coins & Rewards</h1>
              <p className="text-gray-600">Track your earned super coins and transaction history</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <SuperCoinCard />

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
              </div>
              <div className="p-6">
                <HistoryTable />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default UserSuperCoins;
