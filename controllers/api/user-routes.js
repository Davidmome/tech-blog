const router = require("express").Router();
const { User } = require("../../models");

router.get("/login", async (request, response) => {
  response.render("login", { typeLogin: true });
});

router.post("/login", async (request, response) => {
  let messages = [];
  try {
    const userDb = await User.findOne({
      where: {
        username: request.body.inputUser,
      },
    });

    if (!userDb) {
      messages.push({ message: "Usuario no encontrado." });
      return response.render("login", { typeLogin: true, messages });
    }

    const validPassword = await userDb.checkPassword(
      request.body.inputPassword
    );
    if (!validPassword) {
      messages.push({ message: "Password incorrecto." });
      return response.render("login", { typeLogin: true, messages });
    } else {
      request.session.save(() => {
        request.session.loggedIn = true;
        request.session.username = userDb.username;
        request.session.userid = userDb.id;
        console.log("almacenado variables de session", request.session.cookie);
        response.redirect("/");
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

router.get("/singup", async (request, response) => {
  response.render("login", { typeLogin: false });
});

router.post("/singup", async (request, response) => {
  let messages = [];
  try {
    const exists = await User.findOne({
      where: {
        username: request.body.inputUser,
      },
    });

    if (!!exists) {
      messages.push({
        message: `El usuario ${request.body.inputUser} ya se encuentra registrado.`,
      });
      return response.render("login", { typeLogin: true, messages });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }

  const newUser = await User.create({
    username: request.body.inputUser,
    password: request.body.inputPassword,
  });
  console.log("nuevo usuaro", newUser);
  console.log("nuevo !!", !!newUser);

  if (!!newUser) {
    request.session.save(() => {
      request.session.loggedIn = true;
      request.session.username = newUser.username;
      request.session.userid = newUser.id;
      console.log(
        "Registro de nuevo usuario y su session",
        request.session.cookie
      );
      response.redirect("/");
    });
  }
});

router.get("/logout", async (request, response) => {
  if (request.session.loggedIn) {
    request.session.destroy(() => {
      response.redirect("/");
    });
  } else {
    response.redirect("/");
  }
});

module.exports = router;
