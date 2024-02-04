import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.mjs";
import session from "express-session";
import { mockUser } from "./utils/constent.mjs";
import passport from "passport";
import mongoose from "mongoose";

import "./strategies/local-strategies.mjs";

const app = express();
// MongoDB Connection
mongoose
  .connect("mongodb://localhost/express_practice")
  .then(() => console.log("Connect database"))
  .catch((err) => console.log(`Error ${err}`));

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "pavi the dev",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 6 },
  })
);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 10000, signed: true });
  res.status(201).send({ msg: "hellow" });
});

/* Using Routes */
// fillter user POST Method every method store on routes make simplify the code
app.use(routes);

// Write these code how to use session to make cookies for user auth

/*  Code start
app.post("/api/auth", (req, res) => {
  const {
    body: { userName, password },
  } = req;
  const findUser = mockUser.find((user) => user.userName === userName);
  if (!findUser || findUser.password !== password) {
    return res.status(401).send({ msg: "Bad Authentication" });
  }
  req.session.user = findUser;
  return res.status(200).send(findUser);
});
app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });

  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Not Authentication" });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.status(401).send({ msg: "Need Login" });
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(item);
});

app.get("/api/cart", (req, res) => {
  if (!req.session.user) return res.status(401).send({ msg: "Need Login" });
  return res.send(req.session.cart) ?? [];
});

End Code */

//  Using PassportJs
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.send(200);
});

app.get("/api/user/status", (req, res) => {
  console.log("inside the user/status path");
  console.log(req.user);
  console.log(req.session);
  return req.user ? res.send(req.user) : res.send(401);
});

app.post("/api/user/logout", (req, res) => {
  if (!res.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

app.listen(PORT, () => {
  console.log(`Running Port is ${PORT}`);
});
