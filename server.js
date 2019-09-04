const Sequelize = require("sequelize");
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes")(app, PORT);
require("./routes/api-routes")(app);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log(`Server is listening on PORT ${PORT}`)
    })
})