import { Element, Observer } from '../classes';
import googleIcon from '@/chrome-scripts/assets/google-logo.svg?url';

function addSearchButton(element) {
  const searchElement = new Element({
    tag: 'div',
    properties: { className: 'searchButton' },
    parent: element,
    insertMethod: 'append',
  });

  const img = new Element({
    tag: 'img',
    properties: { src: googleIcon },
    parent: searchElement,
  });

  const searchGoogle = async (e) => {
    e.preventDefault();
    const [courseId, lessonId] = location.href.match(/[0-9]+/g);
    const apiLink = `https://foxford.ru/api/courses/${courseId}/lessons/${lessonId}`;

    const lessonJson = await fetch(apiLink).then((response) => response.json());

    const searchQuery = lessonJson.title;

    window.open(`https://www.google.com/search?q=${searchQuery}`);
  };

  searchElement.addEventListener('click', searchGoogle);
}

export default function createSearchButtonObserver() {
  const observer = new Observer({
    targetElementSelector: 'div[class*="theory__Root"]',
    createdElementSelector: '.searchButton',
    urlPart: 'courses',
    callback: addSearchButton,
  });

  return observer;
}
