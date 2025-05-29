export const dashboardUserState = {
  userDetails: null,
  loading: false,
  OrderByUser: null,
};

export const dashboardUserReducer = (state, action) => {
  console.log("dashboardUserReducer - Action:", action.type, "Payload:", action.payload);
  console.log("dashboardUserReducer - Current state before update:", state);

  let newState;
  switch (action.type) {
    case "userDetails":
      newState = {
        ...state,
        userDetails: action.payload,
      };
      console.log("dashboardUserReducer - New state after userDetails:", newState);
      return newState;
    case "OrderByUser":
      newState = {
        ...state,
        OrderByUser: action.payload,
      };
      console.log("dashboardUserReducer - New state after OrderByUser:", newState);
      return newState;
    case "loading":
      newState = {
        ...state,
        loading: action.payload,
      };
      console.log("dashboardUserReducer - New state after loading:", newState);
      return newState;
    default:
      console.log("dashboardUserReducer - Unknown action type, returning current state");
      return state;
  }
};
