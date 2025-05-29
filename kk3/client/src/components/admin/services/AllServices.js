import React, { Fragment, useContext, useEffect } from "react";
import { ServiceContext } from "./index";
import { getAllServices, deleteService } from "./FetchApi";

const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

const AllServices = (props) => {
  const { data, dispatch } = useContext(ServiceContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await getAllServices();
    if (responseData && responseData.services) {
      dispatch({
        type: "fetchServicesAndChangeState",
        payload: responseData.services,
      });
    }
  };

  const deleteServiceReq = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      let responseData = await deleteService(serviceId);
      if (responseData && responseData.success) {
        fetchData(); // Refresh the list
      }
    }
  };

  const editService = (service) => {
    dispatch({ type: "editServiceModal", payload: { modal: true, service } });
  };

  if (data.loading) {
    return (
      <div className="col-span-1 flex justify-center items-center h-64">
        <div className="text-lg">Loading services...</div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Service Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Images</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.services && data.services.length > 0 ? (
              data.services.map((service, key) => {
                return (
                  <ServiceTable
                    service={service}
                    editService={() => editService(service)}
                    deleteService={() => deleteServiceReq(service._id)}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-8 text-gray-500 font-medium"
                >
                  No services found. Create your first service!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

/* Single Service Component */
const ServiceTable = ({ service, deleteService, editService }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-left">
          {service.serviceName.length > 20
            ? service.serviceName.slice(0, 20) + "..."
            : service.serviceName}
        </td>
        <td className="p-2 text-left">
          {service.description.length > 30
            ? service.description.slice(0, 30) + "..."
            : service.description}
        </td>
        <td className="p-2 text-center font-semibold">
          ${service.price}
        </td>
        <td className="p-2 text-center">
          {service.category?.cName || "N/A"}
        </td>
        <td className="p-2 text-center">
          <div className="flex space-x-1 justify-center">
            {service.images && service.images.map((image, index) => (
              <img
                key={index}
                className="w-8 h-8 object-cover object-center rounded"
                src={`${apiURL}/uploads/services/${image}`}
                alt={`Service ${index + 1}`}
              />
            ))}
          </div>
        </td>
        <td className="p-2 text-center">
          {service.status === "Active" ? (
            <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
              {service.status}
            </span>
          ) : (
            <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
              {service.status}
            </span>
          )}
        </td>
        <td className="p-2 text-center text-sm">
          {new Date(service.createdAt).toLocaleDateString()}
        </td>
        <td className="p-2">
          <div className="flex justify-center space-x-1">
            <span
              onClick={() => editService()}
              className="cursor-pointer hover:bg-gray-200 rounded-lg p-2"
              title="Edit"
            >
              <svg
                className="w-4 h-4 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </span>
            <span
              onClick={() => deleteService()}
              className="cursor-pointer hover:bg-gray-200 rounded-lg p-2"
              title="Delete"
            >
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </span>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllServices;
