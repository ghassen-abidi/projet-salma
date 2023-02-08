import { Router } from "express";
import { validate } from "../../middlewares/validate";
import * as controller from "./user.controller";
import * as schema from "./user.schema";
import { authentify, authorize } from "../../middlewares/authentify";
const route = Router();

route.post("/login", validate(schema.login), controller.login);
route.post("/register", validate(schema.register), controller.register);
route.put(
  "/approve/:id",
  [authentify, authorize("admin")],
  controller.approuve
);
route.delete("/reject/:id", controller.reject);
route.get("/", authentify, controller.getall);
route.get("/me", authentify, controller.getMyData);

export default route;
