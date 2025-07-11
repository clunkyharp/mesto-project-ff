// Функция показа ошибки
function showError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Функция скрытия ошибки
function hideError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

// Функция проверки валидности всех полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция проверки валидности поля
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideError(formElement, inputElement, config);
  }
}

// Функция активации/деактивации кнопки сабмита
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

// Функция установки слушателей на формы
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Функция сброса формы
export function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
    inputElement.setCustomValidity("");
  });

  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

// Функция инициализации валидации
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}
