import { Request, Response } from "express";
import { User } from "../models/User";
import db from "../global/db";

export default {
    register: async (req: Request, res: Response) => {
        const { username, email, password } = req.body.user;

        const userRepository = db.getRepository(User);

        const findedUser = await userRepository.findOneBy({ email });

        if (findedUser) {
            res.status(422);
            res.send({
                errors: {
                    body: ["email must be unique"]
                }
            });
            return;
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
