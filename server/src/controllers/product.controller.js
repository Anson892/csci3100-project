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
      const path =
        __basedir + "/resources/static/assets/uploads/" + image.filename;

      // move image to uploads folder
      fs.rename(image.path, path, (err) => {
        if (err) {
          res.status(500).json({
            error: "Could not move the image to the uploads folder.",
          });
        }
      });

      // create a product image record
      await ProductImage.create({
        productId: product.id,
        name: image.originalname,
        path: path,
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
  const category_key = "%" + category + "%";
  const setoffset = 0;
  const setlimit = 15;
  if(searchpointer>0){
      const setoffset = 15 + 5*(searchpointer-1);
      const setlimit = 5;
  }
  const resultlist = [];
  const ignorelist = [];
  if(orderby=="avgrating"){
    await Comment.findAll({
      attributes: ['productId', [sequelize.fn('AVG', sequelize.col('rating')), 'avgrating']],
      group: 'productId',
      include: [{
        model: Product,
        attributes: ['name', 'category', 'price', 'discount'],
        where:{
          [Op.or]: [{name: {[Op.like]: name_key}},
                    {id: {[Op.like]: name_key}}],
          category: {[Op.like]: category_key},
          price: {[Op.between]: [minprice, maxprice]}
        }
      }],
      order: [['avgrating', order]],
      offset: setoffset,
      limit: setlimit
        }).then(async (data) => {
          data.forEach(element => {
            resultlist.push(element);
            ignorelist.push(element.productId);
          });
          if(data.length<setlimit){
            const remainlimit = setlimit - data.length;
            await Product.findAll({
              attributes: ['id', 'name', 'category', 'price', 'discount'],
              where: {
                [Op.or]: [{name: {[Op.like]: name_key}},
                    {id: {[Op.like]: name_key}}],
                id: {[Op.notIn]: ignorelist},
                category: {[Op.like]: category_key},
                price: {[Op.between]: [minprice, maxprice]}
              },
              order: [['name', order]],
              limit: remainlimit
            }).then((data) => {
              data.forEach(element => {
                const result = {
                  "productId": element.id,
                  "avgrating": 0,
                  "product": {
                    "name": element.name,
                    "category": element.category,
                    "price": element.price,
                    "discount": element.discount
                  }
                };
                resultlist.push(result);
              });
              res.send(resultlist)
            })
          }else{
            res.send(resultlist)
          }
        }).catch((err) => res.status(500).send(err))
    }else{
      await Comment.findAll({
        attributes: ['productId', [sequelize.fn('AVG', sequelize.col('rating')), 'avgrating']],
        group: 'productId',
        include: [{
          model: Product,
          attributes: ['name', 'category', 'price', 'discount'],
          where:{
            [Op.or]: [{name: {[Op.like]: name_key}},
                    {id: {[Op.like]: name_key}}],
            category: {[Op.like]: category_key},
            price: {[Op.between]: [minprice, maxprice]}
          }
        }],
        order: [[Product, 'price', order]]
          }).then(async (data) => {
            data.forEach(element => {
              resultlist.push(element);
              ignorelist.push(element.productId);
            });
            if(data.length<setlimit){
              const remainlimit = setlimit - data.length;
              await Product.findAll({
                attributes: ['id', 'name', 'category', 'price', 'discount'],
                where: {
                  [Op.or]: [{name: {[Op.like]: name_key}},
                    {id: {[Op.like]: name_key}}],
                  id: {[Op.notIn]: ignorelist},
                  category: {[Op.like]: category_key},
                  price: {[Op.between]: [minprice, maxprice]}
                },
                order: [['price', order]],
                limit: remainlimit
              }).then((data) => {
                data.forEach(element => {
                  const result = {
                    "productId": element.id,
                    "avgrating": 0,
                    "product": {
                      "name": element.name,
                      "category": element.category,
                      "price": element.price,
                      "discount": element.discount
                    }
                  };
                  resultlist.push(result);
                });
                res.send(resultlist)
              })
            }else{
              res.send(resultlist)
            }
          }).catch((err) => res.status(500).send(err))
    }
}

//global recommand
controller.recommand = async (req, res) => {
  const { id, category, order } = req.body;
  const resultlist = [];
  const ignorelist = [];
  ignorelist.push(id);
  await Comment.findAll({
    attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgrating']],
    group: 'productId',
    order: [['avgrating', order]],
    include: [{
      model: Product,
      attributes: ['id'],
      where: {
        id: {[Op.ne]: id},
        category: category
      }
    }],
    limit: 5
      }).then(async (data) => {
        data.forEach(element => {
          resultlist.push(element);
          ignorelist.push(element.productId);
        });
        if(data.length<5){
          const remainlimit = 5 - data.length;
          await Product.findAll({
            attributes: ['id'],
            where: {
              id: {[Op.notIn]: ignorelist},
              category: category
            },
            order: [[Product, 'price', 'ASC']],
            limit: remainlimit
          }).then((data) => {
            data.forEach(element => {
              const result = {
                "avgrating": 0,
                "product": {
                  "id": element.id
                }
              };
              resultlist.push(result);
            });
            res.send(resultlist)
          })
        }else{
          res.send(resultlist)
        }
      }).catch((err) => res.status(500).send(err))
}

//User recommandation
controller.userrecommand = async (req, res) => {
  const {id} = req.body;
  await Order.findAll({
    attributes: ['id'],
    where: {userId: id}
  }).then(async (data) => {
    const relatelist = [];
    data.forEach(element => {
      relatelist.push(element.id);
    });
    await OrderItem.findAll({
      attributes: ['productId'],
      where: {
        orderId: {[Op.in]: relatelist}
      },
      include:[{
        model: Product,
        attributes: ['category']
      }]
    }).then(async (data) => {
      const categorylist = []
      const ignorelist = []
      data.forEach(element => {
        categorylist.push(element.product.category)
        ignorelist.push(element.productId)
      })
      await Product.findAll({
        attributes: ['id', 'name', 'category', 'price', 'stock'],
        where: {
          id: {[Op.notIn]: ignorelist},
          category: {[Op.in]: categorylist}
        },
        order: [['price', 'ASC']],
        limit: 6
      }).then(async (data) => {
        const resultlist = [];
        data.forEach(element => {
          resultlist.push(element);
        })
        if(data.length<6){
          const remainlimit = 6 - data.length;
          await Product.findAll({
            attributes: ['id', 'name', 'category', 'price', 'stock'],
            where: {
              id: {[Op.notIn]: ignorelist},
            },
            order: [[Product, 'price', 'ASC']],
            limit: remainlimit
          }).then((data) => {
            data.forEach(element => {
              resultlist.push(data);
            });
            res.send(resultlist)
          })
        }else{
          res.send(resultlist)
        }
      })
    })
  }).catch((err) => res.status(500).send(err))
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

/*delete all product(not for use?)
controller.deleteAll = (req, res) => {
    Product.destroyAll().then(() => {
        console.log('All data deleted!');
      }).catch((err) => res.status(500).send(err))
};*/

module.exports = controller;
