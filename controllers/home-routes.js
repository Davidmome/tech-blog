const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const appAuth = require("../utils/Auth.js");

router.get("/", async (request, response) => {
  postData = await Post.findAll({
    attributes: ["id", "title", "content", "createdat", "user_id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  commentData = await Comment.findAll({
    attributes: ["id", "post_id", "comment", "createdat", "user_id"],
    include: [{ model: User, attributes: ["username"] }],
  });

  const postRows = postData.map((rows) => rows.get({ plain: true }));
  console.log("Map Post: ", postRows);
  const commentRows = commentData.map((rows) => rows.get({ plain: true }));
  console.log("Map Comment: ", commentRows);
  const loggedIn = request.session.loggedIn === undefined ? false : true;
  const userId = loggedIn ? request.session.userid : 0;
  response.render("index", {
    postRows,
    commentRows,
    loggedIn: loggedIn,
    userId: userId,
  });
});

router.get("/newcomment/:id", appAuth, async (request, response) => {
  const loggedIn = !!request.session.loggedIn;
  response.render("comments", {
    loggedIn: loggedIn,
    newComment: true,
    postId: request.params.id,
  });
  return;
});

router.post("/comment/:id", appAuth, async (request, response) => {
  console.log(
    `alta de nuevo comentario ${request.body.comment} post_id:${request.params.id} user_id : ${request.session.userid}`
  );

  try {
    const newComment = await Comment.create({
      comment: request.body.inputComment,
      post_id: request.params.id,
      user_id: request.session.userid,
    });
    response.redirect("/");
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/comment/:id", appAuth, async (request, response) => {
  try {
    const rowComment = await Comment.findOne({
      where: {
        id: request.params.id,
      },
    });

    if (!!rowComment) {
      const loggedIn = !!request.session.loggedIn;
      response.render("comments", {
        loggedIn: loggedIn,
        newComment: false,
        postId: rowComment.post_id,
        id: rowComment.id,
        comment: rowComment.comment,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
  return;
});

router.put("/comment/:id", appAuth, async (request, response) => {
  try {
    const rowComment = await Comment.update(
      {
        comment: request.body.comment,
      },
      {
        where: {
          id: request.params.id,
        },
      }
    );

    console.log(`update row :`, !rowComment);

    if (!rowComment) {
      response
        .status(404)
        .json({ code: 404, message: "No se encontro registro.", data: [] });
    } else {
      response.status(200).json({
        code: 200,
        message: "Registro actualizado.",
        data: [rowComment],
      });
    }
  } catch (error) {
    response.status(500).json(error);
  }
  return;
});

router.delete("/comment/:id", appAuth, async (request, response) => {
  try {
    const rowComment = await Comment.destroy({
      where: {
        id: request.params.id,
      },
    });

    console.log(`delete row :`, !rowComment);

    if (!rowComment) {
      response
        .status(404)
        .json({ code: 404, message: "No se encontro registro.", data: [] });
    } else {
      response.status(200).json({
        code: 200,
        message: "Registro de comentario eliminado.",
        data: [rowComment],
      });
    }
  } catch (error) {
    response.status(500).json(error);
  }
  return;
});

module.exports = router;
