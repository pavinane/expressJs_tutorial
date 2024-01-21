import { validationResult, checkSchema, matchedData } from "express-validator";
import {
  createQuerrySchemas,
  createUserValidationSchemas,
} from "../utils/validationSchemas.mjs";
import { mockUser } from "../utils/constent.mjs";
import { resolveIndexByUserId } from "../utils/middleware.mjs";
import { Router } from "express";

const route = Router();

// get and fillter by user
route.get(
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

// find user using requestiong params
route.get("/api/product/:id", (req, res) => {
  const paramsId = parseInt(req.params.id);
  if (isNaN(paramsId)) return res.status(400).send("bad request");

  const findUser = mockUser.find((product) => product.id === paramsId);
  if (!findUser) return res.status(404).send({ msg: "worng product" });

  return res.send(findUser);
});

// POST
route.post(
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
route.put("/api/product/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUser[findUserIndex] = { id: mockUser[findUserIndex].id, ...body };
  return res.sendStatus(200);
});
// PATCH method
route.patch("/api/product/:id", (req, res) => {
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
route.delete("/api/product/:id", resolveIndexByUserId, (req, res) => {
  /* Without MiddleWare */

  // const paramsId = parseInt(req.params.id);
  // console.log(paramsId);

  // if (isNaN(paramsId)) return res.sendStatus(400);

  // const findUserIndex = mockUser.findIndex((user) => user.id === paramsId);
  // console.log(findUserIndex);
  // if (findUserIndex === -1) return res.sendStatus(404);

  /* With MiddleWare */
  const { findUserIndex } = req;

  mockUser.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default route;
