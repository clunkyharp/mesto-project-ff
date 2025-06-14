import "../pages/index.css";
import { openModal, closeModal } from "./modal.js";
import { createCard } from "./card.js";
import { initialCards } from "./cards.js";

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

document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

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
    handleLikeClick,
    handleImageClick
  );
  cardList.prepend(newCard);
  closeModal(addCardPopup);
  formAddCard.reset();
});

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleImageClick(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(imagePopup);
}

initialCards.forEach((data) => {
  const card = createCard(data, handleLikeClick, handleImageClick);
  cardList.append(card);
});
