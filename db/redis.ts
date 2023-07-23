import { createClient } from 'redis'

const redisClient = createClient({ password: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81" })

redisClient
    .on('error', (err) => console.log("------ Redis connection failed ------" + err))
    .on('connect', () => console.log("------ Redis connection succeed ------"))

export { redisClient }