import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { createReadStream } from "fs";

const s3Client = new S3Client({
  profile: "NodeJs-User",
});

function formatBytes(bytes) {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (bytes < KB) return bytes.toFixed(2) + "Bytes";
  else if (bytes < MB) return (bytes / KB).toFixed(2) + "KB";
  else if (bytes < GB) return (bytes / MB).toFixed(2) + "MB";
  else return (bytes / GB).toFixed(2) + "GB";
}

const showProgress = (total, downloaded) => {
  process.stdout.write(
    `\r ${formatBytes(downloaded)} of ${formatBytes(total)} (${((downloaded/total) * 100).toFixed(1)})`
  );
};

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
