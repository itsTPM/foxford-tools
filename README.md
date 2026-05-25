<img width="96" src="src/assets/logo.svg">

# Foxford Tools

_You can also open [the README in English](./README-en.md)_

<a href="https://chromewebstore.google.com/detail/foxford-tools/mmhgkmkmoepfpcakdkajpendcnjichhm">  
  <img src=".github/assets/google.png" alt="Доступно в Chrome Web Store" height="58">
</a>
<a href="https://addons.mozilla.org/ru/firefox/addon/foxford-tools/">
  <img src=".github/assets/mozilla.png" alt="Доступно в Firefox Add-ons" height="58">
</a>

## О проекте

Неофициальное расширение для браузера, которое интегрируется на сайт онлайн-школы Фоксфорд и расширяет функционал для учеников.

Добавляет полезные фичи на сайт, среди которых:

- отображение процента успешности выполнения домашнего задания и заданий на вебинарах
- установка понятных заголовков страницы на разных вкладках (например: "Домашка", "Вебинар", "Успеваемость")
- возможность добавлять статьи из теории под уроком в закладки
- кнопка для поиска теории по теме урока в Google
- замена цвета фона полей ввода и выпадающих списков в задачах на нейтральный
- отображение примерного времени чтения теории

и не только...

## Установка

Браузеры на основе Chromium (Google Chrome, Microsoft Edge, Opera и другие) -- [Chrome Web Store](https://chromewebstore.google.com/detail/foxford-tools/mmhgkmkmoepfpcakdkajpendcnjichhm)

Mozilla Firefox - [Firefox Add-ons](https://addons.mozilla.org/ru/firefox/addon/foxford-tools/)

## Локальная разработка

Для разработки требуются:

- [Node.js 24](https://nodejs.org/en/download) с `corepack`
- bash

### Подготовка

- `pnpm install` - установка зависимостей, генерация типов и хуков
- `pnpm generate-icons` - генерация .png иконок из svg
- `pnpm subset-fonts` - сабсет шрифтов до базовых кириллических и латинских символов

### Разработка

- `pnpm dev` - запуск dev-сервера и открытие браузера (Chrome)
- `pnpm dev:firefox` - запуск dev-сервера и открытие браузера (Firefox)
- `pnpm test` - запуск тестов

### Сборка

- `pnpm build` - билд в .output (Chrome)
- `pnpm build:firefox` - билд в .output (Firefox)
- `pnpm zip` - архив билда в .output (Chrome)
- `pnpm zip:firefox` - архив билда и исходников в .output (Firefox)
