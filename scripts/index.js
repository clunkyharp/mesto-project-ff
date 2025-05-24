const cardTemplate = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".places__list");

// Функция для создания карточки
function createCard(cardData, deleteCard) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(card);
  });

  return card;
}

// Функция для удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция для рендеринга карточек
function renderCards(items) {
  items.forEach((item) => {
    const card = createCard(item, deleteCard);
    cardsContainer.append(card);
  });
}

renderCards(initialCards);
