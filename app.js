const cors = require("cors");
const express = require("express");
const config = require("./config/keys");
const authRoutes = require("./api/auth/auth.routes");
const categoryRouter = require("./api/Category/category.routes")
const notFound = require("./middlewares/notFoundHandler");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./database");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");

connectDb();

//declare var
const app = express();

//middlewares:
app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(morgan("dev"));

//passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//routes
app.use("/api/users", authRoutes);
app.use("/api/category", categoryRouter)

//errorhandlers:
app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The application is running on ${config.PORT}`);
});

module.exports = app;
