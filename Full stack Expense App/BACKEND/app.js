require("dotenv").config();
const express = require("express");
const app = express();
const Sib = require("sib-api-v3-sdk");

const sequelize = require("./util/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const user = require("./models/user");
const expense = require("./models/expense");
const Orders = require("./models/orders");
const Leaderboard = require("./models/leaderboard");

const loginRoute = require("./router/loginRoute");
const userRoute = require("./router/userRoute");
const expenseRoute = require("./router/expenseRoute");

app.use(bodyParser.json());
app.use(cors());

app.use(loginRoute);

app.use(userRoute);

app.use(expenseRoute);

app.post("/password/forgotpassword", async (req, res, next) => {
  Sib.ApiClient.instance.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY;
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email: "sagar.citydel@gmail.com",
    name: 'Expense App'
  };
  const receivers = [{email: req.body.email}];
  try {
    const result=await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "kuchBhi",
      textContent: "kuchBhi",
    })
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(Orders);
Orders.belongsTo(user);

Leaderboard.belongsTo(user);

sequelize
  .sync()
  // .sync({force: true})
  .then((res) => {
    const hostname = "127.0.0.1";
    const port = 3000;
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
