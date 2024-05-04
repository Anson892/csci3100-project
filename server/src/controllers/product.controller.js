const fs = require("fs");
const db = require("../models");
const sequelize = require("sequelize");
const Product = db.Product;
const ProductImage = db.ProductImage;
const Comment = db.Comment;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Op = db.Sequelize.Op;
const uploadFiles = require("../middlewares/upload");
const controller = {};

/**
 * Create a new product
 * API: POST http://localhost:8080/api/product
 * Request: {name, category, description, price, discount, stock, files}
 * Response: {message, data: {productId, name, category, description, price, discount, stock, product_images:[{path}]}
 */
controller.create = async (req, res, next) => {
  console.log("[LOG] Creating product with data =", req.body);
  // product information
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const price = req.body.price;
  const discount = req.body.discount;
  const stock = req.body.stock;
  // images
  const images = req.files;

  // Create a product
  const product = await Product.create({
    name: name,
    category: category,
    description: description,
    price: price,
    discount: discount,
    stock: stock,
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });

  // Add images to the product
  if (images) {
    for (const image of images) {
      // create a product image record
      await ProductImage.create({
        productId: product.id,
        name: image.originalname,
        path: image.filename,
      }).catch((err) => {
        res.status(500).json({
          error:
            err.message ||
            "Some error occurred while creating the product image.",
        });
      });
    }
  }

  // send response (with images)
  await Product.findByPk(product.id, { include: ProductImage })
    .then((data) => {
      res.status(200).json({ message: "Product created!", data: data });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

/**
 * Search products (15 products on first page, 5 products on next pages)
 * API: POST http://localhost:8080/api/product/search
 * Request: {searchpointer, name, category, orderby, order, minprice, maxprice, minrating, maxrating}
 * Response: [productId]
 */
controller.search = async (req, res) => {
  const {
    searchpointer,
    name,
    category,
    orderby,
    order,
    minprice,
    maxprice,
    minrating,
    maxrating,
  } = req.body;
  const name_key = "%" + name + "%";
  var setoffset = 0;
  var setlimit = 15;
  if (searchpointer > 0) {
    var setoffset = 15 + 5 * (searchpointer - 1);
    var setlimit = 5;
  }
  const resultlist = [];
  where_clause = {
    name: { [Op.like]: name_key },
    price: { [Op.between]: [minprice, maxprice] },
  };
  if (category != "All" && category != "") {
    where_clause.category = { [Op.eq]: category };
  }
  const search = await Product.findAll({
    attributes: [
      "id",
      "price",
      [
        sequelize.literal(`(
        SELECT COALESCE(AVG(rating), 0.0)
        FROM Comments
        WHERE
            productId = Product.id
      )`),
        "avgrating",
      ],
    ],
    where: where_clause,
    having: { avgrating: { [Op.between]: [minrating, maxrating] } },
    offset: setoffset,
    limit: setlimit,
    order: [[orderby, order]],
  });
  search.forEach((element) => {
    resultlist.push(element.id);
  });
  res.send(resultlist);
};

/**
 * Find all products (with images)
 * API: GET http://localhost:8080/api/product
 * Response: [{productId, name, category, description, price, discount, stock, product_images:[{path}]
 */
controller.findAll = async (req, res) => {
  await Product.findAll({ include: ProductImage })
    .then((data) => {
      res.status(200).json({ message: "All products found!", data: data });
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};

/**
 * Find products by category
 * API: GET http://localhost:8080/api/product/category/:cate
 * Response: [{productId, name, category, description, price, discount, stock, product_images:[{path}]
 * */
controller.findbycategory = async (req, res) => {
  Product.findAll({
    where: {
      category: req.params.cate,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

/**
 * Get all existing categories of products
 * API: GET http://localhost:8080/api/product/category
 * Response: [category]
 */
controller.getCategories = (req, res) => {
  Product.findAll({
    attributes: [
      [sequelize.fn("DISTINCT", sequelize.col("category")), "category"],
    ],
  })
    .then((data) => {
      resultlist = [];
      data.forEach((element) => {
        resultlist.push(element.dataValues.category);
      });
      res.status(200).json(resultlist);
    })
    .catch((err) => res.status(500).json(err));
};

/**
 * Find product by id
 * API: GET http://localhost:8080/api/product/:productID
 * Response: {productId, name, category, description, price, discount, stock, product_images:[{path}]}
 */
controller.findbyid = (req, res) => {
  Product.findOne({
    where: {
      id: req.params.productID,
    },
    include: ProductImage,
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res.status(200).json({ message: "Product found!", data: data });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

/** 
 * Find product by name
 * API: GET http://localhost:8080/api/product/name/:productname
 * Response: {productId, name, category, description, price, discount, stock, product_images:[{path}]}
 */
controller.findbyname = (req, res) => {
  Product.findOne({
    where: {
      name: req.params.productname,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

/**
 * Update product information of a product by id
 * API: PUT http://localhost:8080/api/product/update
 * Request: {id, name, category, description, price, discount, stock}
 * Response: {productId, name, category, description, price, discount, stock}
 */
controller.update = (req, res) => {
  const { id, name, category, description, price, discount, stock } = req.body;
  Product.update(
    {
      name: name,
      category: category,
      description: description,
      price: price,
      discount: discount,
      stock: stock,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((data) => {
      Product.findOne({ where: { id: id } }).then((data) => {
        console.log("update successful!");
        res.send(data);
      });
    })
    .catch((err) => res.status(500).send(err));
};

/** 
 * Delete a product by id
 * API: DELETE http://localhost:8080/api/product/:productID
 * Response: {message}
*/
controller.delete = (req, res) => {
  console.log("[LOG] Updating product with id =", req.params.productID);
  const id = req.params.productID;

  Product.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (data === null) {
        res.status(404).send({
          message: "Cannot find product with id =" + id,
        });
      } else {
        data.destroy().then(() => {
          res.status(200).send({
            message: "Product with id=" + id + " deleted!",
          });
          console.log("[LOG] Deleted Product with id =", id);
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving product with id=" + id,
      });
    });
};

module.exports = controller;
