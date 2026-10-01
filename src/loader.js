import { unzip, strFromU8 } from "fflate";

App.Loader.fileExtensionToMIME = function (filename) {
  if (filename.endsWith(".png")) return "image/png";
  else if (filename.endsWith(".apng")) return "image/apng";
  else if (filename.endsWith(".jpeg") || filename.endsWith(".jpg"))
    return "image/jpeg";
  else if (filename.endsWith(".webp")) return "image/webp";
  else if (filename.endsWith(".gif") || filename.endsWith(".gif"))
    return "image/gif";
  else if (filename.endsWith(".avif")) return "image/avif";
  else if (filename.endsWith(".svg")) return "image/svg+xml";
};

App.Loader.decompressSet = async function (file) {
  const arrayBuffer = await file.arrayBuffer();

  const bytes = new Uint8Array(arrayBuffer);
  const targetDirectory = "assets/";

  // prevent dangling urls when loading new set. we don't want memory leaks!
  for (const url of Object.values(App.AppModel.runtime.currentSet.images)) {
    URL.revokeObjectURL(url);
  }

  const unzipped = await new Promise((resolve, reject) => {
    unzip(bytes, (err, decompressed) => {
      if (err) reject(err);
      else {
        Object.keys(decompressed).forEach((filePath) => {
          if (!filePath.startsWith(targetDirectory)) {
            return;
          }

          if (filePath.endsWith("/")) {
            return;
          }

          // add IMAGES from assets/ to the images collection as a blob url
          // this makes loading thumbnails when developing something like a flashcard much easier, and much faster than encoding it as a base64 string (i believe)
          const fileData = decompressed[filePath];
          const mime = App.Loader.fileExtensionToMIME(filePath);
          const blob = new Blob([fileData], { type: mime });
          const objUrl = URL.createObjectURL(blob);

          App.AppModel.runtime.currentSet.images[filePath] = objUrl;
        });
        resolve(decompressed);
      }
    });
  });

  const manifestBytes = unzipped["manifest.json"];
  const contentBytes = unzipped["content.json"];

  if (!manifestBytes) {
    return App.Logs.internalError("manifest.json missing from set!");
  }
  if (!contentBytes) {
    return App.Logs.internalError("content.json missing from set!");
  }

  const manifestStr = strFromU8(manifestBytes).trim();
  const contentStr = strFromU8(contentBytes).trim();

  if (!manifestStr) {
    return App.Logs.internalError("manifest.json is empty!");
  }
  if (!contentStr) {
    return App.Logs.internalError("content.json is empty!");
  }

  const manifest = JSON.parse(manifestStr);
  const content = JSON.parse(contentStr);

  App.AppModel.runtime.currentSet.manifest = manifest;
  App.AppModel.runtime.currentSet.content = content;
};
