import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const secret = "secretKey";

export const verifyToken = (req: Request|any, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ authorize: "Unauthorize"})
    }
    const bearer = req.headers.authorization.split(' ');
    if(!bearer[1]) {
        return res.status(401).json({ authorize: "Unauthorize"})
    }
    const payload: any = jwt.verify(bearer[1], secret);
    if(!payload) {
        return res.status(401).json({ authorize: "Unauthorize"})
    }
    req.payload = payload;
    next();
}

export const generateToken = (token: any) => {
    return jwt.sign(token, secret);
}