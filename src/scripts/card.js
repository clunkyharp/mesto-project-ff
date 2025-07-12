export function checkLikeCount(cardElement, likeCountValue, isActive) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-count");

  if (!likeButton || !likeCounter) return;

  likeButton.classList.toggle("card__like-button_is-active", isActive);
  likeCounter.textContent = likeCountValue;
}

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

  const isLiked = likes.some((user) => user._id === currentUserId);
  likeCounter.classList.add("card__like-count");
  likeButton.after(likeCounter);

  checkLikeCount(cardElement, likes.length, isLiked);

  likeButton.addEventListener("click", () => {
    handleLikeButton(
      cardElement,
      _id,
      likeButton.classList.contains("card__like-button_is-active")
    );
  });

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

