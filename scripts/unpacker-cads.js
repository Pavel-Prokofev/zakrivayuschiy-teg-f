import { cardConfig } from './configConstants.js';

// Распаковщик карточек из конфигурационного файла

export const unpackerCads = () => {
  
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
  const galeri = document.querySelector('.galeri');

  const paragraphSubstitution = (textBox, paragraphs) => {
    paragraphs.forEach((p) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = p;
      textBox.append(paragraph);
    })
  }

  cardConfig.forEach((card, index) => {

    const cardElement = cardTemplate.cloneNode(true);
    const image = cardElement.querySelector('.card__img');
    const textBox = cardElement.querySelector('.card__text-box');

    cardElement.querySelector('.card__heading').textContent = card.heading;
    image.src = card.imageURL;
    image.alt = card.imageAlt;
    if (index !== 0) {
      image.loading = 'lazy';
    };
    cardElement.querySelector('.label').textContent = card.label;

    paragraphSubstitution(textBox, card.cardText);

    galeri.append(cardElement);

  });
}