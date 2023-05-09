import mongoose from "mongoose";
const { connect } = mongoose;
import env from "dotenv";
const { config } = env;
config({ path: "./.env" });

const conn = connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

export default conn;
