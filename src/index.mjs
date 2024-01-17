import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send({ msg: "hellow" });
});
app.get("/api/user", (req, res) => {
  res.send([
    { id: 1, firstName: "pavi", lastName: "megan" },
    { id: 2, firstName: "sangeetha", lastName: "karmegan" },
    { id: 3, firstName: "vaishu", lastName: "selva" },
  ]);
});

const mockUser = [
  { id: 1, product: "mobile", price: "50k" },
  { id: 2, product: "laptop", price: "60k" },
  { id: 3, product: "airpods", price: "20k" },
];

// find user using requestiong params
app.get("/api/product/:id", (req, res) => {
  const paramsId = parseInt(req.params.id);
  if (isNaN(paramsId)) return res.status(400).send("bad request");

  const findUser = mockUser.find((product) => product.id === paramsId);
  if (!findUser) return res.status(404).send({ msg: "worng product" });

  return res.send(findUser);
});

// fillter user

app.get("/api/product", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  //   when a filter and values are undefined
  if (!filter && !value) return res.send(mockUser);

  if (filter && value)
    return res.send(
      mockUser.filter((product) => product[filter].includes(value))
    );

  res.send(mockUser);
});

// POST Method
app.post("/api/product", (req, res) => {
  const { body } = req;
  const productId = { id: mockUser[mockUser.length - 1].id + 1, ...body };
  mockUser.push(productId);

  return res.status(201).send(productId);
});

app.listen(PORT, () => {
  console.log(`Running Port is ${PORT}`);
});
