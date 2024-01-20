import express from "express";
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";
import {
  createQuerrySchemas,
  createUserValidationSchemas,
} from "./utils/validationSchemas.mjs";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const mockUser = [
  { id: 1, product: "mobile", price: "50k" },
  { id: 2, product: "laptop", price: "60k" },
  { id: 3, product: "airpods", price: "20k" },
];

const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUser.findIndex(
    (product) => product.id === parsedId
  );

  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

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

// find user using requestiong params
app.get("/api/product/:id", (req, res) => {
  const paramsId = parseInt(req.params.id);
  if (isNaN(paramsId)) return res.status(400).send("bad request");

  const findUser = mockUser.find((product) => product.id === paramsId);
  if (!findUser) return res.status(404).send({ msg: "worng product" });

  return res.send(findUser);
});

// fillter user

app.get(
  "/api/product",
  checkSchema(createQuerrySchemas),
  // query("filter")
  //   .isString()
  //   .notEmpty()
  //   .withMessage("Must not be empty")
  //   .isLength({ min: 3, max: 30 })
  //   .withMessage("Must be at least 3 to 10 characters"),
  (req, res) => {
    const result = validationResult(req);
    console.log("res", result);

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
  }
);

// POST Method
app.post(
  "/api/product",
  checkSchema(createUserValidationSchemas),

  (req, res) => {
    const result = validationResult(req);
    console.log("res", result);

    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }

    const data = matchedData(req);

    // const { body } = req;
    const productId = { id: mockUser[mockUser.length - 1].id + 1, ...data };
    mockUser.push(productId);

    return res.status(201).send(productId);
  }
);

// PUT method

// app.put("/api/product/:id", (req, res) => {
// const {
//   body,
//   params: { id },
// } = req;

// const parseId = parseInt(id);

// if (isNaN(parseId)) return res.sendStatus(400);

// const findUseIndex = mockUser.find((product) => product.id === parseId);

// if (findUseIndex - 1) return res.sendStatus(404);
//   mockUser[findUseIndex] = { id: { parseId, ...body } };
//   console.log(mockUser[findUseIndex], "check");
//   return res.sendStatus(200);
// });

//  after use middleware

app.put("/api/product/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUser[findUserIndex] = { id: mockUser[findUserIndex].id, ...body };
  return res.sendStatus(200);
});
// PATCH method
app.patch("/api/product/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseIds = parseInt(id);
  console.log(parseIds);
  if (isNaN(parseIds)) return res.send(400);

  const findexIndex = mockUser.findIndex((product) => product.id === parseIds);
  if (findexIndex === -1) return res.sendStatus(404);
  mockUser[findexIndex] = { ...mockUser[findexIndex], ...body };
  return res.sendStatus(200);
});

//DELETE
app.delete("/api/product/:id", resolveIndexByUserId, (req, res) => {
  /* Without MiddleWare */

  // const paramsId = parseInt(req.params.id);
  // console.log(paramsId);

  // if (isNaN(paramsId)) return res.sendStatus(400);

  // const findUserIndex = mockUser.findIndex((user) => user.id === paramsId);
  // console.log(findUserIndex);
  // if (findUserIndex === -1) return res.sendStatus(404);

  /* With MiddleWare */
  const { findUserIndex } = req;

  mockUser.splice(findUserIndex);
  return res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`Running Port is ${PORT}`);
});
