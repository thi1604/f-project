const express = require("express"); // Nhung express 
const app = express();
const routeClient = require("./routes/client/index.route.js"); //Nhung folder route va di toi route cua trang client
const routeAdmin = require("./routes/admin/index.route.js"); //Nhung folder route va di toi route cua trang client
require('dotenv').config(); // Cau hinh file .env
const port = process.env.PORT; 
app.set("views", "./views"); // Nhung folder views vao project
app.set("views engine", "pug"); // Khai bao type template engine
app.use(express.static('public')); // Nhung folder FE vao project

const database = require("./config/database.js"); // Ket noi toi database va thong bao
database.connect();
const prefixUrlAdmin = require("./config/system");

app.locals.prefix = prefixUrlAdmin;

routeClient.index(app);
routeAdmin.index(app);

app.listen(port, () => {
    console.log(`Dang chay cong ${port}`);
});



