import dotenv from "dotenv";
import NodeMediaServer from "node-media-server";
import jwt from "jsonwebtoken";

dotenv.config();

// Set up a secret key for JWT
const secret = process.env.TOKEN_SECRET;

// Generate a token with an expiry time of 1 hour
const token = jwt.sign({}, secret, { expiresIn: "1h" });

const config = {
  logType: 1,
  rtmp: {
    port: process.env.RTMP_PORT,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    port: process.env.HTTP_PORT,
    allow_origin: "*",
    mediaroot: "./media",
  },
  auth: {
    play: true,
    publish: true,
    secret,
    api: true,
    api_user: process.env.API_USER_USER,
    api_pass: process.env.API_USER_PASS,
  },
  // trans: {
  //   ffmpeg: process.env.FFMPG_PATH,
  //   tasks: [
  //     {
  //       app: "live",
  //       hls: true,
  //       hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
  //       hlsKeep: false,
  //       dash: true,
  //       dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
  //       dashKeep: false,
  //     },
  //   ],
  // },
};

const nms = new NodeMediaServer(config);

export default nms;
