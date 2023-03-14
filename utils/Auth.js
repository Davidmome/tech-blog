const appAuth = (request, response, next) => {
  if (!request.session.userid) {
    response.redirect("/api/user/login");
  } else {
    next();
  }
};

module.exports = appAuth;
