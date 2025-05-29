import React, { Fragment, useContext, useEffect } from "react";
import { InsuranceContext } from "./index";
import { getAllInsurances, deleteInsurance } from "./FetchApi";

const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

const AllInsurances = (props) => {
  const { data, dispatch } = useContext(InsuranceContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await getAllInsurances();
    if (responseData && responseData.insurances) {
      dispatch({
        type: "fetchInsurancesAndChangeState",
        payload: responseData.insurances,
      });
    }
  };

  const deleteInsuranceReq = async (insuranceId) => {
    if (window.confirm("Are you sure you want to delete this insurance?")) {
      let responseData = await deleteInsurance(insuranceId);
      if (responseData && responseData.success) {
        fetchData(); // Refresh the list
      }
    }
  };

  const editInsurance = (insurance) => {
    dispatch({ type: "editInsuranceModal", payload: { modal: true, insurance } });
  };

  if (data.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading insurances...</div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Insurance Name</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Duration</th>
              <th className="px-4 py-2 border">Images</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.insurances && data.insurances.length > 0 ? (
              data.insurances.map((insurance, key) => {
                return (
                  <InsuranceTable
                    insurance={insurance}
                    editInsurance={() => editInsurance(insurance)}
                    deleteInsurance={() => deleteInsuranceReq(insurance._id)}
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
                  No insurances found. Create your first insurance!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

/* Single Insurance Component */
const InsuranceTable = ({ insurance, deleteInsurance, editInsurance }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-left">
          {insurance.insuranceName.length > 20
            ? insurance.insuranceName.slice(0, 20) + "..."
            : insurance.insuranceName}
        </td>
        <td className="p-2 text-center">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            {insurance.insuranceType}
          </span>
        </td>
        <td className="p-2 text-center font-semibold">
          ${insurance.price}
        </td>
        <td className="p-2 text-center">
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
            {insurance.duration}
          </span>
        </td>
        <td className="p-2 text-center">
          <div className="flex space-x-1 justify-center">
            {insurance.images && insurance.images.map((image, index) => (
              <img
                key={index}
                className="w-8 h-8 object-cover object-center rounded"
                src={`${apiURL}/uploads/insurances/${image}`}
                alt={insurance.insuranceName}
              />
            ))}
            {(!insurance.images || insurance.images.length === 0) && (
              <span className="text-gray-400 text-xs">No images</span>
            )}
          </div>
        </td>
        <td className="p-2 text-center">
          <span className={`px-2 py-1 rounded text-xs ${
            insurance.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
            {insurance.status}
          </span>
        </td>
        <td className="p-2 text-center text-sm">
          {new Date(insurance.createdAt).toLocaleDateString()}
        </td>
        <td className="p-2">
          <div className="flex justify-center space-x-1">
            <span
              onClick={() => editInsurance()}
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
              onClick={() => deleteInsurance()}
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

export default AllInsurances;
