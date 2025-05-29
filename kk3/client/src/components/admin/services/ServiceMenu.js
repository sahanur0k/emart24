import React, { Fragment, useContext } from "react";
import { ServiceContext } from "./index";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";

const ServiceMenu = (props) => {
  const { dispatch } = useContext(ServiceContext);

  return (
    <Fragment>
      <div className="col-span-1 flex items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center w-full">
          {/* It's open the add service modal */}
          <div
            style={{ background: "#303031" }}
            onClick={(e) =>
              dispatch({ type: "addServiceModal", payload: true })
            }
            className="cursor-pointer rounded-full p-2 md:p-4 text-white text-center font-medium"
          >
            Add Service
          </div>
          <div className="font-bold text-sm md:text-xl text-gray-700">
            Services ({props.totalServices || 0})
          </div>
        </div>
      </div>
      <AddServiceModal />
      <EditServiceModal />
    </Fragment>
  );
};

export default ServiceMenu;
