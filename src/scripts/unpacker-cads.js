import { cardConfig, filtersCollection } from './configConstants.js';

// Распаковщик карточек из конфигурационного файла и наложение фильтров

export const unpackerCads = () => {

  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
  const galeri = document.querySelector('.galeri');

  // оригинальный масив нам ещё пригодиться ;)
  let workingFiltersCollection = filtersCollection.slice();

  const paragraphSubstitution = (textBox, paragraphs) => {
    paragraphs.forEach((p) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = p;
      textBox.append(paragraph);
    })
  }

  const getRandomInt = (length) => {
    return Math.floor(Math.random() * length);
  }

  //  накладыватель фильтров самовозобновляющийся
  const applyingFilter = (image) => {
    let filternumber;

    if (workingFiltersCollection.length > 1) {
      filternumber = getRandomInt(workingFiltersCollection.length);
    } else { filternumber = 0 }

    image.classList.add(workingFiltersCollection[filternumber]);
    workingFiltersCollection.splice(filternumber, 1);

    if (!workingFiltersCollection.length) {
      workingFiltersCollection = filtersCollection.slice();
    }
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

    // проверяем есть ли фильтры в наличае
    if (filtersCollection.length) {
      applyingFilter(image)
    }

    cardElement.querySelector('.label').textContent = card.label;

    paragraphSubstitution(textBox, card.cardText);

    galeri.append(cardElement);

  });
}