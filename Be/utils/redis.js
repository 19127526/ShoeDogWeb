const redis  = require("redis");

/*
* redis[s]://[[username][:password]@][host][:port][/db-number]:
* */
const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_ADDRESS,
    password: process.env.REDIS_PASSWORD
});



client.on('connect', () => {
    console.log('Client connected to redis........')
})

client.on('ready', () => {
    console.log('Client connected to redis and ready to use........')
})

client.on('error', (error) => {
    console.log(error?.message)
})

client.on('end', (error) => {
    console.log('Client disconnect from redis')
})



module.exports = client



