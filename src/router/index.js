const express = require('express');
const app = express();

const clubRouter = require("../router/club.router");
const clientRouter = require("../router/client.router");
const companyRouter = require("../router/company.router");
const eventRouter = require("../router/event.router");
const ticketRouter = require('../router/ticket.router')

const adminRouter = require("../router/admin.router");
const path = require('path');
const morgan = require("morgan");
const cors = require('cors');
require('dotenv').config();

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(cors({
  origin: 'raul-argemi-7e6.alwaysdata.net',
}));

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is Raulin");
});

app.use("/api", adminRouter);
app.use("/api", clubRouter);
app.use("/api", clientRouter);
app.use("/api", companyRouter);
app.use("/api", eventRouter);
app.use("/api", ticketRouter)

module.exports = app;
