import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'

import { redisClient } from './db/redis'
import { getUser } from './controller/user'
import { cacheUser } from './middleware/redisCache'

// express app
const app = express()

// middleware
app.use(morgan("dev"))

// routes
app.get("/:user", cacheUser, getUser)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({
        error: "true",
        msg: err.message || "something went wrong",
    })
})

app.listen(3000, async () => {
    await redisClient.connect()
    console.log(`server started at http://localhost:3000`)
})


