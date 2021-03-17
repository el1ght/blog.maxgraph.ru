---
title: "Создание табов на чистом JS"
date: "2018-10-24"
descr: "Привет! Давайте создадим табы на чистом JS для сайта. Для удобства, я сделал видео, оно выше."
description: "Создаем табы на чистом JS"
cover: "img/cover.jpg"
cat: JS
video: "https://www.youtube.com/embed/Conc66sfrho"
sources: "https://github.com/maxdenaro/maxgraph-youtube-source/tree/master/UI-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B%20%E2%84%965.%20%D0%A2%D0%B0%D0%B1%D1%8B%20%D0%BD%D0%B0%20%D1%87%D0%B8%D1%81%D1%82%D0%BE%D0%BC%20js"
---

## Вступление

Давайте определимся для начала, что же такое табы? Табы - это элемент страницы, кнопки, которые переключают контент на странице (скрывают или показывают). С помощью табов легко делить информацию на странице на какие-либо категории. Давайте разберемся, как такое сделать

## HTML

``` html
<div class="tabs">
  <ul class="tabs__list">
    <li class="tabs__item"><button class="tabs__btn tabs__btn--active" data-tabs-path="main">Главная</button></li>
    <li class="tabs__item"><button class="tabs__btn" data-tabs-path="archive">Архив</button></li>
    <li class="tabs__item"><button class="tabs__btn" data-tabs-path="settings">Настройки</button></li>
  </ul>
  <div class="tabs__content tabs__content--active" data-tabs-target="main">
    <div class="content">
      <h2 class="content__title">Добро пожаловать!</h2>
      <p class="content__descr">Здесь находятся все ваши активные заказы.</p>
      <ul class="content__list">
        <li class="content__item">
          <a href="#" class="content__link" style="background-image: url('./img/1.png');">
            <span class="content__text">Занятия йогой</span>
          </a>
        </li>
        <li class="content__item">
          <a href="#" class="content__link" style="background-image: url('./img/2.png');">
            <span class="content__text">Кардио</span>
          </a>
        </li>
        <li class="content__item">
          <a href="#" class="content__link" style="background-image: url('./img/3.png');">
            <span class="content__text">Силовые тренировки</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="tabs__content" data-tabs-target="archive">
    <div class="content">
      <h2 class="content__title">Добро пожаловать!2</h2>
      <p class="content__descr">Здесь находятся все ваши активные заказы.</p>
      <ul class="content__list">
        <li class="content__item">
          <a href="#" class="content__link" style="background-image: url('./img/1.png');">
            <span class="content__text">Занятия йогой</span>
          </a>
        </li>
        <li class="content__item">
          <a href="#" class="content__link" style="background-image: url('./img/2.png');">
            <span class="content__text">Кардио</span>
          </a>
        </li>
        <li class="content__item">
          <a href="#" class="content__link" style="background-image: url('./img/3.png');">
            <span class="content__text">Силовые тренировки</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="tabs__content" data-tabs-target="settings">
    <div class="content">
      <h2 class="content__title">Добро пожаловать!3</h2>
      <p class="content__descr">Здесь находятся все ваши активные заказы.</p>
      <ul class="content__list">
        <li class="content__item">
          <a href="#" class="content__link" style="background-image: url('./img/1.png');">
            <span class="content__text">Занятия йогой</span>
          </a>
        </li>
        <li class="content__item">
          <a href="#" class="content__link" style="background-image: url('./img/2.png');">
            <span class="content__text">Кардио</span>
          </a>
        </li>
        <li class="content__item">
          <a href="#" class="content__link" style="background-image: url('./img/3.png');">
            <span class="content__text">Силовые тренировки</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
```

Немаленький код, но тут больше всего места занимает сам контент. По факту, нас интересуют кнопки `tabs__btn` с их дата-атрибутами, а также `tabs__content` с их атрибутами.

## CSS

Посмотрите его в исходниках

## JS

``` js
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector('.tabs');
  const tabsBtn = document.querySelectorAll('.tabs__btn');
  const tabsContent = document.querySelectorAll('.tabs__content');

  if (tabs) {
    tabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('tabs__btn')) {
        const tabsPath = e.target.dataset.tabsPath;
        tabsBtn.forEach(el => {el.classList.remove('tabs__btn--active')});
        document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn--active');
        tabsHandler(tabsPath);
      }
    });
  }

  const tabsHandler = (path) => {
    tabsContent.forEach(el => {el.classList.remove('tabs__content--active')});
    document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
  };
});
```

Что же мы тут делаем?

1. Находим все кнопки и все контенты в переменные `tabsBtn` и `tabsContent`.
2. Делаем обработчик клика по табам, и проверяем, если кликаем именно на кнопки `tabsBtn` - выполняем некие действия.
3. Первое из них - забираем атрибут `data-tabs-path` у текущей нажатой кнопки.
3. Второе - снимаем класс активности со всех кнопок
4. Третье - находим текущую кнопку и даем ей класс активности.
5. Используем функцию `tabsHandler`, в которой снимаем у всех контентов класс и через ранее созданную переменную `path` находим нужный контент и даем ему класс активности.

Все очень просто, и более детально вы можете посмотреть в видео в начале статьи.

Надеюсь, было полезно. Удачи!
