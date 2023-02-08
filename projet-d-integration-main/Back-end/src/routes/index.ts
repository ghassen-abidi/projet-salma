import { Router } from "express";
import userRoutes from "./user";
import eventRoutes from "./event"
const route = Router();

route.use("/user", userRoutes);
route.use("/event", eventRoutes);

export default route;
