const express = require("express");

const app = express();

// connecting to the database
const db = require("./src/models");
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("[LOG] database connected successfully.");

    require("./src/routes/user.routes")(app);
    // starting the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`[LOG] server started on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error("[ERROR] database connection failed.\n" + err);
  })

