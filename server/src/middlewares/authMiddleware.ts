import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../lib/jwt.ts";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const token = req.cookies?.token;

	if (!token) {
		res.status(401).json({error: "Unauthorized"});
		return;
	}

	try {
		const {userId} = verifyToken(token);
		req.userId = userId;
		next();
	} catch {
		res.status(401).json({error: "Unauthorized"});
	}
};
