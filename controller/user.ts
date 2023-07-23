import axios from "axios"
import { NextFunction, Request, Response } from "express"
import { redisClient } from "../db/redis"

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req.params
        //@ts-ignore
        if (req.user) {
            //@ts-ignore
            const data = req.user
            return res.json(data)
        }

        const response = await axios.get(`https://api.github.com/users/${user}`)
        const { name, location, type } = response.data
        const data = { name, location, type }

        await redisClient.setEx(`user-${user}`, 60, JSON.stringify(data))
        return res.json(data)
    } catch (error: any) {
        next(error)
    }
}