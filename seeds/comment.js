const { Comment } = require("../models");

const commentRows = [
  {
    comment: "Thanks buena idea!",
    post_id: 1,
    user_id: 3,
  },
  {
    comment: "Thanks soluciono mi problema",
    post_id: 2,
    user_id: 4,
  },
  {
    comment: "Enjoy!!!",
    post_id: 1,
    user_id: 1,
  },
  {
    comment: "codificación feliz!!",
    post_id: 2,
    user_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentRows);
module.exports = seedComment;
