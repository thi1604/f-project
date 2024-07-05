const express = require("express"); // Nhung express 
const app = express();
const routeClient = require("./routes/client/index.route.js"); //Nhung folder route va di toi route cua trang client
const routeAdmin = require("./routes/admin/index.route.js"); //Nhung folder route va di toi route cua trang client
require('dotenv').config(); // Cau hinh file .env
const port = process.env.PORT; 

app.set('views', `${__dirname}/views`); // Nhung folder views vao project
app.set('views engine', 'pug'); // Khai bao type template engine

app.use(express.static(`${__dirname}/public`)); // Nhung folder FE vao project

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //Su dung cho form
const database = require("./config/database.js"); // Ket noi toi database va thong bao
database.connect();
const prefixUrlAdmin = require("./config/system");
//Nhung thu vien flash-message vao express(2 dong 17-18 khong con tich hop san trong express, phai nhung vao)
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// End nhung flash-message

//Nhung cac phuong thuc khac cho form(mac dinh form co get va post)
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
//End nhung cac phuong thuc khac cho form(mac dinh form co get va post)

app.use(cookieParser('ThiBeo'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.locals.prefix = prefixUrlAdmin;

routeClient.index(app);
routeAdmin.index(app);

app.listen(port, () => {
    console.log(`Dang chay cong ${port}`);
});



