const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000"
};

const app = express();
global.__basedir = __dirname;

app.use(cors(corsOptions));
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
    require("./src/routes/comment.routes")(app);
    require("./src/routes/user-info.routes")(app);
    require("./src/routes/recommend.routes")(app);

    // starting the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`[LOG] server started on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error("[ERROR] server connection failed.\n" + err);
  })

