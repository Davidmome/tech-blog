const { User } = require("../models");

const userRows = [
  {
    username: "richard",
    password: "myAdmin",
  },
  {
    username: "jane",
    password: "myAdmin",
  },
  {
    username: "alan",
    password: "myAdmin",
  },
  {
    username: "bryan",
    password: "myAdmin",
  },
];

const seedUser = () => User.bulkCreate(userRows, { individualHooks: true });
module.exports = seedUser;
