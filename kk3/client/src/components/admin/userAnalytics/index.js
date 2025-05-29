import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import UserAnalyticsMenu from "./UserAnalyticsMenu";
import UserAnalyticsDashboard from "./UserAnalyticsDashboard";
import UsersList from "./UsersList";
import MonthlyAnalytics from "./MonthlyAnalytics";
import CreateEmployeeModal from "./CreateEmployeeModal";
import { userAnalyticsState, userAnalyticsReducer } from "./UserAnalyticsContext";

/* This context manages all user analytics component data */
export const UserAnalyticsContext = createContext();

const UserAnalyticsComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <UserAnalyticsMenu />
      <UserAnalyticsDashboard />
      <MonthlyAnalytics />
      <UsersList />
      <CreateEmployeeModal />
    </div>
  );
};

const UserAnalytics = (props) => {
  const [data, dispatch] = useReducer(userAnalyticsReducer, userAnalyticsState);
  return (
    <Fragment>
      <UserAnalyticsContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<UserAnalyticsComponent />} />
      </UserAnalyticsContext.Provider>
    </Fragment>
  );
};

export default UserAnalytics;
