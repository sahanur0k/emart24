export const serviceState = {
  services: [],
  addServiceModal: false,
  editServiceModal: false,
  loading: false,
};

export const serviceReducer = (state, action) => {
  switch (action.type) {
    /* Get all services */
    case "fetchServicesAndChangeState":
      return {
        ...state,
        services: action.payload,
        loading: false,
      };
    /* Loading */
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    /* Add service modal */
    case "addServiceModal":
      return {
        ...state,
        addServiceModal: action.payload,
      };
    /* Edit service modal */
    case "editServiceModal":
      return {
        ...state,
        editServiceModal: action.payload,
      };
    default:
      return state;
  }
};
