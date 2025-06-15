export function createCard(
  { name, link },
  handleLikeButton,
  handleDeleteButton,
  handleImageClick
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", () => handleLikeButton(likeButton));
  deleteButton.addEventListener("click", () => handleDeleteButton(cardElement));
  cardImage.addEventListener("click", () => handleImageClick(name, link));

  return cardElement;
}

export function handleLikeButton(button) {
  button.classList.toggle("card__like-button_is-active");
}
