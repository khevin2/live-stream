import session from "express-session";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import RedisStore from "connect-redis";

import env from "dotenv";
const { config } = env;
config({ path: "./.env" });

const { createClient } = require("redis");
let redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
});

export { redisClient, redisStore };
