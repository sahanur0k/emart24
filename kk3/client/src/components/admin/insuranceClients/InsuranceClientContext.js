export const insuranceClientState = {
  clients: [],
  statistics: {
    totalClients: 0,
    activeClients: 0,
    expiredClients: 0,
    pendingClients: 0,
    expiringClients: 0,
    totalPremium: 0,
    totalCoverage: 0,
    typeBreakdown: [],
  },
  loading: false,
  addClientModal: false,
  editClientModal: {
    show: false,
    client: null,
  },
  viewClientModal: {
    show: false,
    client: null,
  },
  deleteClientModal: {
    show: false,
    clientId: null,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  },
  filters: {
    search: '',
    status: '',
    insuranceType: '',
  },
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const insuranceClientReducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return {
        ...state,
        loading: action.payload,
      };

    case "setClients":
      return {
        ...state,
        clients: action.payload.clients,
        pagination: {
          ...state.pagination,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        },
        loading: false,
      };

    case "setStatistics":
      return {
        ...state,
        statistics: action.payload,
      };

    case "addClientModal":
      return {
        ...state,
        addClientModal: action.payload,
      };

    case "editClientModal":
      return {
        ...state,
        editClientModal: action.payload,
      };

    case "viewClientModal":
      return {
        ...state,
        viewClientModal: action.payload,
      };

    case "deleteClientModal":
      return {
        ...state,
        deleteClientModal: action.payload,
      };

    case "setFilters":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, currentPage: 1 }, // Reset to first page when filtering
      };

    case "setPagination":
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };

    case "setSorting":
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };

    case "addClient":
      return {
        ...state,
        clients: [action.payload, ...state.clients],
        statistics: {
          ...state.statistics,
          totalClients: state.statistics.totalClients + 1,
          activeClients: action.payload.status === 'Active' ? state.statistics.activeClients + 1 : state.statistics.activeClients,
        },
      };

    case "updateClient":
      return {
        ...state,
        clients: state.clients.map(client =>
          client._id === action.payload._id ? action.payload : client
        ),
      };

    case "deleteClient":
      const deletedClient = state.clients.find(client => client._id === action.payload);
      return {
        ...state,
        clients: state.clients.filter(client => client._id !== action.payload),
        statistics: {
          ...state.statistics,
          totalClients: state.statistics.totalClients - 1,
          activeClients: deletedClient && deletedClient.status === 'Active' ? state.statistics.activeClients - 1 : state.statistics.activeClients,
        },
      };

    default:
      return state;
  }
};
