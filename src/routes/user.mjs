import { Router } from "express";

const route = Router();

route.get("/api/user", (req, res) => {
  res.send([
    { id: 1, firstName: "pavi", lastName: "megan" },
    { id: 2, firstName: "sangeetha", lastName: "karmegan" },
    { id: 3, firstName: "vaishu", lastName: "selva" },
  ]);
});

export default route;
