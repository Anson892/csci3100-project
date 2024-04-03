const config = require("../config/db.config.js");
const Sequelize = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD,{host:config.HOST,port: 8080, dialect: config.dialect});


//module
const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.User;
const UserInfo = db.UserInfo;
const Product = db.Product;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Comment = db.Comment;

//insert data
//User
async function import_user(){
    const fileContent = fs.readFileSync("./user.csv", 'utf8');
      const lines = fileContent.split("\r\n");
      const dataLines = lines.slice(2, lines.length); //remover headers
      const Users = [];
      dataLines.forEach((dataLines) =>{
        console.log(dataLines)
          const columns = dataLines.split(",");
          let user ={
              username: columns[0],
              password: columns[1],
              userType: columns[2]
          }
          Users.push(user);
      });
      try{
        let result = await User.bulkCreate(Users);
        let generatedIds = result.map(el => el.dataValues.id);
        console.log("generatedIds", generatedIds);
      }catch(e){
          console.error(e);
      }
  }
  import_user();

//UserInfo
async function import_userInfo(){
    const fileContent = fs.readFileSync("./userInfo.csv", 'utf8');
      const lines = fileContent.split("\r\n");
      const dataLines = lines.slice(2, lines.length); //remover headers
      const Info = [];
      dataLines.forEach((dataLines) =>{
        console.log(dataLines)
          const columns = dataLines.split(",");
          let userinfo ={
              firstName: columns[0],
              lastName: columns[1],
              address: columns[2],
              city: columns[3],
              country: columns[4],
              zipCode: columns[5],
              phoneNumber: columns[6],
              userId: columns[7],
          }
          Info.push(userinfo);
      });
      try{
        let result = await UserInfo.bulkCreate(Info);
        let generatedIds = result.map(el => el.dataValues.id);
        console.log("generatedIds", generatedIds);
      }catch(e){
          console.error(e);
      }
  }
  import_userInfo();

//Product
async function import_Product(){
    const fileContent = fs.readFileSync("./product.csv", 'utf8');
      const lines = fileContent.split("\r\n");
      const dataLines = lines.slice(2, lines.length); //remover headers
      const Products = [];
      dataLines.forEach((dataLines) =>{
        console.log(dataLines)
          const columns = dataLines.split(",");
          let product ={
              name: columns[0],
              category: columns[1],
              description: columns[2],
              price: columns[3],
              discount: columns[4],
              stock: columns[5]
          }
          Products.push(product);
      });
      try{
        let result = await Product.bulkCreate(Products);
        let generatedIds = result.map(el => el.dataValues.id);
        console.log("generatedIds", generatedIds);
      }catch(e){
          console.error(e);
      }
  }
  import_Product();

//order
async function import_Order(){
    const fileContent = fs.readFileSync("./order.csv", 'utf8');
      const lines = fileContent.split("\r\n");
      const dataLines = lines.slice(2, lines.length); //remover headers
      const Orders = [];
      dataLines.forEach((dataLines) =>{
        console.log(dataLines)
          const columns = dataLines.split(",");
          let order ={
              status: columns[0],
              paymentMethod: columns[1],
              userId: columns[2],
              userInfoId: columns[3]
          }
          Orders.push(order);
      });
      try{
        let result = await Order.bulkCreate(Orders);
        let generatedIds = result.map(el => el.dataValues.id);
        console.log("generatedIds", generatedIds);
      }catch(e){
          console.error(e);
      }
  }
  import_Order();

//orderItem
async function import_OrderItem(){
    const fileContent = fs.readFileSync("./orderitem.csv", 'utf8');
      const lines = fileContent.split("\r\n");
      const dataLines = lines.slice(2, lines.length); //remover headers
      const Itemlist = [];
      dataLines.forEach((dataLines) =>{
        console.log(dataLines)
          const columns = dataLines.split(",");
          let item ={
              orderId: columns[0],
              productId: columns[1],
              price: columns[2],
              quantity: columns[3]
          }
          Itemlist.push(item);
      });
      try{
        let result = await OrderItem.bulkCreate(Itemlist);
        let generatedIds = result.map(el => el.dataValues.id);
        console.log("generatedIds", generatedIds);
      }catch(e){
          console.error(e);
      }
  }
  import_OrderItem();

//comment
async function import_Comment(){
    const fileContent = fs.readFileSync("./comment.csv", 'utf8');
      const lines = fileContent.split("\r\n");
      const dataLines = lines.slice(2, lines.length); //remover headers
      const Commentlist = [];
      dataLines.forEach((dataLines) =>{
        console.log(dataLines)
          const columns = dataLines.split(",");
          let comment ={
              username: columns[0],
              rating: columns[1],
              content: columns[2],
              userId: columns[3],
              productId: columns[4],
              orderId: columns[5],
          }
          Commentlist.push(comment);
      });
      try{
        let result = await Comment.bulkCreate(Commentlist);
        let generatedIds = result.map(el => el.dataValues.id);
        console.log("generatedIds", generatedIds);
      }catch(e){
          console.error(e);
      }
  }
  import_Comment();
