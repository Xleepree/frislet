

App.Handlers.requestFileBrowser = async function () {
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

  const [fileHandle] = await window.showOpenFilePicker(options);

  await App.Loader.decompressSet(fileHandle);

  App.Render.setManifest(App.AppModel.runtime.currentSet.manifest);
  App.Render.setFlashcards(App.AppModel.runtime.currentSet.content);
};
