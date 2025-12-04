import { log } from "console";
import { Request, Response } from "express";

export const getAllEvent  = (req : Request, res: Response) => {
    log(req.query);
    res.send("Get all events");
}

export const createEvent  = (req : Request, res: Response) => {
    res.send("Create an event");
}