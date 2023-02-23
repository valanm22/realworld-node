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

        res.status(201).send({
            user: {
                username,
                email,
                token: jwt.sign({ id: user.id }, env.JWT_SECRET),
                bio: null,
                image: null
            }
        });
    },

    login: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { email, password } = req.body.user;

        const userRepository = db.getRepository(User);

        const searchedUser = await userRepository.findOneBy({ email });

        if (!searchedUser) {
            return next(new ValidationError("User not found"));
        }

        const isPasswordValid = await bcrypt.compare(
            password, searchedUser.password);

        if (!isPasswordValid) {
            return next(new ValidationError("Password is invalid"));
        }

        res.status(200).send({
            user: {
                username: searchedUser.username,
                email: searchedUser.email,
                token: jwt.sign({ id: searchedUser.id }, env.JWT_SECRET),
                bio: searchedUser.bio,
                image: searchedUser.image 
            }
        });
    },

    current: async (
        req: Request,
        res: Response
    ) => {
        const user: User = res.locals.user;

        res.status(200).json({
            user: {
                username: user.username,
                email: user.email,
                token: jwt.sign({ id: user.id }, env.JWT_SECRET),
                bio: user.bio,
                image: user.image 
            }
        });
    },

    update: async (
        req: Request,
        res: Response
    ) => {
        const user: User = res.locals.user;

        const { username, email, password, bio, image } = req.body.user;

        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (bio) {
            user.bio = bio;
        }
        if (image) {
            user.image = image;
        }

        const userRepository = db.getRepository(User);
        await userRepository.save(user);

        res.status(200).json({
            user: {
                username: user.username,
                email: user.email,
                token: jwt.sign({ id: user.id }, env.JWT_SECRET),
                bio: user.bio,
                image: user.image 
            }
        });    
    }
};
