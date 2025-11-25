import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { createReadStream } from "fs";
import { showProgress } from "./utilities/progressUtils.js";

const s3Client = new S3Client({
  profile: "NodeJs-User",
});

const readableStream = createReadStream(
  "C:\\Users\\admin\\Pictures\\Camera Roll\\WIN_20251125_22_29_31_Pro.mp4"
);

const upload = new Upload({
  client: s3Client,
  params: {
    Bucket: "varunmendre-nodejs-bucket",
    Key: "Screen.mp4",
    Body: readableStream,
    ContentType: "video/mp4",
  },
});

upload.on("httpUploadProgress", (progress) => {
  showProgress(progress.total, progress.loaded);
});

const res = await upload.done();

console.log(res);
