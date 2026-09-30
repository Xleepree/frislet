App.Render.getId = function (element) {
  const id = document.getElementById(element.id);
  return id;
};

App.Render.setManifest = function (manifest) {
  const container = App.Render.getId(
    App.RenderRegistry.elements.page.setManifest,
  );

  container.innerHTML = "";

  const title = document.createElement("h1");
  title.innerText = manifest.title;

  const desc = document.createElement("p");
  desc.innerText = manifest.description;

  const type = document.createElement("p");
  type.innerText = manifest.type;

  container.appendChild(title);
  container.appendChild(desc);
  container.appendChild(type);
};

App.Render.setFlashcards = function (content) {
  const container = App.Render.getId(
    App.RenderRegistry.elements.page.setContent,
  );

  container.innerHTML = "";

  for (const [index, card] of content.entries()) {
    App.Render.setFlashcard(card, index, container);
  }
};

App.Render.setFlashcard = function (card, index, container) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("flashcard");
  cardContainer.id = `card-${index}`;

  const innerContainer = document.createElement("div");
  innerContainer.classList.add("flashcard-inner")

  const front = document.createElement("div");

  const frontText = document.createElement("p");
  frontText.innerText = card.front.content;
  front.classList.add("flashcard-front");
  const frontImg = document.createElement("img");
  frontImg.src = App.AppModel.runtime.currentSet.images[card.front.thumbnail];

  front.id = `card-front-${index}`;

  const back = document.createElement("div");

  const backText = document.createElement("p");
  backText.innerText = card.back.content;
  back.classList.add("flashcard-back");
  const backImg = document.createElement("img");

  backImg.src = App.AppModel.runtime.currentSet.images[card.front.thumbnail];

  back.id = `card-back-${index}`;

  front.appendChild(frontText);
  front.appendChild(frontImg);
  back.appendChild(backText);
  back.appendChild(backImg);
  innerContainer.appendChild(front);
  innerContainer.appendChild(back);
  cardContainer.appendChild(innerContainer);

  cardContainer.addEventListener("click", function () {
    this.classList.toggle('flipped');
  })

  container.appendChild(cardContainer)
};
