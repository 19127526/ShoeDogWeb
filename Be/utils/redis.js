const redis = require("redis");

const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_ADDRESS,
    password: process.env.REDIS_PASSWORD,
});

client.on('connect', () => {
    console.log('Redis connected')
})

client.on('ready', () => {
    console.log('Redis connected')
})
client.on('error', (err) => {
    console.log(err?.message)
})


module.exports = client



