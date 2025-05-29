const Blog = require("../models/Blog");
const fs = require('fs');
const path = require('path');

// Get all blogs (Public and Admin)
exports.getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', category = '', featured = '' } = req.query;
    const isAdmin = req.userDetails && req.userDetails.userRole === 1;

    // Build search query
    let query = {};

    // For public access, only show published blogs
    if (!isAdmin) {
      query.status = 'published';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Admin can filter by status, public users cannot
    if (status && isAdmin) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    if (featured !== '') {
      query.featured = featured === 'true';
    }

    const blogs = await Blog.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch blogs",
    });
  }
};

// Get single blog by ID (Public and Admin)
exports.getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const isAdmin = req.userDetails && req.userDetails.userRole === 1;

    let query = { _id: blogId };

    // For public access, only show published blogs
    if (!isAdmin) {
      query.status = 'published';
    }

    const blog = await Blog.findOne(query)
      .populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    // Increment view count for public access
    if (!isAdmin) {
      await Blog.findByIdAndUpdate(blogId, { $inc: { views: 1 } });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch blog",
    });
  }
};

// Create new blog (Admin only)
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      status,
      metaTitle,
      metaDescription,
      featured,
      allowComments,
    } = req.body;

    // Validation
    if (!title || !content || !excerpt || !category) {
      return res.status(400).json({
        success: false,
        error: "Title, content, excerpt, and category are required",
      });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        error: "A blog with this title already exists",
      });
    }

    const blog = new Blog({
      title,
      slug,
      content,
      excerpt,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status: status || "draft",
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      featured: featured === 'true',
      allowComments: allowComments !== 'false',
      author: req.userDetails._id,
      featuredImage: req.file ? `/uploads/blogs/${req.file.filename}` : null,
    });

    await blog.save();

    // Populate the created blog
    const populatedBlog = await Blog.findById(blog._id)
      .populate('author', 'name email');

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "A blog with this title already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to create blog",
    });
  }
};

// Update blog (Admin only)
exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const updateData = { ...req.body };

    // Add author as last updater
    updateData.lastUpdatedBy = req.userDetails._id;

    // Handle tags
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
    }

    // Handle boolean fields
    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === 'true';
    }
    if (updateData.allowComments !== undefined) {
      updateData.allowComments = updateData.allowComments !== 'false';
    }

    // Handle featured image
    if (req.file) {
      updateData.featuredImage = `/uploads/blogs/${req.file.filename}`;
    }

    // Update slug if title changed
    if (updateData.title) {
      const newSlug = updateData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if new slug conflicts with existing blogs (excluding current blog)
      const existingBlog = await Blog.findOne({ slug: newSlug, _id: { $ne: blogId } });
      if (existingBlog) {
        return res.status(400).json({
          success: false,
          error: "A blog with this title already exists",
        });
      }
      updateData.slug = newSlug;
    }

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "A blog with this title already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to update blog",
    });
  }
};

// Delete blog (Admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    // Delete featured image if exists
    if (blog.featuredImage) {
      const imagePath = path.join(__dirname, '../../public', blog.featuredImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete blog",
    });
  }
};

// Get blog statistics (Admin only)
exports.getBlogStatistics = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });
    const featuredBlogs = await Blog.countDocuments({ featured: true });

    // Get total views
    const viewsResult = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);
    const totalViews = viewsResult.length > 0 ? viewsResult[0].totalViews : 0;

    // Get category breakdown
    const categoryBreakdown = await Blog.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get recent blogs
    const recentBlogs = await Blog.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status createdAt author');

    res.status(200).json({
      success: true,
      statistics: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        featuredBlogs,
        totalViews,
        categoryBreakdown,
        recentBlogs,
      },
    });
  } catch (error) {
    console.error("Error fetching blog statistics:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch blog statistics",
    });
  }
};
