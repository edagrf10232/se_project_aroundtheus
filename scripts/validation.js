function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) { 
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`); 
  inputEl.classList.add(inputErrorClass); 
  errorMessageEl.textContent = inputEl.validationMessage; 
  errorMessageEl.classList.add(errorClass); 
}
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const element = `#${inputEl.id}-error`;
  const errorMessageEl = formEl.querySelector(element);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}
function checkInputValidity(formEl, inputEl, options) { 
  if (!inputEl.validity.valid) { 
    return showInputError(formEl, inputEl, options); 
  } 
  hideInputError(formEl, inputEl, options); 
}
  function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }
  
  function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
  else {
  
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
  }
  
  function setEventListeners(formEl, options) {
    const { inputSelector } = options;
    const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
    inputEls.forEach(function (inputEl) {
        inputEl.addEventListener("input", function (e) {
            checkInputValidty(formEl, inputEl, options);
        });
    });
}
  function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      setEventListeners(formEl, options);
    });
  }
  
  const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_error",
    errorClass: "modal__error_visible",
  };
  enableValidation(config);
  