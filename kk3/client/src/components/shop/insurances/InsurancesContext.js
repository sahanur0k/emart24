export const insurancesState = {
  insurances: [],
  loading: false,
};

export const insurancesReducer = (state, action) => {
  switch (action.type) {
    case "fetchInsurances":
      return {
        ...state,
        insurances: action.payload,
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
