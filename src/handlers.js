// cause safari/firefox doesn't support
App.Handlers.getFileHandle = async function (options) {
  if ("showOpenFilePicker" in window) {
    try {
      const [handle] = await window.showOpenFilePicker(options);
      return await handle.getFile();
    } catch (err) {
      if (err.name === "AbortError") return null;
      throw err;
    }
  }

  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";

    if (options.multiple) input.multiple = true;

    if (options.types && options.types[0]?.accept) {
      const accepts = Object.values(options.types[0].accept).flat();
      input.accept = accepts.join(",");
    }

    input.onchange = () => {
      const files = input.files;
      if (!files || files.length === 0) {
        resolve(null);
      } else {
        resolve(options.multiple ? Array.from(files) : files[0]);
      }
    };

    input.oncancel = () => resolve(null);

    input.click();
  });
};

App.Handlers.requestSet = async function () {
  const options = {
    types: [
      {
        description: "Frislet Sets",
        accept: { "application/zip": ".frislet" },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  const fileHandle = await App.Handlers.getFileHandle(options);

  // no await = undefined
  await App.Loader.decompressSet(fileHandle);

  App.Render.setManifest(App.AppModel.runtime.currentSet.manifest);
  App.Render.setCards(App.AppModel.runtime.currentSet.content);
};
