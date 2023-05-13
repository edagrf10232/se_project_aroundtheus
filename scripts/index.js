const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"

    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    },   
];
const cardsWrap = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileCloseButton = profileEditModal.querySelector("#profile-close-button");
const addCardCloseButton = addCardModal.querySelector("#add-close-button");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const addNewCardButton = document.querySelector('.profile__add-button');
const addCardForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");
const previewImageModal = document.querySelector('#preview-image-modal');
const imageCloseButton = previewImageModal.querySelector(".modal__close-image");
const imageElement = document.querySelector('.modal__card-preview');
const imageCaption = document.querySelector('.modal__image-caption');

function closePopup(modal) {
    modal.classList.remove("modal_opened");
}
function renderCard(cardData) {
    const cardElement = getCardElement(cardData);
    cardsWrap.prepend(cardElement);
}
function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector('.card__like-button')
    const deleteButton = cardElement.querySelector('.card__delete-button')

    deleteButton.addEventListener("click", () => {
        cardElement.remove();
    })
    cardImageEl.addEventListener("click", () => {
        previewImage(cardData);
    });

    likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
    });

    cardTitleEl.textContent = cardData.name;
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    return cardElement;
}
function previewImage({name, link}) {
    imageCaption.textContent = name;
    openModal(previewImageModal);
    imageElement.src = link;
    imageElement.alt = name;
}

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditModal);
}
function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    const cardElement = getCardElement({
name,
link,
    })
    cardsWrap.prepend(cardElement);
    closePopup(addCardModal)
    addCardForm.reset();
}

function openModal(modal) {
    modal.classList.add("modal_opened");
}
profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal);
});
// Add Button //
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closePopup(addCardModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

profileCloseButton.addEventListener("click", () => closePopup(profileEditModal));

initialCards.forEach((cardData) => {
    cardsWrap.prepend(getCardElement(cardData));
});
// Image Modal //
imageCloseButton.addEventListener("click", () => closePopup(previewImageModal));
