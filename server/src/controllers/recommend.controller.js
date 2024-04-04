const db = require("../models");
const sequelize = require("sequelize");
const Product = db.Product;
const Comment = db.Comment;
const Order = db.Order;
const OrderItem = db.OrderItem;
const User = db.User;
const Op = db.Sequelize.Op;
const controller = {};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
}


const findBestRatedProducts = async (category, ignorelist, limit) => {
  where_clause = { id: { [Op.notIn]: ignorelist } };
  // if category is not null, add category to where clause
  if (category !== null) {
    where_clause.category = category;
  }

  return await Comment.findAll({
    attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "avgrating"]],
    group: "productId",
    order: [["avgrating", "DESC"]],
    include: [
      {
        model: Product,
        attributes: ["id"],
        where: where_clause,
      },
    ],
    limit: limit,
  });
};

// helper function for finding random products
const findRandomProducts = async (category, ignorelist, limit) => {
  where_clause = { id: { [Op.notIn]: ignorelist } };
  // if category is not null, add category to where clause
  if (category !== null) {
    where_clause.category = category;
  }

  return await Product.findAll({
    attributes: ["id"],
    where: where_clause,
    order: sequelize.literal("rand()"),
    limit: limit,
  });
};

// helper function for finding the cheapest products
const findCheapestProducts = async (category, ignorelist, limit) => {
  where_clause = { id: { [Op.notIn]: ignorelist } };
  // if category is not null, add category to where clause
  if (category !== null) {
    where_clause.category = category;
  }

  return await Product.findAll({
    attributes: ["id"],
    where: where_clause,
    order: [["price", "ASC"]],
    limit: limit,
  });
};

// Global recommendation
controller.getRecommend = async (req, res) => {
  try {
    const resultlist = [];
    const ignorelist = [];
    // find the best rated products in terms of avg rating
    const bestRatedProduct = await findBestRatedProducts(null, [], 6);
    // add to result list and ignore list
    bestRatedProduct.forEach((element) => {
      resultlist.push({ productId: element.product.id });
      ignorelist.push(element.product.id);
    });

    // if there are less than 4 products in the result list,
    // fill the rest with random products
    if (resultlist.length < 6) {
      const remainlimit = 6 - resultlist.length;
      const randomProduct = await findRandomProducts(null, ignorelist, remainlimit);
      randomProduct.forEach((element) => {
        resultlist.push({ productId: element.id });
        ignorelist.push(element.id);
      });
    }

    shuffle(resultlist);
    // send the result list
    res.status(200).json(resultlist);
  } catch (err) {
    res.status(500).json({
      error:
        err.message || "Some error occurred while retrieving recommendations.",
    });
  }
};

// User-based recommendation
controller.getUserRecommend = async (req, res) => {
  const { userId } = req.params;

  try {
    /* Find the user's faviroute category */
    // Find the user's past orders
    const pastOrders = await Order.findAll({
      attributes: ["id"],
      where: { userId: userId },
    });

    // Find the user's past order items
    const pastOrderItems = await OrderItem.findAll({
      attributes: ["productId"],
      where: {
        orderId: { [Op.in]: pastOrders.map((order) => order.id) },
      },
      include: [
        {
          model: Product,
          attributes: ["category"],
        },
      ],
    });
    // Sort categories by frequency
    const categoryFrequency = {};
    pastOrderItems.forEach((element) => {
      if (element.product.category in categoryFrequency) {
        categoryFrequency[element.product.category] += 1;
      } else {
        categoryFrequency[element.product.category] = 1;
      }
    });
    const sortedCategories = Object.keys(categoryFrequency).sort(
      (a, b) => categoryFrequency[b] - categoryFrequency[a]
    );

    // Find 6 products
    // 1, 2, Find the best rated product in the user's favourite categories
    // 3. Find the best rated product in general
    // 4. random products
    const resultlist = [];
    const ignorelist = [];

    for (let i = 0; i < sortedCategories.length && resultlist.length <= 3; i++) {
      const bestRatedProduct = await findBestRatedProducts(
        sortedCategories[i],
        ignorelist,
        1
      );
      bestRatedProduct.forEach((element) => {
        resultlist.push({ productId: element.product.id });
        ignorelist.push(element.product.id);
      });
    }

    // Find the best rated products in general
    const bestRatedProduct = await findBestRatedProducts(null, ignorelist, 2);
    bestRatedProduct.forEach((element) => {
      resultlist.push({ productId: element.product.id });
      ignorelist.push(element.product.id);
    });

    // If there are less than 4 products in the result list,
    // fill the rest with the random products
    if (resultlist.length < 6) {
      const remainlimit = 6 - resultlist.length;
      const randomProduct = await findRandomProducts(null, ignorelist, remainlimit);
      randomProduct.forEach((element) => {
        resultlist.push({ productId: element.id });
        ignorelist.push(element.id);
      });
    }

    shuffle(resultlist);
    // send the result list
    res.status(200).json(resultlist);
  } catch (err) {
    res.status(500).json({
      error:
        err.message ||
        "Some error occurred while retrieving user recommendations.",
    });
  }
};

// Product-based recommendation
controller.relatedProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the product's category
    const product = await Product.findOne({
      attributes: ["category"],
      where: { id: productId },
    });
    const category = product.category;

    const resultlist = [];
    const ignorelist = [];
    ignorelist.push(productId);

    // Find the best rated products in the same category
    const bestRatedRelatedProduct = await findBestRatedProducts(
      category,
      ignorelist,
      5
    );
    // Add to result list and ignore list
    bestRatedRelatedProduct.forEach((element) => {
      resultlist.push({ productId: element.product.id });
      ignorelist.push(element.product.id);
    });

    // If there are less than 5 products in the result list,
    // fill the rest with the cheapest products in the same category
    if (resultlist.length < 5) {
      const remainlimit = 5 - resultlist.length;
      const cheapestRelatedProduct = await findCheapestProducts(
        category,
        ignorelist,
        remainlimit
      );
      cheapestRelatedProduct.forEach((element) => {
        resultlist.push({ productId: element.id });
        ignorelist.push(element.id);
      });
    }

    // If there are less than 5 products in the result list,
    // fill the rest with the random products
    if (resultlist.length < 5) {
      const remainlimit = 5 - resultlist.length;
      const randomProduct = await findRandomProducts(null, ignorelist, remainlimit);
      randomProduct.forEach((element) => {
        resultlist.push({ productId: element.id });
        ignorelist.push(element.id);
      });
    }

    shuffle(resultlist);
    // send the result list
    res.status(200).json(resultlist);
  } catch (err) {
    res.status(500).json({
      error:
        err.message || "Some error occurred while retrieving related products.",
    });
  }
};

module.exports = controller;
