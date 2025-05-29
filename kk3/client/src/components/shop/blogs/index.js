import React, { Fragment, useContext } from "react";
import Layout from "../layout";
import { LayoutContext } from "../layout";
import { BlogsContext } from "./BlogsContext";
import { blogsState, blogsReducer } from "./BlogsContext";
import AllBlogs from "./AllBlogs";

const BlogsComponent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout>
        <div className="flex-grow">
          <AllBlogs />
        </div>
      </Layout>
    </div>
  );
};

const Blogs = () => {
  const { data: layoutData } = useContext(LayoutContext);
  const [data, dispatch] = React.useReducer(blogsReducer, blogsState);

  return (
    <Fragment>
      <BlogsContext.Provider value={{ data, dispatch }}>
        <BlogsComponent />
      </BlogsContext.Provider>
    </Fragment>
  );
};

export default Blogs;
