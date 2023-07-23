import { NextFunction, Request, Response } from "express"
import { redisClient } from "../db/redis"

export const cacheUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req.params
        const cache = await redisClient.get(`user-${user}`)
        if (cache) {
            //@ts-ignore
            req.user = JSON.parse(cache)
        }
        return next()
    } catch (error: any) {
        next(error)
    }
}
