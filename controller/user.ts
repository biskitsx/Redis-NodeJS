import axios from "axios"
import { NextFunction, Request, Response } from "express"
import { redisClient } from "../db/redis"

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req.params
        //@ts-ignore
        if (req.name) {
            //@ts-ignore
            const name = req.name
            return res.json({ name })
        }
        const response = await axios.get(`https://api.github.com/users/${user}`)
        const { name } = response.data

        await redisClient.setEx(user, 3600, name)
        return res.json({ name })
    } catch (error: any) {
        res.json({
            msg: error.message
        })
    }
}