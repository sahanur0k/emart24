export const servicesState = {
  services: [],
  loading: false,
};

export const servicesReducer = (state, action) => {
  switch (action.type) {
    case "fetchServices":
      return {
        ...state,
        services: action.payload,
        loading: false,
      };
    case "setLoading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
