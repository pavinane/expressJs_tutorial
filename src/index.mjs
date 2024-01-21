import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 10000, signed: true });
  res.status(201).send({ msg: "hellow" });
});

/* Using Routes */
// fillter user POST Method every method store on routes make simplify the code
app.use(routes);

app.listen(PORT, () => {
  console.log(`Running Port is ${PORT}`);
});
