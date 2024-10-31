import { createElement, createObserver } from '../modules';
import googleIcon from '@/chrome-scripts/assets/google-logo.svg';

function addSearchButton(element) {
  const searchElement = createElement('div', { className: 'searchButton' }, element, 'append');
  const img = createElement(
    'img',
    {
      src: googleIcon,
    },
    searchElement
  );

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
  const observer = createObserver(['div[class*="theory__Root"]', 1, 'courses', '.searchButton', addSearchButton]);

  return observer;
}
