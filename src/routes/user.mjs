import { Router } from "express";
import { User } from "../mongoose/schemas/user.mjs";
import { validationResult, checkSchema, matchedData } from "express-validator";
import { createUserValidationSchemas } from "../utils/validationSchemas.mjs";
import { hashPassword } from "../utils/helpers.mjs";

const route = Router();

route.get("/api/user", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies.hello);

  if (req.signedCookies && req.signedCookies.hello === "world")
    return res.send([
      { id: 1, firstName: "pavi", lastName: "megan" },
      { id: 2, firstName: "sangeetha", lastName: "karmegan" },
      { id: 3, firstName: "vaishu", lastName: "selva" },
    ]);

  return res.status(403).send({ msg: "Sorry . You need the correct cookie" });
});

route.post(
  "/api/users",
  checkSchema(createUserValidationSchemas),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());

    // const { body } = req;
    const data = matchedData(req);
    console.log(data, "before");
    data.password = hashPassword(data.password);
    console.log(data, "after");
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
);

export default route;
