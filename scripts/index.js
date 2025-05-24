const cardTemplate = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");


function makeCards(items, cardRemover) {

  items.forEach((item) => {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);

    card.querySelector(".card__image").src = item.link;
    card.querySelector(".card__image").alt = item.name;
    card.querySelector(".card__title").textContent = item.name;

    const deleteButton = card.querySelector(".card__delete-button");
    cardRemover(deleteButton, card);

    return placesList.append(card);
  });
}

function deleteButtonHandler(button, cardElement) {
  button.addEventListener("click", () => {
    cardElement.remove();
  });
}

makeCards(initialCards, deleteButtonHandler);
