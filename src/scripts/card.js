export function createCard(
  cardData,
  handleLikeButton,
  handleDeleteButton,
  handleImageClick,
  currentUserId
) {
  const { name, link, _id, likes, owner } = cardData;

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = document.createElement("span");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Подсчёт лайков
  likeCounter.textContent = likes.length;
  likeCounter.classList.add("card__like-count");
  likeButton.after(likeCounter);

  // Проверка: лайкал ли пользователь
  const isLiked = likes.some((user) => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    handleLikeButton(
      cardElement,
      _id,
      likeButton.classList.contains("card__like-button_is-active")
    );
  });

  // Показывать кнопку удаления только владельцу
  if (owner._id === currentUserId) {
    deleteButton.addEventListener("click", () =>
      handleDeleteButton(cardElement, _id)
    );
  } else {
    deleteButton.remove();
  }

  cardImage.addEventListener("click", () => handleImageClick(name, link));

  return cardElement;
}
