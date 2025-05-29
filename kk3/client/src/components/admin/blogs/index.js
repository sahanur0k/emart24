import React, { Fragment, createContext, useReducer, useEffect, useContext } from "react";
import AdminLayout from "../layout";
import BlogMenu from "./BlogMenu";
import BlogTable from "./BlogTable";
import BlogFormModal from "./BlogFormModal";
import BlogDeleteModal from "./BlogDeleteModal";
import { blogState, blogReducer } from "./BlogContext";
import { fetchAllBlogs, fetchBlogStatistics } from "./Action";

/* This context manages all of the blog component's data */
export const BlogContext = createContext();

const BlogComponent = () => {
  const { data, dispatch } = useContext(BlogContext);

  // Fetch blogs when filters change
  useEffect(() => {
    fetchAllBlogs(
      dispatch,
      data.currentPage,
      data.searchTerm,
      data.statusFilter,
      data.categoryFilter,
      data.featuredFilter
    );
  }, [
    data.currentPage,
    data.searchTerm,
    data.statusFilter,
    data.categoryFilter,
    data.featuredFilter,
    dispatch,
  ]);

  // Fetch statistics on component mount
  useEffect(() => {
    fetchBlogStatistics(dispatch);
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <BlogMenu />
      <BlogTable />
      <BlogFormModal />
      <BlogDeleteModal />
    </div>
  );
};

const Blogs = (props) => {
  const [data, dispatch] = useReducer(blogReducer, blogState);

  return (
    <Fragment>
      <BlogContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<BlogComponent />} />
      </BlogContext.Provider>
    </Fragment>
  );
};

export default Blogs;
