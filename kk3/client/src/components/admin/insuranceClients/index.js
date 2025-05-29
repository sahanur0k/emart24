import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import InsuranceClientMenu from "./InsuranceClientMenu";
import InsuranceClientDashboard from "./InsuranceClientDashboard";
import InsuranceClientList from "./InsuranceClientList";
import AddClientModal from "./AddClientModal";
import EditClientModal from "./EditClientModal";
import ViewClientModal from "./ViewClientModal";
import DeleteClientModal from "./DeleteClientModal";
import { insuranceClientState, insuranceClientReducer } from "./InsuranceClientContext";

/* This context manages all insurance client component data */
export const InsuranceClientContext = createContext();

const InsuranceClientComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <InsuranceClientMenu />
      <InsuranceClientDashboard />
      <InsuranceClientList />
      <AddClientModal />
      <EditClientModal />
      <ViewClientModal />
      <DeleteClientModal />
    </div>
  );
};

const InsuranceClients = (props) => {
  const [data, dispatch] = useReducer(insuranceClientReducer, insuranceClientState);
  return (
    <Fragment>
      <InsuranceClientContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<InsuranceClientComponent />} />
      </InsuranceClientContext.Provider>
    </Fragment>
  );
};

export default InsuranceClients;
