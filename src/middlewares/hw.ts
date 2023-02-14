import { Request, Response } from "express";

export const hello = (req: Request, res: Response) => {
    res.json({ message: "hello" });
};

export const world = (req: Request, res: Response) => {
    res.json({ message: "world" });
};