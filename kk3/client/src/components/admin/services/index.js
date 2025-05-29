import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import ServiceMenu from "./ServiceMenu";
import AllServices from "./AllServices";
import { serviceState, serviceReducer } from "./ServiceContext";

/* This context manage all of the services component's data */
export const ServiceContext = createContext();

const ServiceComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <ServiceMenu />
      <AllServices />
    </div>
  );
};

const Services = (props) => {
  const [data, dispatch] = useReducer(serviceReducer, serviceState);
  return (
    <Fragment>
      <ServiceContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<ServiceComponent />} />
      </ServiceContext.Provider>
    </Fragment>
  );
};

export default Services;
