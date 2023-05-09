import session from "express-session";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
let RedisStore = require('connect-redis')(session)

import env from "dotenv";
const { config } = env;
config({ path: "./.env" });

const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true, url: process.env.REDIS_URL })
redisClient.connect().catch(console.error)

export { redisClient, RedisStore }

