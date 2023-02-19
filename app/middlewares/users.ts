import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import db from "../global/db";
import { ValidationError, BadRequestError } from "../global/errors";
import { object, string } from "yup";

export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        const bodyFormat = object({
            user: object({
                username: string().required(),
                email: string().email().required(),
                password: string().required()
            })
        });

        if (!await bodyFormat.isValid(req.body)) {
            return next(new BadRequestError());
        }
        
        const { username, email, password } = req.body.user;

        const userRepository = db.getRepository(User);

        const searchedUser = await userRepository.findOneBy({ email });

        if (searchedUser) {
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
