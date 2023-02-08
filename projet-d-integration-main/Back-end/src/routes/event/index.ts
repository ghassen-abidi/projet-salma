import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { upload } from "../../storage";
import * as controller from "./event.controller";
import * as schema from "./event.schema";

const route = Router();
route.post("/create", [upload(), validate(schema.create)], controller.create);
route.get("/all", controller.getall);
route.get("/unchecked", controller.unchecked);
route.put("/approve/:id", controller.approuve);
route.delete("/reject/:id", controller.reject);
route.get("/getAllEvent", controller.getAllEvent);
route.get("/:id", controller.getEventById);

export default route;
