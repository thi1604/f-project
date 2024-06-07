const express = require("express");
const app = express();
const routeClient = require("./routes/client/index.route.js"); //Nhung folder route va di toi route cua trang client
const routeAdmin = require("./routes/admin/index.route.js"); //Nhung folder route va di toi route cua trang client
require('dotenv').config(); // Cau hinh file .env
const port = process.env.PORT;
app.set("views", "./views");
app.set("views engine", "pug");
app.use(express.static('public'));

const database = require("./config/database.js");

database.connect();

routeClient.index(app);
routeAdmin.index(app);

app.listen(port, () => {
    console.log(`Dang chay cong ${port}`);
});



