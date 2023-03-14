const seedUser = require("./user");
const seedPost = require("./post");
const seedComment = require("./comment");

const sequelize = require("../config/connection");

const seedData = async () => {
  await sequelize.sync({ force: false });
  await seedUser();
  await seedPost();
  await seedComment();
  process.exit(0);
};

seedData();
