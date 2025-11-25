export function formatBytes(bytes) {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (bytes < KB) return bytes.toFixed(2) + "Bytes";
  else if (bytes < MB) return (bytes / KB).toFixed(2) + "KB";
  else if (bytes < GB) return (bytes / MB).toFixed(2) + "MB";
  else return (bytes / GB).toFixed(2) + "GB";
}


export const showProgress = (total, downloaded) => {
  process.stdout.write(
    `\r ${formatBytes(downloaded)} of ${formatBytes(total)} (${(
      (downloaded / total) *
      100
    ).toFixed(1)})`
  );
};