const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 500,
    },
    featuredImage: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Technology",
        "Business",
        "Lifestyle",
        "Health",
        "Travel",
        "Food",
        "Fashion",
        "Sports",
        "Entertainment",
        "Education",
        "News",
        "Other"
      ],
      default: "Other",
    },
    tags: [{
      type: String,
      trim: true,
    }],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    metaTitle: {
      type: String,
      maxlength: 60,
    },
    metaDescription: {
      type: String,
      maxlength: 160,
    },
    readingTime: {
      type: Number, // in minutes
      default: 1,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    allowComments: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
blogSchema.index({ 
  title: "text", 
  content: "text", 
  excerpt: "text",
  tags: "text"
});

// Index for slug uniqueness
blogSchema.index({ slug: 1 }, { unique: true });

// Index for published blogs
blogSchema.index({ status: 1, publishedAt: -1 });

// Virtual for formatted publish date
blogSchema.virtual('formattedPublishDate').get(function() {
  if (this.publishedAt) {
    return this.publishedAt.toLocaleDateString();
  }
  return null;
});

// Virtual for reading time calculation
blogSchema.virtual('estimatedReadingTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(' ').length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Pre-save middleware to generate slug
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // Calculate reading time
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(' ').length;
    this.readingTime = Math.ceil(wordCount / wordsPerMinute);
  }
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
