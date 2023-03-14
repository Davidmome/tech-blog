const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const appAuth = require("../utils/Auth");

router.get("/", appAuth, async (request, response) => {
  const listPost = await Post.findAll({
    attributes: ["id", "title", "content", "createdat", "user_id"],
    where: {
      user_id: request.session.userid,
    },
    order: [["createdat", "DESC"]],
  });
  const postRows = listPost.map((rows) => rows.get({ plain: true }));
  console.log("My Map Post: ", postRows);

  const loggedIn = !!request.session.loggedIn;
  response.render("dashboard", {
    postRows,
    loggedIn: loggedIn,
    username: request.session.username,
    userid: request.session.userid,
  });
  return;
});

router.get("/post", appAuth, async (request, response) => {
  const loggedIn = !!request.session.loggedIn;
  response.render("post", { loggedIn: loggedIn, newPost: true });
  return;
});

router.post("/post", appAuth, async (request, response) => {
  try {
    const newPost = await Post.create({
      title: request.body.inputTitle,
      content: request.body.inputContent,
      user_id: request.session.userid,
    });
    response.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
  return;
});

router.get("/post/:id", appAuth, async (request, response) => {
  const loggedIn = !!request.session.loggedIn;
  try {
    const rowPost = await Post.findOne({
      where: {
        id: request.params.id,
      },
    });

    if (!!rowPost) {
      const loggedIn = !!request.session.loggedIn;
      response.render("post", {
        loggedIn: loggedIn,
        newPost: false,
        id: rowPost.id,
        title: rowPost.title,
        content: rowPost.content,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
  return;
});

router.delete("/post/:id", appAuth, async (request, response) => {
  console.log(`delete post row id :`, request.params.id);

  try {
    const rowPost = await Post.destroy({
      where: {
        id: request.params.id,
      },
      individualHooks: true,
    });

    console.log(`delete row :`, !rowPost);

    if (!rowPost) {
      response
        .status(404)
        .json({ code: 404, message: "No se encontro registro.", data: [] });
    } else {
      response
        .status(200)
        .json({ code: 200, message: "Registro eliminado.", data: [rowPost] });
    }
  } catch (error) {
    console.log(`delete row error:`, error);
    response.status(500).json(error);
  }
  return;
});

router.put("/post/:id", appAuth, async (request, response) => {
  try {
    const rowPost = await Post.update(
      {
        title: request.body.title,
        content: request.body.content,
      },
      {
        where: {
          id: request.params.id,
        },
      }
    );

    console.log(`update row :`, !rowPost);

    if (!rowPost) {
      response
        .status(404)
        .json({ code: 404, message: "No se encontro registro.", data: [] });
    } else {
      response
        .status(200)
        .json({ code: 200, message: "Registro actualizado.", data: [rowPost] });
    }
  } catch (error) {
    response.status(500).json(error);
  }
  return;
});

module.exports = router;
