export const blogState = {
  blogs: null,
  loading: false,
  addBlogModal: false,
  editBlogModal: false,
  blogFormData: {},
  blogToEdit: null,
  blogToDelete: null,
  deleteModal: false,
  statistics: null,
  currentPage: 1,
  totalPages: 1,
  searchTerm: "",
  statusFilter: "",
  categoryFilter: "",
  featuredFilter: "",
};

export const blogReducer = (state, action) => {
  switch (action.type) {
    case "setBlogs":
      return {
        ...state,
        blogs: action.payload.blogs,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    case "setLoading":
      return {
        ...state,
        loading: action.payload,
      };
    case "addBlogModalToggle":
      return {
        ...state,
        addBlogModal: action.payload,
        blogFormData: action.payload ? {} : state.blogFormData,
      };
    case "editBlogModalToggle":
      return {
        ...state,
        editBlogModal: action.payload,
        blogToEdit: action.payload ? action.blog : null,
        blogFormData: action.payload ? action.blog : {},
      };
    case "deleteModalToggle":
      return {
        ...state,
        deleteModal: action.payload,
        blogToDelete: action.payload ? action.blog : null,
      };
    case "setBlogFormData":
      return {
        ...state,
        blogFormData: {
          ...state.blogFormData,
          [action.name]: action.value,
        },
      };
    case "resetBlogFormData":
      return {
        ...state,
        blogFormData: {},
      };
    case "setStatistics":
      return {
        ...state,
        statistics: action.payload,
      };
    case "setSearchTerm":
      return {
        ...state,
        searchTerm: action.payload,
        currentPage: 1,
      };
    case "setStatusFilter":
      return {
        ...state,
        statusFilter: action.payload,
        currentPage: 1,
      };
    case "setCategoryFilter":
      return {
        ...state,
        categoryFilter: action.payload,
        currentPage: 1,
      };
    case "setFeaturedFilter":
      return {
        ...state,
        featuredFilter: action.payload,
        currentPage: 1,
      };
    case "setCurrentPage":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "addBlog":
      return {
        ...state,
        blogs: state.blogs ? [action.payload, ...state.blogs] : [action.payload],
        addBlogModal: false,
        blogFormData: {},
      };
    case "updateBlog":
      return {
        ...state,
        blogs: state.blogs
          ? state.blogs.map((blog) =>
              blog._id === action.payload._id ? action.payload : blog
            )
          : null,
        editBlogModal: false,
        blogToEdit: null,
        blogFormData: {},
      };
    case "deleteBlog":
      return {
        ...state,
        blogs: state.blogs
          ? state.blogs.filter((blog) => blog._id !== action.payload)
          : null,
        deleteModal: false,
        blogToDelete: null,
      };
    default:
      return state;
  }
};
