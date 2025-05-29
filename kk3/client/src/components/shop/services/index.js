import React, { Fragment, createContext, useReducer, useEffect } from "react";
import Layout from "../layout";
import { servicesState, servicesReducer } from "./ServicesContext";
import AllServices from "./AllServices";

export const ServicesContext = createContext();

const ServicesComponent = () => {
  return (
    <Fragment>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <AllServices />
        </div>
      </div>
    </Fragment>
  );
};

const Services = () => {
  const [data, dispatch] = useReducer(servicesReducer, servicesState);

  return (
    <Fragment>
      <ServicesContext.Provider value={{ data, dispatch }}>
        <Layout children={<ServicesComponent />} />
      </ServicesContext.Provider>
    </Fragment>
  );
};

export default Services;
