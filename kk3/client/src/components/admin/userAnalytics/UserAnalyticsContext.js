export const userAnalyticsState = {
  loading: false,
  users: [],
  monthlyAnalytics: [],
  overallStats: {
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    avgRevenuePerUser: 0,
    recentRegistrations: 0
  },
  topCustomers: [],
  selectedUser: null,
  userDetails: null,
  searchTerm: "",
  sortBy: "joinDate",
  sortOrder: "desc",
  currentPage: 1,
  usersPerPage: 10,
  filterBy: "all", // all, active, inactive
  createEmployeeModal: false
};

export const userAnalyticsReducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return {
        ...state,
        loading: action.payload
      };
    case "setAnalyticsData":
      return {
        ...state,
        users: action.payload.users,
        monthlyAnalytics: action.payload.monthlyAnalytics,
        overallStats: action.payload.overallStats,
        topCustomers: action.payload.topCustomers,
        loading: false
      };
    case "setSelectedUser":
      return {
        ...state,
        selectedUser: action.payload
      };
    case "setUserDetails":
      return {
        ...state,
        userDetails: action.payload
      };
    case "setSearchTerm":
      return {
        ...state,
        searchTerm: action.payload,
        currentPage: 1 // Reset to first page when searching
      };
    case "setSortBy":
      return {
        ...state,
        sortBy: action.payload,
        currentPage: 1
      };
    case "setSortOrder":
      return {
        ...state,
        sortOrder: action.payload,
        currentPage: 1
      };
    case "setCurrentPage":
      return {
        ...state,
        currentPage: action.payload
      };
    case "setUsersPerPage":
      return {
        ...state,
        usersPerPage: action.payload,
        currentPage: 1
      };
    case "setFilterBy":
      return {
        ...state,
        filterBy: action.payload,
        currentPage: 1
      };
    case "createEmployeeModal":
      return {
        ...state,
        createEmployeeModal: action.payload
      };
    case "refreshData":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
