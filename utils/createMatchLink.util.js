import md5 from "md5";
import dotenv from "dotenv";

dotenv.config();

export default function createMatchLink({ dateTime, streamName, appName }) {
  const secret = process.env.TOKEN_SECRET;
  const time = new Date(dateTime);
  const milliseconds = time.getTime();
  const hashValue = md5(`${appName}/${streamName}-${milliseconds}-${secret}`);
  console.log("hash value: ", hashValue);

  const matchPublishLink = `${process.env.IP}:${process.env.RTMP_PORT}/${appName}/${streamName}?sign=${milliseconds}-${hashValue}`;
  console.log("match publish link: ", matchPublishLink);

  const matchStreamLink = `${process.env.APP_URL}/${appName}/${streamName}?sign=${milliseconds}-${hashValue}`;
  console.log(matchStreamLink);

  return { publish: matchPublishLink, stream: matchStreamLink };
}
