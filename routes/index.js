// Common router
const routes = {
  adminauthRouter: require("./adminauth.route"),
  tableRoute: require("./table.route"),
  productsRoute: require("./products.route"),
  userRoutes: require("../routes/users.routes"),
  authRoute: require("./auth.route"),
  ordersRoute: require("./orders.route"),
};

// export
module.exports = routes;
