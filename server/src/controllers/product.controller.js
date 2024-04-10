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

//product image crud also done with same controller?

// Add product: POST /api/product
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

//search product system
controller.search = async (req, res) => {
  const { searchpointer, name, category, orderby, order, minprice, maxprice, minrating, maxrating} = req.body;
  const name_key = "%" + name + "%";
  // const category_key = "%" + category + "%";
  var setoffset = 0;
  var setlimit = 15;
  if(searchpointer>0){
      var setoffset = 15 + 5*(searchpointer-1);
      var setlimit = 5;
  }
  const resultlist = [];
  where_clause = {
    name: {[Op.like]: name_key},
    price: {[Op.between]: [minprice, maxprice]},
  }
  if (category!="All"){
    where_clause.category = {[Op.eq]: category}
  }
  const search = await Product.findAll({
    attributes: [
      'id', 
      'price',
      [sequelize.literal(`(
        SELECT COALESCE(AVG(rating), 0.0)
        FROM Comments
        WHERE
            productId = Product.id
      )`), 'avgrating']
  ],
    where: where_clause,
    having: { 'avgrating': {[Op.between]: [minrating, maxrating]}},
    offset: setoffset,
    limit: setlimit,
    order: [[orderby, order]]
  })
  search.forEach(element => {
    resultlist.push(element.id)
  })
  res.send(resultlist)
}


// Get all product information with images: GET /api/product
controller.findAll = async (req, res) => {
  await Product.findAll({ include: ProductImage })
    .then((data) => {
      res.status(200).json({ message: "All products found!", data: data });
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};

//Show by category
controller.findbycategory = async (req, res) => {
  Product.findAll({
    where: {
      category: req.params.cate,
    },
  })
    .then((data) => {
      //console.log(data[0].id);
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

// find product by product id: GET /api/product/:productID
controller.findbyid = (req, res) => {
  //console.log(req.params.productID);
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

//find product by name
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

// update product
controller.update = (req, res) => {
  const { id, name, category, description, price, discount, stock } = req.body;
  Product.update({
    name: name,
    category: category,
    description: description,
    price: price,
    discount: discount,
    stock: stock,
  },{
    where: {
      id: id,
    },
  }).then((data) => {
      Product.findOne({where: { id: id }})
      .then((data) => {
        console.log("update successful!");
        res.send(data)
      })

    })
    .catch((err) => res.status(500).send(err));
};

// delete a product: DELETE /api/product/:productID
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

// get all product categories: GET /api/product/category
controller.getCategories = (req, res) => {
  Product.findAll({
    attributes: [
      [sequelize.fn("DISTINCT", sequelize.col("category")), "category"],
    ],
  })
    .then((data) => {
      resultlist = [];
      data.forEach(element => {
        resultlist.push(element.dataValues.category)
      })
      res.status(200).json(resultlist);
    })
    .catch((err) => res.status(500).json(err));
};

/*delete all product(not for use?)
controller.deleteAll = (req, res) => {
    Product.destroyAll().then(() => {
        console.log('All data deleted!');
      }).catch((err) => res.status(500).send(err))
};*/

module.exports = controller;
