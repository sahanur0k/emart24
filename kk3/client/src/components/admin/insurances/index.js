import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import InsuranceMenu from "./InsuranceMenu";
import AllInsurances from "./AllInsurances";
import { insuranceState, insuranceReducer } from "./InsuranceContext";

/* This context manage all of the insurances component's data */
export const InsuranceContext = createContext();

const InsuranceComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <InsuranceMenu />
      <AllInsurances />
    </div>
  );
};

const Insurances = (props) => {
  const [data, dispatch] = useReducer(insuranceReducer, insuranceState);
  return (
    <Fragment>
      <InsuranceContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<InsuranceComponent />} />
      </InsuranceContext.Provider>
    </Fragment>
  );
};

export default Insurances;
