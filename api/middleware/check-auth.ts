import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface JWTPayload {
    email: string;
    userId: string;
}

export function CheckAuth (req: Request, res: Response, next: NextFunction){
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = verify(token, process.env.JWT_KEY) as JWTPayload;
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({
            message: 'You are not authenticated!'
        });
    }
};