import React, { Fragment } from "react";

import AdminNavber from "../partials/AdminNavber";
import AdminSidebar from "../partials/AdminSidebar";
import AdminFooter from "../partials/AdminFooter";

const AdminLayout = ({ children }) => {
  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        <AdminNavber />
        <section className="flex flex-1 bg-gray-100">
          <AdminSidebar />
          <div className="w-full md:w-11/12 flex-1 pb-20">
            {/* All Children pass from here */}
            {children}
          </div>
        </section>
        <AdminFooter />
      </div>
    </Fragment>
  );
};

export default AdminLayout;
