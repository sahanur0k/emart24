const fs = require("fs");

const categoriesFolder = "./public/uploads/categories";
const customizeFolder = "./public/uploads/customize";
const productsFolder = "./public/uploads/products";
const servicesFolder = "./public/uploads/services";
const logoFolder = "./public/uploads/logo";
const blogsFolder = "./public/uploads/blogs";

const CreateAllFolder = () => {
  if (!fs.existsSync(categoriesFolder)) {
    fs.mkdirSync(categoriesFolder, {
      recursive: true,
    });
  }

  if (!fs.existsSync(customizeFolder)) {
    fs.mkdirSync(customizeFolder, {
      recursive: true,
    });
  }

  if (!fs.existsSync(productsFolder)) {
    fs.mkdirSync(productsFolder, {
      recursive: true,
    });
  }

  if (!fs.existsSync(servicesFolder)) {
    fs.mkdirSync(servicesFolder, {
      recursive: true,
    });
  }

  if (!fs.existsSync(logoFolder)) {
    fs.mkdirSync(logoFolder, {
      recursive: true,
    });
  }

  if (!fs.existsSync(blogsFolder)) {
    fs.mkdirSync(blogsFolder, {
      recursive: true,
    });
  }
};

module.exports = CreateAllFolder;
