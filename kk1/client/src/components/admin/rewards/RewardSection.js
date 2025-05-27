import React, { Fragment, useEffect, useState } from "react";
import { rewardList, updateRewardStatus } from "./FetchApi";

const RewardSection = () => {
  const [state, setState] = useState({
    rewards: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      const response = await rewardList();
      if (response && response.rewards) {
        setState({ ...state, rewards: response.rewards, loading: false });
      }
    } catch (error) {
      setState({ ...state, error: true, loading: false });
    }
  };

  const handleStatusUpdate = async (rewardId, status) => {
    try {
      const response = await updateRewardStatus(rewardId, status);
      if (response && response.success) {
        loadRewards(); // Reload the rewards list
      }
    } catch (error) {
      setState({ ...state, error: true });
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
        <div className="text-2xl mx-2 mb-4">Super Coin Rewards</div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
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
              {state.rewards.map((reward) => (
                <tr key={reward._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reward.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Order #{reward.order._id.slice(-6)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reward.amount} coins
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reward.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : reward.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {reward.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {reward.status === "pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(reward._id, "approved")}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(reward._id, "rejected")}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default RewardSection; 