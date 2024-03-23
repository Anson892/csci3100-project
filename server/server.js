const express = require("express");

const app = express();
global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// connecting to the database
const db = require("./src/models");
db.sequelize.sync()//{ force: true }
  .then(() => {
    console.log("[LOG] database connected successfully.");

    // router
    require("./src/routes/user.routes")(app);
    require("./src/routes/product.routes")(app);
    require("./src/routes/order.routes")(app);
    require("./src/routes/cart.routes")(app);
    require("./src/routes/Auth.routes")(app);

    // starting the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`[LOG] server started on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error("[ERROR] server connection failed.\n" + err);
  })

