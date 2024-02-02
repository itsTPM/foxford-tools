import createElement from '../modules/createElement.js';
import googleIcon from '../assets/google-logo.svg';

export default function addSearchButton(element) {
  const searchElement = createElement('div', { className: 'searchButton' }, element, 'append');
  const img = createElement(
    'img',
    {
      src: chrome.runtime.getURL(googleIcon),
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
