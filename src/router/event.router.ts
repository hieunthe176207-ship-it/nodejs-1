import express from "express";
import { getAllEvent, createEvent } from "../controller/event.controller";
const eventRouter = express.Router();
eventRouter.get("/", getAllEvent);
eventRouter.post("/", createEvent);
export default eventRouter;