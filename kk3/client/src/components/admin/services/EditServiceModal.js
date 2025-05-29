import React, { Fragment, useContext, useState } from "react";
import { ServiceContext } from "./index";
import { editService, getAllServices } from "./FetchApi";

const EditServiceDetail = ({ service }) => {
  const { data, dispatch } = useContext(ServiceContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    serviceName: service?.serviceName || "",
    description: service?.description || "",
    price: service?.price || "",
    serviceType: service?.serviceType || "Basic Shop",
    status: service?.status || "Active",
    images: null,
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllServices();
    if (responseData && responseData.services) {
      dispatch({
        type: "fetchServicesAndChangeState",
        payload: responseData.services,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!fData.serviceName || !fData.description || !fData.price) {
      setFdata({ ...fData, error: "All fields are required", success: false });
      return;
    }

    if (fData.price <= 0) {
      setFdata({ ...fData, error: "Price must be greater than 0", success: false });
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", fData.serviceName);
    formData.append("description", fData.description);
    formData.append("price", fData.price);
    formData.append("serviceType", fData.serviceType);
    formData.append("status", fData.status);

    if (fData.images && fData.images.length > 0) {
      if (fData.images.length > 2) {
        setFdata({ ...fData, error: "Maximum 2 images allowed", success: false });
        return;
      }
      for (let i = 0; i < fData.images.length; i++) {
        formData.append("images", fData.images[i]);
      }
    }

    let responseData = await editService(service._id, formData);
    if (responseData && responseData.success) {
      setFdata({
        ...fData,
        success: responseData.message,
        error: false,
      });
      fetchData(); // Refresh the services list
      setTimeout(() => {
        dispatch({ type: "editServiceModal", payload: { modal: false, service: null } });
      }, 2000);
    } else if (responseData && responseData.error) {
      setFdata({ ...fData, error: responseData.error, success: false });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 2) {
      setFdata({ ...fData, error: "Maximum 2 images allowed", success: false });
      e.target.value = "";
      return;
    }
    setFdata({ ...fData, images: files, error: false, success: false });
  };

  return (
    <Fragment>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-between">
          <div className="text-2xl text-gray-700">Edit Service</div>
          <div
            onClick={(e) =>
              dispatch({ type: "editServiceModal", payload: { modal: false, service: null } })
            }
            className="text-gray-600 cursor-pointer hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <form className="my-4 space-y-4" onSubmit={submitForm}>
          {fData.success && alert(fData.success, "green")}
          {fData.error && alert(fData.error, "red")}

          <div className="flex flex-col space-y-1">
            <label htmlFor="serviceName">Service Name *</label>
            <input
              value={fData.serviceName}
              onChange={(e) =>
                setFdata({
                  ...fData,
                  error: false,
                  success: false,
                  serviceName: e.target.value,
                })
              }
              type="text"
              id="serviceName"
              className="px-4 py-2 border focus:outline-none"
              placeholder="Enter service name"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="description">Description *</label>
            <textarea
              value={fData.description}
              onChange={(e) =>
                setFdata({
                  ...fData,
                  error: false,
                  success: false,
                  description: e.target.value,
                })
              }
              id="description"
              rows="3"
              className="px-4 py-2 border focus:outline-none resize-none"
              placeholder="Enter service description"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="price">Price *</label>
            <input
              value={fData.price}
              onChange={(e) =>
                setFdata({
                  ...fData,
                  error: false,
                  success: false,
                  price: e.target.value,
                })
              }
              type="number"
              step="0.01"
              min="0"
              id="price"
              className="px-4 py-2 border focus:outline-none"
              placeholder="0.00"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="images">Images (1-2 images)</label>
            <input
              onChange={handleImageChange}
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="px-4 py-2 border focus:outline-none"
            />
            <small className="text-gray-500">Leave empty to keep current images</small>
          </div>

          <div className="flex space-x-2">
            <div className="w-1/2 flex flex-col space-y-1">
              <label htmlFor="status">Status</label>
              <select
                value={fData.status}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    status: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                id="status"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="w-1/2 flex flex-col space-y-1">
              <label htmlFor="serviceType">Service Type *</label>
              <select
                value={fData.serviceType}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    serviceType: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                id="serviceType"
              >
                <option value="Basic Shop">Basic Shop</option>
                <option value="Contact Now">Contact Now</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "editServiceModal", payload: { modal: false, service: null } })
              }
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Update Service
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const EditServiceModal = (props) => {
  const { data, dispatch } = useContext(ServiceContext);

  return (
    <Fragment>
      {data.editServiceModal && data.editServiceModal.modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditServiceDetail service={data.editServiceModal.service} />
        </div>
      )}
    </Fragment>
  );
};

export default EditServiceModal;
