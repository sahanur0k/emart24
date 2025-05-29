export const insuranceState = {
  insurances: [],
  addInsuranceModal: false,
  editInsuranceModal: false,
  loading: false,
};

export const insuranceReducer = (state, action) => {
  switch (action.type) {
    /* Get all insurances */
    case "fetchInsurancesAndChangeState":
      return {
        ...state,
        insurances: action.payload,
        loading: false,
      };
    /* Loading */
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    /* Add insurance modal */
    case "addInsuranceModal":
      return {
        ...state,
        addInsuranceModal: action.payload,
      };
    /* Edit insurance modal */
    case "editInsuranceModal":
      return {
        ...state,
        editInsuranceModal: action.payload,
      };
    default:
      return state;
  }
};
