import React, { useContext } from "react";
import { UserAnalyticsContext } from "./";

const MonthlyAnalytics = () => {
  const { data } = useContext(UserAnalyticsContext);
  const { monthlyAnalytics } = data;

  if (data.loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const maxRevenue = Math.max(...monthlyAnalytics.map(month => month.revenue));
  const maxOrders = Math.max(...monthlyAnalytics.map(month => month.orders));
  const maxUsers = Math.max(...monthlyAnalytics.map(month => month.newUsers));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Monthly Analytics (Last 12 Months)</h3>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Orders</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span>New Users</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Chart Headers */}
          <div className="grid grid-cols-12 gap-2 mb-4">
            {monthlyAnalytics.map((month, index) => (
              <div key={index} className="text-center">
                <div className="text-xs font-medium text-gray-600 mb-2">
                  {month.month}
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Revenue</h4>
            <div className="grid grid-cols-12 gap-2 items-end h-32">
              {monthlyAnalytics.map((month, index) => {
                const height = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '120px' }}>
                      <div
                        className="bg-blue-500 rounded-t absolute bottom-0 w-full transition-all duration-300 hover:bg-blue-600"
                        style={{ height: `${height}%` }}
                        title={`${month.month}: ${formatCurrency(month.revenue)}`}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1 text-center">
                      {formatCurrency(month.revenue)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orders Chart */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Orders</h4>
            <div className="grid grid-cols-12 gap-2 items-end h-32">
              {monthlyAnalytics.map((month, index) => {
                const height = maxOrders > 0 ? (month.orders / maxOrders) * 100 : 0;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '120px' }}>
                      <div
                        className="bg-green-500 rounded-t absolute bottom-0 w-full transition-all duration-300 hover:bg-green-600"
                        style={{ height: `${height}%` }}
                        title={`${month.month}: ${month.orders} orders`}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1 text-center">
                      {month.orders}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* New Users Chart */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">New Users</h4>
            <div className="grid grid-cols-12 gap-2 items-end h-32">
              {monthlyAnalytics.map((month, index) => {
                const height = maxUsers > 0 ? (month.newUsers / maxUsers) * 100 : 0;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '120px' }}>
                      <div
                        className="bg-purple-500 rounded-t absolute bottom-0 w-full transition-all duration-300 hover:bg-purple-600"
                        style={{ height: `${height}%` }}
                        title={`${month.month}: ${month.newUsers} new users`}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1 text-center">
                      {month.newUsers}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Users</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Order Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {monthlyAnalytics.map((month, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {month.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(month.revenue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {month.orders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {month.newUsers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(month.avgOrderValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyAnalytics;
