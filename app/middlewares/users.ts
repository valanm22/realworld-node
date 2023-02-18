import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import db from "../global/db";
import { ValidationError } from "../global/errors";

export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password } = req.body.user;

        const userRepository = db.getRepository(User);

        const findedUser = await userRepository.findOneBy({ email });

        if (findedUser) {
            return next(new ValidationError("Email must be unique"));
        }

        const user = new User();
        user.username = username;
        user.email = email;
        user.password = password;

        await userRepository.save(user);

        res.status(201);
        res.send({
            user: {
                username,
                email,
                token: "not implemented",
                bio: null,
                image: null
            }
        });
    },
};
