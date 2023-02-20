import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import db from "../global/db";
import env from "../global/env";
import { ValidationError } from "../global/errors";

export default {
    register: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { username, email, password } = req.body.user;

        const userRepository = db.getRepository(User);

        const searchedUser = await userRepository.findOneBy({ email });

        if (searchedUser) {
            return next(new ValidationError("Email must be unique"));
        }

        const user = new User();
        user.username = username;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);

        await userRepository.save(user);

        res.status(201);
        res.send({
            user: {
                username,
                email,
                token: jwt.sign({ id: user.id }, env.JWT_SECRET),
                bio: null,
                image: null
            }
        });
    }
};
