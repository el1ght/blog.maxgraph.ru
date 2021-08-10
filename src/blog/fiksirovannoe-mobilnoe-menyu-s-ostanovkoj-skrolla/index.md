---
title: "Фиксированное мобильное меню с остановкой скролла"
date: "2019-05-23"
descr: "Привет! Сегодня у нас лайтовенькая, но довольно важная статья. Покажу скрипт, который будет тормозить скролл сайта при открытии мобильного меню (и на iPhone тоже), ну а при закрытии - возобновлять. Все мы знаем, как непросто на iPhone скролл отключить, но тут максимально простая и рабочая фича. Поехали!"
cover: "img/cover.jpg"
cat: JS
---

Итак, все делаем через `position: fixed` и&nbsp;простой скриптец. И&nbsp;да, конечно&nbsp;же, эта фича сработает только для мобильного меню (полноэкранного), ибо иначе будет некрасиво. HTML тут не&nbsp;супер важен, посмотрите на&nbsp;примере

## CSS

``` css
.is-menu-open {
  position: fixed;
  overflow: hidden;
}
```

`is-menu-open` &mdash; класс, который будет добавляться когда меню открыто.

## JS

``` js
const burger = document.querySelector('.burger');
const menuLinks = document.querySelectorAll('.mobile-menu a');
const mobileMenu = document.querySelector('.mobile-menu');

burger.addEventListener('click', (e) => {
  e.preventDefault();

  let pagePos = window.scrollY;
  document.body.classList.add('is-menu-open');
  document.setAttribute('data-scroll', pagePos);

  mobileMenu.style.display = 'block';
});

menuLinks.forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();

    let pos = parseInt(document.body.getAttribute('data-scroll'));

    mobileMenu.style.display = 'none';

    document.body.classList.remove('is-menu-open');
    document.setAttribute('data-scroll', '');

    window.scrollTo(0, pos);
  });
});
```

Собственно, по&nbsp;бургеру открываем меню (стандартные вещи) и&nbsp;сохраняем в&nbsp;переменную `pagePos` текущую позицию скролла. Затем, уже по&nbsp;закрытию меню мы&nbsp;скроллим сайт на&nbsp;эту&nbsp;же позицию, убирая класс, содержащий `position: fixed`. И, поскольку меню у&nbsp;нас с&nbsp;фоном (и&nbsp;выше)&nbsp;&mdash; внешне ничего не&nbsp;видно, но&nbsp;скролл сохраняется.

Вот такая вот мелочь, но&nbsp;довольно полезная мелочь. Надеюсь, кому-то помогло)
