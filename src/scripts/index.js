import "../pages/index.css";

import { openModal, closeModal, closeOverlay } from "./modal.js";
import { createCard, checkLikeCount } from "./card.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
} from "./api.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDecription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const avatarForm = document.forms["edit-avatar"];
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileAvatarPopup = document.querySelector(".popup_type_profile-image");

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

const avatarSubmitButton = avatarForm.querySelector(".popup__button");
const profileSubmitButton = formEditProfile.querySelector(".popup__button");
const addCardSubmitButton = formAddCard.querySelector(".popup__button");

const popups = document.querySelectorAll(".popup");
popups.forEach(closeOverlay);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

let currentUserId = null;

document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

const renderLoading = (isLoading, buttonElement) => {
  if (!buttonElement) return;

  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = "Сохранить";
    buttonElement.disabled = false;
  }
};

function handleDeleteButton(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

function handleLikeButton(cardElement, cardId, isLiked) {
  const apiCall = isLiked ? unlikeCard : likeCard;

  apiCall(cardId)
    .then((updatedCard) => {
      const newIsLiked = !isLiked;
      checkLikeCount(cardElement, updatedCard.likes.length, newIsLiked);
    })
    .catch((err) => {
      console.error("Ошибка при переключении лайка:", err);
    });
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

  clearValidation(formEditProfile, validationConfig);
  openModal(editProfilePopup);
});

profileAddButton.addEventListener("click", () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openModal(addCardPopup);
});

profileAvatar.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(profileAvatarPopup);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newAvatarUrl = avatarInput.value;
  renderLoading(true, avatarSubmitButton);

  updateAvatar(newAvatarUrl)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(profileAvatarPopup);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton);
    });
});

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const about = profileDecriptionInput.value;

  renderLoading(true, profileSubmitButton);

  updateUserInfo(name, about)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDecription.textContent = userData.about;
      closeModal(editProfilePopup);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton);
    });
});

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = titleInput.value;
  const link = linkInput.value;

  renderLoading(true, addCardSubmitButton);

  addNewCard(name, link)
    .then((cardData) => {
      const card = createCard(
        cardData,
        handleLikeButton,
        handleDeleteButton,
        handleImageClick,
        currentUserId
      );
      cardList.prepend(card);
      closeModal(addCardPopup);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      renderLoading(false, addCardSubmitButton);
    });
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    profileName.textContent = userData.name;
    profileDecription.textContent = userData.about;

    cards.forEach((cardData) => {
      const card = createCard(
        cardData,
        handleLikeButton,
        handleDeleteButton,
        handleImageClick,
        currentUserId
      );
      cardList.append(card);
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });

enableValidation(validationConfig);
