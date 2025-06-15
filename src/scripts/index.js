import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal, overlayClose } from "./modal.js";
import { createCard, handleLikeButton } from "./card.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDecription = document.querySelector(".profile__description");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const formEditProfile = editProfilePopup.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const profileDecriptionInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

const formAddCard = addCardPopup.querySelector(".popup__form");
const titleInput = formAddCard.querySelector(".popup__input_type_card-name");
const linkInput = formAddCard.querySelector(".popup__input_type_url");

const cardList = document.querySelector(".places__list");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const popups = document.querySelectorAll(".popup");
popups.forEach(overlayClose);

document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

function handleDeleteButton(cardElement) {
  cardElement.remove();
}

function handleImageClick(name, link) {
  if (!name || !link) return;

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  profileDecriptionInput.value = profileDecription.textContent;
  openModal(editProfilePopup);
});

profileAddButton.addEventListener("click", () => {
  formAddCard.reset();
  openModal(addCardPopup);
});

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDecription.textContent = profileDecriptionInput.value;
  closeModal(editProfilePopup);
});

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCard(
    { name: titleInput.value, link: linkInput.value },
    handleLikeButton,
    handleDeleteButton,
    handleImageClick
  );
  cardList.prepend(newCard);
  closeModal(addCardPopup);
});

initialCards.forEach((data) => {
  const card = createCard(
    data,
    handleLikeButton,
    handleDeleteButton,
    handleImageClick
  );
  cardList.append(card);
});
