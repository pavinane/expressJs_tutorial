import ProductRoute from "./product.mjs";
import UserRoute from "./user.mjs";
import { Router } from "express";

const routers = Router();

routers.use(UserRoute);

routers.use(ProductRoute);

export default routers;
