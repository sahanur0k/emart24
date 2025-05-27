import React, { Fragment, useEffect, useContext, useState } from "react";
import moment from "moment";
import Layout, { DashboardUserContext } from "./Layout";
import { getUserSuperCoins, getPendingSuperCoins, redeemRewardCode } from "./FetchApi";

const SuperCoinsComponent = () => {
  const context = useContext(DashboardUserContext);
  const data = context?.data || { userDetails: null, loading: true };

  // Debug logging for context data
  console.log("UserSuperCoins - Full context:", context);
  console.log("UserSuperCoins - Context data:", data);
  console.log("UserSuperCoins - data.loading:", data.loading);
  console.log("UserSuperCoins - data.userDetails:", data.userDetails);

  const [superCoinData, setSuperCoinData] = useState({
    totalSuperCoins: 0,
    history: []
  });
  const [pendingCoinData, setPendingCoinData] = useState({
    totalPendingCoins: 0,
    pendingOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rewardCode, setRewardCode] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState("");

  useEffect(() => {
    console.log("UserSuperCoins - data:", data);
    console.log("UserSuperCoins - userDetails:", data.userDetails);
    console.log("UserSuperCoins - loading:", data.loading);

    if (data.userDetails && data.userDetails._id) {
      console.log("UserSuperCoins - Fetching super coins for user:", data.userDetails._id);
      fetchSuperCoins();
      fetchPendingCoins();
    } else {
      console.log("UserSuperCoins - No user details, setting loading to false");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.userDetails]);

  const fetchSuperCoins = async () => {
    try {
      console.log("fetchSuperCoins - Starting fetch for user:", data.userDetails._id);
      setLoading(true);
      setError(null);
      const response = await getUserSuperCoins(data.userDetails._id);
      console.log("fetchSuperCoins - Response:", response);

      if (response && !response.error) {
        console.log("fetchSuperCoins - Success, setting data:", response);
        setSuperCoinData({
          totalSuperCoins: response.totalSuperCoins || 0,
          history: response.history || []
        });
      } else {
        console.log("fetchSuperCoins - Error in response:", response?.error);
        setError(response?.error || "Failed to fetch super coins");
      }
    } catch (error) {
      console.error("fetchSuperCoins - Network error:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingCoins = async () => {
    try {
      console.log("fetchPendingCoins - Starting fetch for user:", data.userDetails._id);
      const response = await getPendingSuperCoins(data.userDetails._id);
      console.log("fetchPendingCoins - Response:", response);

      if (response && !response.error) {
        console.log("fetchPendingCoins - Success, setting data:", response);
        setPendingCoinData({
          totalPendingCoins: response.totalPendingCoins || 0,
          pendingOrders: response.pendingOrders || []
        });
      } else {
        console.error("fetchPendingCoins - Error in response:", response?.error);
      }
    } catch (error) {
      console.error("fetchPendingCoins - Network error:", error);
    }
  };

  const handleRedeemCode = async () => {
    if (!rewardCode.trim()) return;

    setRedeemLoading(true);
    setRedeemMessage("");

    try {
      const response = await redeemRewardCode(data.userDetails._id, rewardCode.trim());

      if (response && response.success) {
        setRedeemMessage(`🎉 ${response.success} You earned ${response.coinsEarned} super coins!`);
        setRewardCode("");
        // Refresh super coin data
        fetchSuperCoins();
      } else {
        setRedeemMessage(`❌ ${response?.error || "Failed to redeem code"}`);
      }
    } catch (error) {
      setRedeemMessage("❌ Network error occurred");
    } finally {
      setRedeemLoading(false);
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

        {/* Pending Coins Section */}
        {pendingCoinData.totalPendingCoins > 0 && (
          <div className="mt-4 bg-yellow-500 bg-opacity-30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Pending Super Coins</h3>
                <p className="text-yellow-100 text-sm">Will be added when orders are delivered</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{pendingCoinData.totalPendingCoins}</div>
                <div className="text-yellow-100 text-sm">Pending</div>
              </div>
            </div>
          </div>
        )}

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
        <div className="flex-grow bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
              <span className="ml-3 text-lg">Loading user data...</span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  // Show error if user not found
  if (!data.userDetails && !data.loading) {
    return (
      <Fragment>
        <div className="flex-grow bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-2xl font-bold text-yellow-800 mb-4">Account Not Found</h2>
                <p className="text-yellow-700 mb-6">
                  Your account data couldn't be found. This might happen if you're using an old login session.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      localStorage.removeItem("jwt");
                      window.location.href = "/";
                    }}
                    className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
                  >
                    Log Out & Try Again
                  </button>
                  <p className="text-sm text-yellow-600">
                    Try logging in with: <strong>test@hayroo.com</strong> / <strong>password123</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Super Coins & Rewards</h1>
          <p className="text-gray-600">Track your earned super coins and transaction history</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Super Coin Wallet */}
        <div
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-lg p-8 mb-6"
          style={{
            color: 'white !important',
            backgroundColor: '#f59e0b'
          }}
        >
          <div className="text-center">
            <div className="mb-4">
              <div className="text-6xl mb-2">🥇</div>
              <h2
                className="text-3xl font-bold mb-2"
                style={{
                  color: 'white !important',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                Your Super Coins
              </h2>
              <div
                className="text-5xl font-bold mb-4"
                style={{
                  color: 'white !important',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                {superCoinData.totalSuperCoins}
              </div>
              <p
                style={{
                  color: 'white !important',
                  opacity: 0.9,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                Available to use
              </p>
            </div>

            {pendingCoinData.totalPendingCoins > 0 && (
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    color: 'white !important',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}
                >
                  Pending Coins
                </h3>
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: 'white !important',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}
                >
                  {pendingCoinData.totalPendingCoins}
                </div>
                <p
                  className="text-sm"
                  style={{
                    color: 'white !important',
                    opacity: 0.9,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}
                >
                  From {pendingCoinData.pendingOrders.length} pending orders
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/shop'}
                className="w-full bg-white text-yellow-600 font-bold py-3 px-6 rounded-lg hover:bg-yellow-50 transition duration-200"
              >
                🛍️ Visit Shop to Earn More Coins
              </button>

              {superCoinData.totalSuperCoins > 0 && (
                <button
                  className="w-full bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition duration-200"
                >
                  💰 Use Coins (Coming Soon)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reward Code Redemption Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎫 Redeem Reward Code</h3>
          <p className="text-gray-600 mb-4">Have a reward code? Enter it below to claim your super coins!</p>

          <div className="flex space-x-3">
            <input
              type="text"
              value={rewardCode}
              onChange={(e) => setRewardCode(e.target.value.toUpperCase())}
              placeholder="Enter reward code (e.g., WELCOME50)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              style={{ textTransform: 'uppercase' }}
            />
            <button
              onClick={handleRedeemCode}
              disabled={!rewardCode.trim() || redeemLoading}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                !rewardCode.trim() || redeemLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600'
              }`}
            >
              {redeemLoading ? '⏳ Redeeming...' : '🎁 Redeem'}
            </button>
          </div>

          {redeemMessage && (
            <div className={`mt-4 p-3 rounded-lg ${
              redeemMessage.includes('🎉')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {redeemMessage}
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How Super Coins Work</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="text-yellow-500 mr-2">🛒</span>
              <span>Order products to earn super coins</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-2">📦</span>
              <span>Coins are added when your order is delivered</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">💎</span>
              <span>Use coins for discounts on future purchases</span>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 mr-2">🎫</span>
              <span>Redeem special reward codes for bonus coins</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserSuperCoins = (props) => {
  return (
    <Fragment>
      <Layout children={<SuperCoinsComponent />} />
    </Fragment>
  );
};

export default UserSuperCoins;
