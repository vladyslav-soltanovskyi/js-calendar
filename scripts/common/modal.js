const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');

export const openModal = () => {
  modalElem.classList.remove('hidden');
}
export const closeModal = () => {
  modalElem.classList.add('hidden');
}

function onClickInsideModal(event) {
  event.stopPropagation();
}

modalContentElem.addEventListener('click', onClickInsideModal);