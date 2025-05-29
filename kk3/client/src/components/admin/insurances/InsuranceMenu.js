import React, { Fragment, useContext } from "react";
import { InsuranceContext } from "./index";
import AddInsuranceModal from "./AddInsuranceModal";
import EditInsuranceModal from "./EditInsuranceModal";

const InsuranceMenu = (props) => {
  const { dispatch } = useContext(InsuranceContext);

  return (
    <Fragment>
      <div className="col-span-1 flex items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center w-full">
          {/* It's open the add insurance modal */}
          <div
            style={{ background: "#303031" }}
            onClick={(e) =>
              dispatch({ type: "addInsuranceModal", payload: true })
            }
            className="cursor-pointer rounded-full p-2 md:p-4 text-white text-center font-medium"
          >
            Add Insurance
          </div>
          <div className="font-bold text-sm md:text-xl text-gray-700">
            Insurances ({props.totalInsurances || 0})
          </div>
        </div>
      </div>
      <AddInsuranceModal />
      <EditInsuranceModal />
    </Fragment>
  );
};

export default InsuranceMenu;
