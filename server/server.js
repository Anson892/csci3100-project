const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// connecting to the database
const db = require("./src/models");
db.sequelize.sync()//{ force: true }
  .then(() => {
    console.log("[LOG] database connected successfully.");

    //router
    require("./src/routes/user.routes")(app);
    require("./src/routes/product.routes")(app);
    require("./src/routes/order.routes")(app);

    app.all('/', (req,res) => {
      res.status(200).send("hello world");
    })

    // starting the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`[LOG] server started on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error("[ERROR] database connection failed.\n" + err);
  })

