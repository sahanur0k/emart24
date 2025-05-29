import React, { Fragment, createContext, useReducer, useEffect } from "react";
import Layout from "../layout";
import { insurancesState, insurancesReducer } from "./InsurancesContext";
import AllInsurances from "./AllInsurances";

export const InsurancesContext = createContext();

const InsurancesComponent = () => {
  return (
    <Fragment>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <AllInsurances />
        </div>
      </div>
    </Fragment>
  );
};

const Insurances = () => {
  const [data, dispatch] = useReducer(insurancesReducer, insurancesState);

  return (
    <Fragment>
      <InsurancesContext.Provider value={{ data, dispatch }}>
        <Layout children={<InsurancesComponent />} />
      </InsurancesContext.Provider>
    </Fragment>
  );
};

export default Insurances;
