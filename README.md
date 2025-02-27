<img width="60" align="right" src="https://fox.itstpm.rocks/icons/logo.svg">

# Foxford Tools

_You can also open the [README in English](./README-en.md)_

### Что это

Неофициальный плагин, который интегрируется на сайт онлайн-школы Фоксфорд и расширяет функционал для учеников

Добавляет полезные фичи на сайт, среди которых:

- процент успешности выполнения домашнего задания и заданий на вебинарах
- смена заголовка страницы со статичного "Онлайн-школа Фоксфорд" на более подробные, чтобы не путаться во вкладках (например: "Календарь", "Домашка", "План на сегодня")
- возможность добавлять статьи из вкладки "теория" в закладки, которые отображаются в самом расширении, с названием статьи, предметом и красивой иконкой
- кнопка для поиска теории по теме урока в Google
- замена желтых блоков в задачах на светло-серые
- отображение примерного времени чтения статьи во вкладке "теория"

  и не только..

### Установка

Расширение доступно для установки в [Chrome Web Store](https://chromewebstore.google.com/detail/foxford-tools/mmhgkmkmoepfpcakdkajpendcnjichhm)

### Баги, идеи и недоработки

полностью приветствуются в [Issues](https://github.com/itsTPM/foxford-tools/issues)

### Сборка расширения вручную

Шаги для сборки расширения своими силами (не используя установку с [Chrome Web Store](https://chromewebstore.google.com/detail/foxford-tools/mmhgkmkmoepfpcakdkajpendcnjichhm)):

1. Убедитесь, что установлены:
   1. [NodeJS](https://nodejs.org/en/download/prebuilt-installer) последней LTS или Current версии
   2. [pnpm](https://pnpm.io) 9 или выше
2. Выполните `git clone https://github.com/itsTPM/foxford-tools.git` в терминале, чтобы клонировать репозиторий
3. Убедитесь, что вы находитесь в нужной ветке (скорее всего, это будет ветка **main**)
4. Выполните `pnpm install` для установки или обновления зависимостей проекта
5. Выполните `pnpm dev` для запуска локального HMR-сервера разработки
6. Выполните `pnpm build:chrome` или `pnpm build:firefox` для сборки расширения под соответствующий бразуер. В папке **dist** будет находиться билд расширения, который можно загрузить в браузер используя режим разработчика, или сбилдить в .crx используя [extension-install-backend](https://github.com/itsTPM/extension-install-backend) + [extension-install-frontend](https://github.com/itsTPM/extension-install-frontend)
