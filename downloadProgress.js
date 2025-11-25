import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs, { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { showProgress } from "./utilities/progressUtils.js";

const s3Client = new S3Client({
  profile: "NodeJs-User",
});


const command = new GetObjectCommand({
  Bucket: "varunmendre-nodejs-bucket",
  Key: "Screen.mp4",
});

const res = await s3Client.send(command);

const totalObjectSie = res.ContentLength;
let loadedSize = 0;

res.Body.on('data', (chunk) => {
    loadedSize += chunk.length;
    showProgress(totalObjectSie, loadedSize);
})
const writeStream = fs.createWriteStream("C:\\Users\\admin\\Pictures\\Camera Roll\\WIN_20251125_22_29_31_Pro.mp4");

await pipeline(res.Body, writeStream);

console.log("\nFile Downloaded!");
