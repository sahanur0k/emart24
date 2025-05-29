import { createContext } from "react";

export const blogsState = {
  blogs: [],
  loading: false,
  error: null,
  selectedBlog: null,
};

export const blogsReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    case "setBlogs":
      return {
        ...state,
        blogs: action.payload,
        loading: false,
        error: null,
      };
    case "setBlog":
      return {
        ...state,
        selectedBlog: action.payload,
        loading: false,
        error: null,
      };
    case "setError":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const BlogsContext = createContext();
