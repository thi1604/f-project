const express = require("express");
const app = express();
const routeClient = require("./routes/client/index.route"); //Nhung folder route va di toi route cua trang client
require('dotenv').config(); // Cau hinh file .env
const port = process.env.PORT;

app.set("views", "./views");
app.set("views engine", "pug");

routeClient.index(app);

app.listen(port, () => {
    console.log(`Dang chay cong ${port}`);
});



