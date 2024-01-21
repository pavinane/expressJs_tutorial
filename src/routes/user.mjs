import { Router } from "express";

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

export default route;
