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

  container.appendChild(title);
  container.appendChild(desc);
};

App.Render.setCard = function (card, index, container) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");
  cardContainer.id = `card-${index}`;

  const front = document.createElement("div");

  const frontText = document.createElement("p");
  frontText.innerText = card.front.content;
  front.classList.add("card-front");

  front.id = `card-front-${index}`;

  const back = document.createElement("div");

  const backText = document.createElement("p");
  backText.innerText = card.back.content;
  back.classList.add("card-back");

  back.id = `card-back-${index}`;

  front.appendChild(frontText);
  back.appendChild(backText);
  cardContainer.appendChild(front);
  cardContainer.appendChild(back);
  container.appendChild(cardContainer)
}

App.Render.setCards = function (content) {
  const container = App.Render.getId(
    App.RenderRegistry.elements.page.setContent,
  );

  container.innerHTML = "";

  for (const [index, card] of content.entries()) {
    App.Render.setCard(card, index, container);
  }
}

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
  cardContainer.id = `flashcard-${index}`;

  const innerContainer = document.createElement("div");
  innerContainer.classList.add("flashcard-inner")

  const front = document.createElement("div");

  const frontText = document.createElement("h2");
  frontText.innerText = card.front.content;
  front.classList.add("flashcard-front");
  const frontImg = document.createElement("img");
  frontImg.src = App.AppModel.runtime.currentSet.images[card.front.thumbnail];

  front.id = `flashcard-front-${index}`;

  const back = document.createElement("div");

  const backText = document.createElement("h2");
  backText.innerText = card.back.content;
  back.classList.add("flashcard-back");
  const backImg = document.createElement("img");

  backImg.src = App.AppModel.runtime.currentSet.images[card.front.thumbnail];

  back.id = `flashcard-back-${index}`;

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
