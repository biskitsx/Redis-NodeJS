import { NextFunction, Request, Response } from "express"
import { redisClient } from "../db/redis"
import { error } from "console"

export const cacheUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req.params
        if (!user) {
            return next(error)
        }
        const data = await redisClient.get(user)
        //@ts-ignore
        req.name = data
        next()
    } catch (error: any) {
        next(error)
    }
}